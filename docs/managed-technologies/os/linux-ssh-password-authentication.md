# SSH Password Authentication Configuration for ITOSS

## Overview

This document describes the complete procedure for configuring SSH password-based authentication for ITOSS remote monitoring and automation tasks.

Password authentication should be used only when SSH key-based authentication is not available or cannot be implemented due to operational constraints. While simpler to deploy, password authentication introduces additional security considerations regarding credential storage, rotation, and transmission.

---

# Architecture Overview

```text
+----------------------+
|        ITOSS         |
| Credential Repository|
+----------+-----------+
           |
           | Retrieve encrypted password
           |
           v
+----------------------+
|    Java SSH Client   |
+----------+-----------+
           |
           | Password Authentication
           |
           v
+----------------------+
| Target Linux Server  |
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

Create a dedicated account for ITOSS monitoring activities.

```bash
sudo useradd -m -s /bin/bash itoss
```

Assign a password:

```bash
sudo passwd itoss
```

Example:

```text
New password:
Retype new password:
passwd: password updated successfully
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

# Step 2 - Verify Password Authentication is Enabled

Review SSH configuration:

```bash
sudo vi /etc/ssh/sshd_config
```

Verify the following settings:

```text
PasswordAuthentication yes
ChallengeResponseAuthentication no
PubkeyAuthentication yes
```

Password authentication may coexist with public key authentication.

Validate configuration:

```bash
sudo sshd -t
```

Reload SSH service:

```bash
sudo systemctl reload sshd
```

---

# Step 3 - Test Interactive Authentication

Validate access before configuring ITOSS.

```bash
ssh itoss@target-server
```

Expected result:

```text
itoss@target-server's password:
```

After entering the password:

```text
Last login: ...
[itoss@target-server]$
```

---

# Step 4 - Configure Optional Password Policy

Review the current password policy:

```bash
sudo chage -l itoss
```

Example output:

```text
Minimum number of days between password change : 0
Maximum number of days between password change : 90
```

Set a password expiration period:

```bash
sudo chage -M 90 itoss
```

Force periodic password rotation:

```bash
sudo chage -W 14 itoss
```

This provides a warning 14 days before expiration.

---

# Step 5 - Configure Limited Sudo Access (Optional)

If monitoring tasks require elevated privileges, grant only the required permissions.

Edit:

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

Verify:

```bash
sudo -l -U itoss
```

---

# Step 6 - Store Credentials in ITOSS

The monitoring password should never be stored in plain text.

Recommended model:

```text
Credential Type : Username and Password
Username        : itoss
Password        : Encrypted
```

Recommended architecture:

```text
Credential Repository
    └── AES Encrypted Password
            ↓
      Java Application
            ↓
      Runtime Decryption
            ↓
      SSH Authentication
```

The password should:

- Be encrypted at rest.
- Be decrypted only during authentication.
- Never be logged.
- Never be stored in configuration files in plain text.

---

# Step 7 - Java Authentication Flow

Recommended flow:

```text
+----------------------------+
|      ITOSS Scheduler       |
+-------------+--------------+
              |
              v
+----------------------------+
| Retrieve encrypted password|
+-------------+--------------+
              |
              v
+----------------------------+
| Decrypt in memory          |
+-------------+--------------+
              |
              v
+----------------------------+
| SSH Password Authentication|
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

# Step 8 - Avoid Password Exposure

## Recommended

The Java SSH client should authenticate directly using the SSH library.

```text
Java
 └─ SSH Client Library
        └─ Password Authentication
```

The password remains only in the application memory.

---

## Not Recommended

Passing passwords through command-line arguments.

Example:

```bash
sshpass -p MyPassword ssh user@server
```

Problems:

```text
Visible in ps output
Visible in process listings
May appear in audit logs
May appear in shell history
```

---

## Also Not Recommended

Hardcoded credentials:

```java
String password = "MyPassword";
```

Problems:

```text
Source code exposure
Difficult credential rotation
Security audit findings
```

---

# Step 9 - Validate Access from ITOSS

Execute a simple command:

```text
hostname
```

Expected result:

```text
linux-prod-01
```

Additional validation:

```text
uname -a
df -h
free -m
systemctl status sshd
```

---

# Step 10 - Password Rotation Procedure

Generate a new password according to company policy.

Apply the change:

```bash
sudo passwd itoss
```

Validate authentication manually.

Update the credential stored in ITOSS.

Validate monitoring execution.

Document the rotation event according to operational procedures.

---

# Troubleshooting

## Permission Denied

Example:

```text
Permission denied, please try again.
```

Verify the account:

```bash
id itoss
```

Verify password status:

```bash
sudo passwd -S itoss
```

Check account expiration:

```bash
sudo chage -l itoss
```

---

## Account Locked

Unlock the account:

```bash
sudo passwd -u itoss
```

---

## Password Expired

Reset password:

```bash
sudo passwd itoss
```

Review expiration settings:

```bash
sudo chage -l itoss
```

---

## Verify SSH Server Configuration

Display active settings:

```bash
sudo sshd -T | grep passwordauthentication
```

Expected result:

```text
passwordauthentication yes
```

---

## Review Authentication Logs

RHEL / Rocky Linux:

```bash
sudo tail -f /var/log/secure
```

Ubuntu:

```bash
sudo tail -f /var/log/auth.log
```

Systemd:

```bash
sudo journalctl -u sshd -f
```

---

# Security Considerations

Password authentication presents additional risks compared to SSH key authentication.

Potential risks:

- Password compromise.
- Password reuse.
- Brute-force attacks.
- Credential rotation overhead.
- Operational dependency on password management.

Mitigation recommendations:

- Use dedicated monitoring accounts.
- Enforce strong passwords.
- Implement periodic rotation.
- Restrict source IPs via firewall rules.
- Use encrypted credential storage.
- Audit login activity.
- Implement account lockout policies.
- Minimize sudo privileges.

---

# Recommended Firewall Restriction

Allow SSH access only from the ITOSS server.

Example using firewalld:

```bash
sudo firewall-cmd \
--permanent \
--add-rich-rule='rule family="ipv4" source address="10.10.10.20" service name="ssh" accept'
```

Reload:

```bash
sudo firewall-cmd --reload
```

---

# Best Practices for ITOSS

Recommended order of preference:

```text
1. SSH Public Key Authentication
2. SSH Public Key Authentication with Passphrase
3. Password Authentication
```

Use password authentication only when:

- Public key deployment is not permitted.
- Managed devices do not support key-based authentication.
- Organizational policies require password-based access.

---

# Conclusion

Password authentication can be securely used by ITOSS when credentials are stored encrypted, decrypted only in memory, and managed according to established security policies. However, SSH key-based authentication remains the preferred approach due to its stronger security model, reduced operational overhead, and better suitability for large-scale monitoring environments.
