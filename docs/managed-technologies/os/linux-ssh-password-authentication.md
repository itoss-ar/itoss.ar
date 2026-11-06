# SSH Password Authentication for ITOSS

## Overview

This document describes how to configure an SSH CT that authenticates against a Linux server with a user and a password (`ssh_authenticationType` = `PASSWORD`).

This is the default authentication type and the way SSH CTs worked before ITOSS 8.8.0. Existing SSH CTs already use it and need no changes.

Use this type when the server accepts password logins and no key or certificate is available. For unattended monitoring, key-based authentication is recommended:

- [SSH Private Key Authentication](linux-ssh-private-key-authentication.md)
- [SSH Private Key with Passphrase Authentication](linux-ssh-private-key-passphrase-authentication.md)
- [SSH Certificate Authentication](linux-ssh-certificate-authentication.md)

The example uses the fictional company Acme and its legacy server `srv-legacy-03.acme.local`.

# Architecture Overview

```
+-------------------------------+
|        ITOSS Manager          |
|  CT: ssh_password (encrypted) |
+---------------+---------------+
                |
                | Password encrypted with ITOSS_CRYPTO_KEY
                v
+-------------------------------+
|       ITOSS Collector         |
|  Decrypts in memory           |
+---------------+---------------+
                |
                | Password authentication
                v
+-------------------------------+
|      Target Linux Server      |
|  PasswordAuthentication yes   |
+-------------------------------+
```

# Prerequisites

- Linux server with OpenSSH Server installed and running.

- Administrative access to the target server.

- Network connectivity between the ITOSS collector and the monitored system (TCP 22 by default).

- The same `ITOSS_CRYPTO_KEY` on the ITOSS manager and collector.

Verify SSH service status:

```
sudo systemctl status sshd
```

or

```
sudo systemctl status ssh
```

# Step 1 - Create a Dedicated Monitoring User

On the target server:

```
sudo useradd -m -s /bin/bash itoss
sudo passwd itoss
```

Verify the account:

```
id itoss
```

Example output:

```
uid=1002(itoss) gid=1002(itoss) groups=1002(itoss)
```

# Step 2 - Allow Password Authentication

Edit the SSH configuration:

```
sudo vi /etc/ssh/sshd_config
```

Ensure:

```
PasswordAuthentication yes
```

Validate and reload:

```
sudo sshd -t
sudo systemctl reload sshd
```

# Step 3 - Validate the SSH Connection

From the ITOSS host:

```
ssh itoss@srv-legacy-03.acme.local id -un
```

The command prompts for the password and must return:

```
itoss
```

# Step 4 - Configure Limited Sudo Access (Optional)

If monitoring requires elevated privileges, grant only the required commands:

```
sudo visudo
```

Example:

```
itoss ALL=(root) NOPASSWD: /usr/bin/systemctl, /usr/bin/journalctl
```

Validate:

```
sudo -l -U itoss
```

# Step 5 - Configure the CT in ITOSS

```
ssh_target             : srv-legacy-03.acme.local
ssh_user               : itoss
ssh_port               : 22
ssh_authenticationType : PASSWORD
ssh_password           : <the user's password>
ssh_identityFile       : N/A
```

Where:

- `ssh_password` is stored encrypted and is never shown again.

- `ssh_identityFile` does not apply and is set to `N/A`. The CT form requires every field.

# Password Rotation Procedure

Change the password on the target server:

```
sudo passwd itoss
```

Update `ssh_password` in the CT.

Validate that the CT returns to normal status.

# Troubleshooting

## Messages in the ITOSS Monitor

| Situation | Message in the monitor |
|---|---|
| Wrong password, or the server does not accept passwords | `Auth fail` |
| Different `ITOSS_CRYPTO_KEY` on the manager and the collector | The collector cannot decrypt the password and authentication fails |

## Permission denied (password)

Verify that password authentication is enabled and that the account is not locked:

```
sudo sshd -T | grep -i passwordauthentication
sudo passwd -S itoss
```

`LK` in the second command means the password is locked.

## Enable SSH Debug Mode

Client side:

```
ssh -vvv itoss@srv-legacy-03.acme.local
```

Server side:

```
sudo journalctl -u sshd -f
```

# Compatibility with Existing Installations

- Existing SSH CTs use `PASSWORD` and keep working unchanged after upgrading to 8.8.0.

- If a CT has an old, manually entered value in `ssh_authenticationType`, or the field is empty, it is treated as `PASSWORD`, as before 8.8.0.

# Security Best Practices

- Create a dedicated account for ITOSS.

- Use a long, random password and rotate it periodically.

- Restrict sudo permissions to the minimum required.

- Restrict source IP addresses with the firewall whenever possible.

- Audit SSH authentication events.

- Move to key or certificate authentication when feasible.

# Conclusion

Password authentication keeps existing SSH CTs working unchanged. For new installations and unattended monitoring, key-based or certificate-based authentication is the recommended method.
