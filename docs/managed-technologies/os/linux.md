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
           | Key, certificate, or password authentication
           v
+----------------------+
| Target Linux Server  |
| Dedicated user itoss |
+----------------------+
```

### Supported Authentication Methods

| Method | Recommended For | Guide |
|--------|-----------------|-------|
| SSH Private Key | Production and unattended automation (preferred) | [SSH Private Key Authentication](./linux-ssh-private-key-authentication.md) |
| SSH Private Key with Passphrase | When policy requires private keys to be protected by a passphrase | [SSH Private Key with Passphrase Authentication](./linux-ssh-private-key-passphrase-authentication.md) |
| SSH Certificate | When policy requires SSH logins to use a certificate signed by a trusted CA | [SSH Certificate Authentication](./linux-ssh-certificate-authentication.md) |
| Username and Password | Only when no key or certificate is available | [SSH Password Authentication](./linux-ssh-password-authentication.md) |

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

Complete the SSH connection fields. These are the same for every authentication type:

| Field | Parameter | Value |
|-------|-----------|-------|
| target | `ssh_target` | Hostname or IP address (e.g. `8.243.164.21`) |
| user | `ssh_user` | Service account (e.g. `itoss`) |
| port | `ssh_port` | `22` |

The remaining fields depend on the authentication type:

| Field | Parameter | Password | Private Key | Private Key with Passphrase | Certificate |
|-------|-----------|----------|-------------|-----------------------------|-------------|
| authenticationtype | `ssh_authenticationType` | `PASSWORD` | `PRIVATE_KEY` | `PRIVATE_KEY_PASSPHRASE` | `CERTIFICATE` |
| password | `ssh_password` | Service account password | `N/A` | Private key passphrase | Private key passphrase, or `N/A` if the key has no passphrase |
| identityfile | `ssh_identityFile` | `N/A` | Private key file name (e.g. `srv-web-01.key`) | Private key file name (e.g. `srv-db-02.key`) | Private key file name (e.g. `srv-erp-01.key`) |

For the key and certificate types, place the private key in the `ssh-keys` folder of the ITOSS installation. `ssh_identityFile` holds only the file name, without the folder.

- **Private Key and Private Key with Passphrase**: install the matching public key in `~/.ssh/authorized_keys` of the service account on the target server.
- **Certificate**: place the certificate next to the private key (e.g. `srv-erp-01.key-cert.pub`). It has no field of its own. The target server must trust the signing CA through `TrustedUserCAKeys`.

See the guide for each method under [Supported Authentication Methods](#supported-authentication-methods) for the full procedure.
