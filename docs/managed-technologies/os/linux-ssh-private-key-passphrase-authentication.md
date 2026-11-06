# SSH Private Key with Passphrase Authentication for ITOSS

## Overview

This document describes how to configure an SSH CT that authenticates against a Linux server with a private key **protected by a passphrase** (`ssh_authenticationType` = `PRIVATE_KEY_PASSPHRASE`).

The server is configured exactly as for a key without passphrase: the public key is authorized in `authorized_keys`. The passphrase only protects the private key file, so a copied file cannot be used without it.

The example uses the fictional company Acme and its database server `srv-db-02.acme.local`, whose policy requires every private key to have a passphrase.

# Architecture Overview

```
+-------------------------------+
|        ITOSS Manager          |
|  ./ssh-keys/srv-db-02.key     |
|  CT: ssh_password = passphrase|
+---------------+---------------+
                |
                | Key and passphrase encrypted
                | with ITOSS_CRYPTO_KEY
                v
+-------------------------------+
|       ITOSS Collector         |
|  Decrypts and opens the key   |
|  in memory                    |
+---------------+---------------+
                |
                | Public key authentication
                v
+-------------------------------+
|      Target Linux Server      |
|  ~itoss/.ssh/authorized_keys  |
+-------------------------------+
```

The key is never stored in the CT or in the database. It is placed in the `ssh-keys` folder of the ITOSS installation, and the CT holds only the file name. The passphrase is stored encrypted in `ssh_password`.

# Prerequisites

- Linux server with OpenSSH Server installed and running.

- Administrative access to the target server.

- Network connectivity between the ITOSS collector and the monitored system (TCP 22 by default).

- itoss-manager, itoss-collector and itoss-jobscheduler at version 8.8.0 or later, all with the same `ITOSS_CRYPTO_KEY`.

# Step 1 - Create a Dedicated Monitoring User

On the target server:

```
sudo useradd -m -s /bin/bash itoss
sudo passwd -l itoss
```

# Step 2 - Generate the Key Pair with a Passphrase

In the ITOSS installation folder:

```
ssh-keygen -t ed25519 -N 'Db#2026-mon' -f ssh-keys/srv-db-02.key -C itoss-monitoring
chmod 600 ssh-keys/srv-db-02.key
```

Generated files:

```
srv-db-02.key       -> Private Key, encrypted (stays in ITOSS)
srv-db-02.key.pub   -> Public Key (sent to the server administrator)
```

Record the passphrase (`Db#2026-mon` in this example). It is needed in Step 6.

Supported key types: Ed25519 and RSA (OpenSSH or PEM format).

# Step 3 - Install the Public Key on the Target Server

On the target server:

```
sudo mkdir -p /home/itoss/.ssh
cat srv-db-02.key.pub | sudo tee -a /home/itoss/.ssh/authorized_keys
sudo chown -R itoss:itoss /home/itoss/.ssh
sudo chmod 700 /home/itoss/.ssh
sudo chmod 600 /home/itoss/.ssh/authorized_keys
```

The server only sees the public key, so the passphrase makes no difference to it.

# Step 4 - Validate the SSH Connection

From the ITOSS installation folder:

```
ssh -i ssh-keys/srv-db-02.key itoss@srv-db-02.acme.local id -un
```

It prompts for the key passphrase and must return:

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
ssh_target             : srv-db-02.acme.local
ssh_user               : itoss
ssh_port               : 22
ssh_authenticationType : PRIVATE_KEY_PASSPHRASE
ssh_password           : Db#2026-mon
ssh_identityFile       : srv-db-02.key
```

Where:

- `ssh_password` is the **passphrase of the private key**, not the user's password on the server. It is stored encrypted.

- `ssh_identityFile` holds only the file name, without the folder.

# SSH Key Rotation Procedure

Generate the replacement key under a temporary name:

```
ssh-keygen -t ed25519 -N 'Db#2027-mon' -f ssh-keys/srv-db-02.key.new -C itoss-monitoring-v2
```

Install the new public key on the target server:

```
cat srv-db-02.key.new.pub | sudo tee -a /home/itoss/.ssh/authorized_keys
```

Validate connectivity with the new key:

```
ssh -i ssh-keys/srv-db-02.key.new itoss@srv-db-02.acme.local id -un
```

Replace the file in ITOSS, keeping the name used by the CT:

```
mv ssh-keys/srv-db-02.key.new ssh-keys/srv-db-02.key
```

If the passphrase changed, update `ssh_password` in the CT at the same time.

Remove the previous key entry from `/home/itoss/.ssh/authorized_keys`.

# Troubleshooting

## Messages in the ITOSS Monitor

The message never shows the passphrase.

| Situation | Message in the monitor |
|---|---|
| `ssh_password` was left as `N/A` | `ssh_password: PRIVATE_KEY_PASSPHRASE necesita la passphrase de la clave en ssh_password` |
| Wrong passphrase | `ssh_identityFile: la clave privada no se pudo cargar (la passphrase de ssh_password no es la de la clave)` |
| Different `ITOSS_CRYPTO_KEY` on the manager and the collector | `ssh_password: no se pudo descifrar la passphrase; ITOSS_CRYPTO_KEY tiene que ser la misma en el manager y en el collector` |
| The file is not in `ssh-keys`, or the name is misspelled | `ssh_identityFile: no se pudo leer el archivo; no esta en ITOSS_SSH_KEYS_DIR del manager…` |
| The key is not in the server's `authorized_keys` | `Auth fail` |

## Verify the Passphrase

This command prints the public key only if the passphrase is correct:

```
ssh-keygen -y -f ssh-keys/srv-db-02.key
```

## Permission denied (publickey)

Verify permissions and ownership on the target server:

```
sudo chmod 700 /home/itoss/.ssh
sudo chmod 600 /home/itoss/.ssh/authorized_keys
sudo chown -R itoss:itoss /home/itoss/.ssh
```

## Enable SSH Debug Mode

Client side:

```
ssh -vvv -i ssh-keys/srv-db-02.key itoss@srv-db-02.acme.local
```

Server side:

```
sudo journalctl -u sshd -f
```

# Security Best Practices

- Create a dedicated account for ITOSS.

- Use a long, random passphrase and do not reuse it for other keys.

- Keep the `ssh-keys` folder readable only by the ITOSS service.

- Restrict sudo permissions to the minimum required.

- Restrict source IP addresses in `authorized_keys`.

- Rotate keys periodically.

- Disable password authentication for the monitoring account.

# Conclusion

A passphrase adds a second factor to the key file: copying the file is not enough to log in. ITOSS keeps the passphrase encrypted in the CT and opens the key only in memory.
