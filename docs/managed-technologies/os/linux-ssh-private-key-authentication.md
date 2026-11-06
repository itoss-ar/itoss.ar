---
title: SSH Private Key Authentication for ITOSS (Linux)
sidebar_label: SSH - Private Key
sidebar_position: 2
---

# SSH Private Key Authentication for ITOSS (Linux)

## Overview

This document describes how to configure an SSH CT that authenticates against a Linux server with a private key that has **no passphrase** (`ssh_authenticationType` = `PRIVATE_KEY`).

The public key is authorized in the server's `authorized_keys`. The private key is protected only by the permissions of the file. If the key must be protected by a passphrase, see [SSH Private Key with Passphrase Authentication](linux-ssh-private-key-passphrase-authentication.md).

The example uses the fictional company Acme and its web server `srv-web-01.acme.local`, where password logins are not allowed.

# Architecture Overview

```
+-------------------------------+
|        ITOSS Manager          |
|  ./ssh-keys/srv-web-01.key    |
+---------------+---------------+
                |
                | Key encrypted with ITOSS_CRYPTO_KEY
                v
+-------------------------------+
|       ITOSS Collector         |
|  Decrypts the key in memory   |
+---------------+---------------+
                |
                | Public key authentication
                v
+-------------------------------+
|      Target Linux Server      |
|  ~itoss/.ssh/authorized_keys  |
+-------------------------------+
```

The key is never stored in the CT or in the database. It is placed in the `ssh-keys` folder of the ITOSS installation, and the CT holds only the file name. Every time a collector downloads its configuration, or a command or job runs on the CT, ITOSS reads the file, encrypts it with `ITOSS_CRYPTO_KEY` and sends it. The collector decrypts it in memory and never writes it to disk.

# Prerequisites

- Linux server with OpenSSH Server installed and running.

- Administrative access to the target server.

- Network connectivity between the ITOSS collector and the monitored system (TCP 22 by default).

- itoss-manager, itoss-collector and itoss-jobscheduler at version 8.8.0 or later, all with the same `ITOSS_CRYPTO_KEY`.

Verify SSH service status:

```
sudo systemctl status sshd
```

# Step 1 - Create a Dedicated Monitoring User

On the target server:

```
sudo useradd -m -s /bin/bash itoss
```

Optionally, lock the password so that only key authentication works:

```
sudo passwd -l itoss
```

# Step 2 - Generate the Key Pair

In the ITOSS installation folder, with an empty passphrase (`-N ""`):

```
ssh-keygen -t ed25519 -N "" -f ssh-keys/srv-web-01.key -C itoss-monitoring
chmod 600 ssh-keys/srv-web-01.key
```

Generated files:

```
srv-web-01.key       -> Private Key (stays in ITOSS)
srv-web-01.key.pub   -> Public Key  (sent to the server administrator)
```

Supported key types: Ed25519 and RSA (OpenSSH or PEM format).

# Step 3 - Install the Public Key on the Target Server

## Option A - Using ssh-copy-id

If the server still accepts a password for `itoss`:

```
ssh-copy-id -i ssh-keys/srv-web-01.key.pub itoss@srv-web-01.acme.local
```

## Option B - Manual Installation

On the target server:

```
sudo mkdir -p /home/itoss/.ssh
cat srv-web-01.key.pub | sudo tee -a /home/itoss/.ssh/authorized_keys
sudo chown -R itoss:itoss /home/itoss/.ssh
sudo chmod 700 /home/itoss/.ssh
sudo chmod 600 /home/itoss/.ssh/authorized_keys
```

Ensure public key authentication is enabled in `/etc/ssh/sshd_config`:

```
PubkeyAuthentication yes
```

# Step 4 - Validate the SSH Connection

From the ITOSS installation folder:

```
ssh -i ssh-keys/srv-web-01.key itoss@srv-web-01.acme.local id -un
```

It must not prompt for anything and must return:

```
itoss
```

# Step 5 - Restrict Access by Source IP (Recommended)

Prefix the key in `/home/itoss/.ssh/authorized_keys` with the collector's IP address:

```
from="10.10.10.20" ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... itoss-monitoring
```

# Step 6 - Configure the CT in ITOSS

```
ssh_target             : srv-web-01.acme.local
ssh_user               : itoss
ssh_port               : 22
ssh_authenticationType : PRIVATE_KEY
ssh_password           : N/A
ssh_identityFile       : srv-web-01.key
```

Where:

- `ssh_identityFile` holds only the file name, without the folder.

- `ssh_password` does not apply and is set to `N/A`.

An absolute path in `ssh_identityFile` (for example `/opt/keys/srv-web-01.key`) keeps the behavior of earlier versions: the collector reads the key from its own disk.

# SSH Key Rotation Procedure

Generate the replacement key under a temporary name:

```
ssh-keygen -t ed25519 -N "" -f ssh-keys/srv-web-01.key.new -C itoss-monitoring-v2
```

Install the new public key on the target server:

```
cat srv-web-01.key.new.pub | sudo tee -a /home/itoss/.ssh/authorized_keys
```

Validate connectivity with the new key:

```
ssh -i ssh-keys/srv-web-01.key.new itoss@srv-web-01.acme.local id -un
```

Replace the file in ITOSS, keeping the name used by the CT. The CT is not edited:

```
mv ssh-keys/srv-web-01.key.new ssh-keys/srv-web-01.key
```

Remove the previous key entry from `/home/itoss/.ssh/authorized_keys`.

# Troubleshooting

## Messages in the ITOSS Monitor

| Situation | Message in the monitor |
|---|---|
| The key actually has a passphrase | `ssh_identityFile: la clave esta cifrada: use PRIVATE_KEY_PASSPHRASE con la passphrase en ssh_password` |
| The file is not in `ssh-keys`, or the name is misspelled | `ssh_identityFile: no se pudo leer el archivo; no esta en ITOSS_SSH_KEYS_DIR del manager…` |
| `ssh_identityFile` was left as `N/A` | `ssh_identityFile: PRIVATE_KEY necesita la clave privada en ssh_identityFile` |
| The key is not in the server's `authorized_keys` | `Auth fail` |

If the key has a passphrase, follow [SSH Private Key with Passphrase Authentication](linux-ssh-private-key-passphrase-authentication.md).

## Permission denied (publickey)

Verify permissions and ownership on the target server:

```
sudo chmod 700 /home/itoss/.ssh
sudo chmod 600 /home/itoss/.ssh/authorized_keys
sudo chown -R itoss:itoss /home/itoss/.ssh
```

Verify the installed keys:

```
sudo cat /home/itoss/.ssh/authorized_keys
```

## Enable SSH Debug Mode

Client side:

```
ssh -vvv -i ssh-keys/srv-web-01.key itoss@srv-web-01.acme.local
```

Server side:

```
sudo journalctl -u sshd -f
```

# Security Best Practices

- Create a dedicated account for ITOSS.

- Keep the `ssh-keys` folder readable only by the ITOSS service.

- Use a passphrase if the policy requires the key file to be useless when copied.

- Restrict sudo permissions to the minimum required.

- Restrict source IP addresses in `authorized_keys`.

- Rotate keys periodically.

- Disable password authentication for the monitoring account.

# Conclusion

Private key authentication avoids storing a password for the monitoring account. Rotating the key is replacing a file in ITOSS, with no changes to the CT.
