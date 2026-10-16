# SSH Key-Based Authentication Configuration for ITOSS

## Overview

This document describes the complete procedure to configure SSH key-based authentication for ITOSS remote monitoring and automation tasks.

SSH public key authentication is the recommended approach for automated access to Linux systems because it avoids password transmission, reduces credential exposure risks, and aligns with Linux security best practices.

---

# Architecture Overview

```text
+----------------------+
|        ITOSS         |
| Credential Repository|
+----------+-----------+
           |
           | Retrieve encrypted SSH key
           |
           v
+----------------------+
|    Java SSH Client   |
+----------+-----------+
           |
           | Public Key Authentication
           |
           v
+----------------------+
| Target Linux Server  |
| authorized_keys      |
+----------------------+
```

---

# Prerequisites

- Linux server with OpenSSH Server installed.
- Administrative access to the target server.
- Network connectivity between ITOSS and the monitored system.
- ITOSS credential repository available.
- SSH service enabled on the target server.

Verify SSH service status:

```bash
sudo systemctl status sshd
```

or

```bash
sudo systemctl status ssh
```

---

# Step 1 - Create a Dedicated Monitoring User

Create a dedicated account for ITOSS operations.

```bash
sudo useradd -m -s /bin/bash itoss
```

Verify the account:

```bash
id itoss
```

Example output:

```text
uid=1002(itoss) gid=1002(itoss) groups=1002(itoss)
```

---

# Step 2 - Disable Interactive Password Authentication (Optional)

If the account will only be used by ITOSS, lock the password.

```bash
sudo passwd -l itoss
```

Verify:

```bash
sudo passwd -S itoss
```

Expected output:

```text
itoss LK
```

Where:

- LK = Locked
- SSH key authentication remains operational.

---

# Step 3 - Generate an SSH Key Pair

Generate a new SSH key from the ITOSS server or administration workstation.

Recommended algorithm:

```bash
ssh-keygen -t ed25519 -C "itoss-monitoring"
```

Example:

```text
Generating public/private ed25519 key pair.
Enter file in which to save the key:
/home/user/.ssh/id_ed25519_itoss
```

Generated files:

```text
~/.ssh/id_ed25519_itoss
~/.ssh/id_ed25519_itoss.pub
```

Where:

```text
id_ed25519_itoss       -> Private Key
id_ed25519_itoss.pub   -> Public Key
```

A passphrase may optionally be configured.

---

# Step 4 - Protect the Generated Keys

Secure the SSH directory:

```bash
chmod 700 ~/.ssh
```

Secure the private key:

```bash
chmod 600 ~/.ssh/id_ed25519_itoss
```

Secure the public key:

```bash
chmod 644 ~/.ssh/id_ed25519_itoss.pub
```

Validate:

```bash
ls -la ~/.ssh
```

Expected output:

```text
drwx------ .ssh
-rw------- id_ed25519_itoss
-rw-r--r-- id_ed25519_itoss.pub
```

---

# Step 5 - Install the Public Key on the Target Server

## Option A - Using ssh-copy-id

```bash
ssh-copy-id -i ~/.ssh/id_ed25519_itoss.pub itoss@target-server
```

---

## Option B - Manual Installation

Create the SSH directory:

```bash
sudo mkdir -p /home/itoss/.ssh
```

Set ownership:

```bash
sudo chown itoss:itoss /home/itoss/.ssh
```

Set permissions:

```bash
sudo chmod 700 /home/itoss/.ssh
```

Create the authorized keys file:

```bash
sudo touch /home/itoss/.ssh/authorized_keys
```

Append the public key:

```bash
cat id_ed25519_itoss.pub | sudo tee -a /home/itoss/.ssh/authorized_keys
```

Apply permissions:

```bash
sudo chmod 600 /home/itoss/.ssh/authorized_keys
```

Apply ownership:

```bash
sudo chown itoss:itoss /home/itoss/.ssh/authorized_keys
```

---

# Step 6 - Validate the SSH Connection

Test the connection:

```bash
ssh -i ~/.ssh/id_ed25519_itoss itoss@target-server
```

A successful login should occur without requesting a password.

Execute a command remotely:

```bash
ssh -i ~/.ssh/id_ed25519_itoss itoss@target-server hostname
```

Example output:

```text
linux-prod-01
```

---

# Step 7 - Restrict Access by Source IP (Recommended)

Edit the authorized keys file:

