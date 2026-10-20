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

# Conclusion

Password authentication can be securely used by ITOSS when credentials are stored encrypted, decrypted only in memory, and managed according to established security policies. However, SSH key-based authentication remains the preferred approach due to its stronger security model, reduced operational overhead, and better suitability for large-scale monitoring environments.
