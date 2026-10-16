# Linux

## Overview

ITOSS manages Linux systems through the **SSH** instrumentation, the standard protocol for managing Linux and Unix systems. No agent needs to be installed on the target server: the ITOSS Collector connects remotely, executes monitoring commands, and processes the results.

```text
+----------------------+
|        ITOSS         |
|      Collector       |
+----------+-----------+
           |
           | SSH (TCP 22)
           | Key-based or password authentication
           v
+----------------------+
| Target Linux Server  |
| Dedicated user itoss |
+----------------------+
```

### Supported Authentication Methods

| Method | Recommended For | Guide |
|--------|-----------------|-------|
| SSH Public Key | Production and unattended automation (preferred) | [SSH Key-Based Authentication](./linux-ssh-key-based-authentication.md) |
| Username and Password | Only when key-based authentication cannot be implemented | [SSH Password Authentication](./linux-ssh-password-authentication.md) |

---

# Setup

## Requirements

- Linux server with OpenSSH Server installed and the SSH service enabled.
- Administrative access to the target server (required only during setup).
- Network connectivity from the ITOSS Collector to the target server on the SSH port (default `22`).
- A dedicated service account for ITOSS (for example `itoss`). Never use `root` or personal accounts.
- Shell access for the service account (`/bin/bash`).
- ITOSS credential repository available.

Verify the SSH service status:

```bash
sudo systemctl status sshd
```

or, on Debian/Ubuntu:

```bash
sudo systemctl status ssh
```

---

# Registering a Linux Server in ITOSS

Complete the SSH connection fields according to the authentication type.

| Field | Parameter | Password Authentication | SSH Public Key Authentication |
|-------|-----------|-------------------------|-------------------------------|
| target | `ssh_target` | Hostname or IP address (e.g. `8.243.164.21`) | Hostname or IP address (e.g. `8.243.164.21`) |
| user | `ssh_user` | Service account (e.g. `itossuser`) | Service account (e.g. `itossuser`) |
| password | `ssh_password` | Service account password | Private key passphrase, or `N/A` if the key has no passphrase |
| port | `ssh_port` | `22` | `22` |
| authenticationtype | `ssh_authenticationType` | `PASSWORD` | `PRIVATE_KEY` |
| identityfile | `ssh_identityFile` | `N/A` | Path to the private key on the ITOSS Collector (e.g. `~/.ssh/id_ed25519_itoss`) |

For SSH Public Key Authentication, the private key file must exist on the ITOSS Collector at the path set in `ssh_identityFile`, and the matching public key must be installed in `~/.ssh/authorized_keys` of the service account on the target server. If the private key is protected with a passphrase, set it in `ssh_password`.