```bash
vi /home/itoss/.ssh/authorized_keys
```

Prefix the key:

```text
from="10.10.10.20" ssh-ed25519 AAAAC3Nza...
```

Example:

```text
from="10.10.10.20" ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA...
```

Only the specified source IP will be allowed to authenticate using this key.

---

# Step 8 - Configure Limited Sudo Access (Optional)

If monitoring requires elevated privileges, grant only the required commands.

Edit sudoers:

```bash
sudo visudo
```

Example:

```text
itoss ALL=(root) NOPASSWD: /usr/bin/systemctl
```

More complete example:

```text
itoss ALL=(root) NOPASSWD: \
/usr/bin/systemctl,\
/usr/bin/journalctl,\
/usr/bin/df,\
/usr/bin/free
```

Validate:

```bash
sudo -l -U itoss
```

---

# Step 9 - Disable SSH Password Authentication (Optional)

Edit SSH configuration:

```bash
sudo vi /etc/ssh/sshd_config
```

Ensure:

```text
PubkeyAuthentication yes
PasswordAuthentication no
```

Validate configuration:

```bash
sudo sshd -t
```

Reload SSH:

```bash
sudo systemctl reload sshd
```

---

# Step 10 - Export the Private Key for ITOSS

Display the private key:

```bash
cat ~/.ssh/id_ed25519_itoss
```

Example:

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

This content must be stored securely within the ITOSS credential repository.

Recommended credential attributes:

```text
Credential Type : SSH Private Key
Username        : itoss
Private Key     : Encrypted
Passphrase      : Optional
```

---

# Step 11 - Configure Credential Storage in ITOSS

Recommended architecture:

```text
Credential Repository
    └── SSH Private Key (Encrypted)
            ↓
      ITOSS Scheduler
            ↓
      Java SSH Client
            ↓
      Remote Host Authentication
```

Security recommendations:

- Encrypt credentials at rest.
- Restrict credential administration to authorized users.
- Audit credential access.
- Support key rotation.
- Decrypt credentials only in memory during authentication.

---

# Step 12 - Authentication Flow

```text
+----------------------------+
|      ITOSS Scheduler       |
+-------------+--------------+
              |
              v
+----------------------------+
| Retrieve encrypted key     |
+-------------+--------------+
              |
              v
+----------------------------+
| Decrypt key in memory      |
+-------------+--------------+
              |
              v
+----------------------------+
| SSH Public Key Authentication
+-------------+--------------+
              |
              v
+----------------------------+
| Execute Monitoring Command |
+-------------+--------------+
              |
              v
+----------------------------+
| Process Results            |
+----------------------------+
```

---

# SSH Key Rotation Procedure

Generate a replacement key:

```bash
ssh-keygen -t ed25519 -C "itoss-monitoring-v2"
```

Install the new public key:

```bash
cat id_ed25519_itoss_v2.pub >> \
/home/itoss/.ssh/authorized_keys
```

Update the credential in ITOSS.

Validate connectivity.

Remove the previous key entry:

```bash
vi /home/itoss/.ssh/authorized_keys
```

Delete the obsolete key.

---

# Troubleshooting

## Permission denied (publickey)

Verify permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Verify ownership:

```bash
chown -R itoss:itoss ~/.ssh
```

---

## SSH Service Not Running

Check service status:

```bash
systemctl status sshd
```

Start service:

```bash
sudo systemctl start sshd
```

---

## Verify Authorized Keys

Display installed keys:

```bash
cat ~/.ssh/authorized_keys
```

---

## Enable SSH Debug Mode

Client side:

```bash
ssh -vvv -i ~/.ssh/id_ed25519_itoss itoss@target-server
```

Server side:

```bash
sudo journalctl -u sshd -f
```

---

# Security Best Practices

- Create a dedicated account for ITOSS.
- Use SSH public key authentication instead of passwords.
- Protect private keys using encryption.
- Restrict sudo permissions to the minimum required.
- Restrict source IP addresses whenever possible.
- Audit SSH authentication events.
- Rotate keys periodically.
- Store credentials only in the ITOSS credential repository.
- Decrypt credentials only when required.
- Disable password authentication for monitoring accounts whenever feasible.

---

# Conclusion

SSH public key authentication is the preferred method for ITOSS remote monitoring and automation. It removes password exposure risks, simplifies credential management, improves scalability, and follows Linux security best practices for unattended operations.
