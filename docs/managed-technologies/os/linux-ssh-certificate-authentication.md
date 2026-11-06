
# SSH Certificate Authentication for ITOSS (Linux)

## Overview

This document describes how to configure an SSH CT that authenticates against a Linux server with an **OpenSSH certificate signed by a CA** the server trusts (`ssh_authenticationType` = `CERTIFICATE`).

The server does not list the ITOSS key in any `authorized_keys`. It accepts the connection because the certificate is signed by a CA configured in `TrustedUserCAKeys`.

One type covers both variants:

- **Without passphrase**: the private key has no passphrase. `ssh_password` is `N/A`.
- **With passphrase**: the private key has a passphrase. `ssh_password` holds it.

The CA is never loaded into ITOSS, and the certificate does not need its own field. ITOSS receives two files, the private key and the certificate. The CT holds only the key file name, and ITOSS derives the certificate name from it.

The example uses the fictional company Acme and its ERP server `srv-erp-01.acme.local`, whose policy requires every SSH login to use a certificate signed by the company's CA.

# Architecture Overview

```
+-------------------------------+        +----------------------+
|        ITOSS Manager          |        |  Acme Security Team  |
|  ./ssh-keys/                  |        |  acme-user-ca (CA)   |
|    srv-erp-01.key             |<-------+  signs the key       |
|    srv-erp-01.key-cert.pub    |        +----------+-----------+
+---------------+---------------+                   |
                |                                   | acme-user-ca.pub
                | Key and certificate encrypted     |
                | with ITOSS_CRYPTO_KEY             |
                v                                   |
+-------------------------------+                   |
|       ITOSS Collector         |                   |
|  Decrypts in memory           |                   |
+---------------+---------------+                   |
                |                                   |
                | Certificate authentication        |
                v                                   v
+---------------------------------------------------------------+
|                    Target Linux Server                        |
|        TrustedUserCAKeys /etc/ssh/acme-user-ca.pub            |
+---------------------------------------------------------------+
```

What goes where:

| Item | Where it lives | Loaded into ITOSS? |
|---|---|---|
| CA private key (`acme-user-ca`) | Kept by the security team | Never |
| CA public key (`acme-user-ca.pub`) | On every monitored server | No |
| Monitoring private key (`srv-erp-01.key`) | `./ssh-keys` | Yes, in `ssh_identityFile` |
| Certificate (`srv-erp-01.key-cert.pub`) | `./ssh-keys`, next to the key | Yes, without a field |

# Prerequisites

- Linux server with OpenSSH Server installed and running.

- Administrative access to the target server.

- Access to the organization's SSH CA, or permission to create one.

- Network connectivity between the ITOSS collector and the monitored system (TCP 22 by default).

- itoss-manager, itoss-collector and itoss-jobscheduler at version 8.8.0 or later, all with the same `ITOSS_CRYPTO_KEY`.

# Step 1 - Create the CA (Security Team, Once)

The CA usually exists already. If not, create it:

```
ssh-keygen -t ed25519 -f acme-user-ca -C "Acme user CA"
```

Where:

```
acme-user-ca       -> CA Private Key (kept by the security team)
acme-user-ca.pub   -> CA Public Key  (distributed to the servers)
```

# Step 2 - Configure the Target Server to Trust the CA

Copy the CA public key to the target server:

```
sudo cp acme-user-ca.pub /etc/ssh/acme-user-ca.pub
sudo chmod 644 /etc/ssh/acme-user-ca.pub
```

Create the monitoring user:

```
sudo useradd -m -s /bin/bash itoss
sudo passwd -l itoss
```

Add to `/etc/ssh/sshd_config`:

```
TrustedUserCAKeys /etc/ssh/acme-user-ca.pub
```

Validate and reload:

```
sudo sshd -t
sudo systemctl reload sshd
```

No changes to `authorized_keys` are required.

# Step 3 - Generate the Monitoring Key

In the ITOSS installation folder. Choose the variant at this step.

Without passphrase:

```
ssh-keygen -t ed25519 -N "" -f ssh-keys/srv-erp-01.key -C itoss-monitoring
```

With passphrase:

```
ssh-keygen -t ed25519 -N 'Erp#2026-mon' -f ssh-keys/srv-erp-01.key -C itoss-monitoring
```

For the variant with passphrase, record it. It is needed in Step 6.

Both variants generate:

```
srv-erp-01.key       -> Private Key (stays in ITOSS)
srv-erp-01.key.pub   -> Public Key  (sent to the security team)
```

Steps 4 and 5 are identical for both variants.

# Step 4 - Sign the Public Key (Security Team)

```
ssh-keygen -s acme-user-ca -I itoss-srv-erp-01 -n itoss -V +52w srv-erp-01.key.pub
```

Where:

- `-I itoss-srv-erp-01`: the certificate identity, shown in the server logs.

- `-n itoss`: the user the certificate is valid for. It must match `ssh_user`.

- `-V +52w`: the certificate expires in one year.

The command generates `srv-erp-01.key-cert.pub`, which is returned to the ITOSS operator. The CA signs the public key only, so it does not know or care whether the private key has a passphrase.

# Step 5 - Place the Files in ITOSS and Validate

```
ssh-keys/
├── srv-erp-01.key            # private key (Step 3)
├── srv-erp-01.key.pub        # not used, may stay
└── srv-erp-01.key-cert.pub   # certificate (Step 4)
```

Inspect the certificate (user, CA and validity):

```
ssh-keygen -L -f ssh-keys/srv-erp-01.key-cert.pub
```

Test the connection:

```
ssh -i ssh-keys/srv-erp-01.key itoss@srv-erp-01.acme.local id -un
```

It must return `itoss`. With a passphrase, it prompts for it first. Like ITOSS, `ssh` picks up the certificate located next to the key.

# Step 6 - Configure the CT in ITOSS

```
ssh_target             : srv-erp-01.acme.local
ssh_user               : itoss
ssh_port               : 22
ssh_authenticationType : CERTIFICATE
ssh_password           : N/A  or  the key passphrase
ssh_identityFile       : srv-erp-01.key
```

Only `ssh_password` changes between the variants:

| Variant | `ssh_authenticationType` | `ssh_password` |
|---|---|---|
| Without passphrase | `CERTIFICATE` | `N/A` |
| With passphrase | `CERTIFICATE` | `Erp#2026-mon` (stored encrypted) |

How ITOSS finds the certificate: it appends `-cert.pub` to the key name:

```
srv-erp-01.key  +  -cert.pub  =  srv-erp-01.key-cert.pub
```

This is the OpenSSH convention. `ssh-keygen -s` already uses that name when signing, so usually nothing needs to be renamed. If the certificate arrives under a different name, rename it.

An absolute path in `ssh_identityFile` keeps the behavior of earlier versions: the collector reads the key from its own disk, and the certificate from `<path>-cert.pub` on that same disk.

# Certificate Renewal Procedure

Before the certificate expires, the security team signs the same public key again:

```
ssh-keygen -s acme-user-ca -I itoss-srv-erp-01 -n itoss -V +52w srv-erp-01.key.pub
```

Replace `ssh-keys/srv-erp-01.key-cert.pub` with the new file. The CT is not edited.

To replace the key as well, repeat Steps 3 to 5 keeping the file names. If the new key has a different passphrase, update `ssh_password`.

To revoke access before the certificate expires, use `RevokedKeys` in the server's `sshd_config`.

# Troubleshooting

## Messages in the ITOSS Monitor

The message never shows the passphrase.

| Situation | Message in the monitor |
|---|---|
| `srv-erp-01.key-cert.pub` is missing | `CERTIFICATE necesita el certificado al lado de la clave, con el nombre de la clave + '-cert.pub'…` |
| The key has a passphrase and `ssh_password` is `N/A` | `ssh_identityFile: la clave esta cifrada: cargue su passphrase en ssh_password` |
| Wrong passphrase | `ssh_identityFile: la clave privada no se pudo cargar (la passphrase de ssh_password no es la de la clave)` |
| The plain `.pub` file was copied instead of the certificate | `el certificado de ssh_identityFile no es un certificado OpenSSH…` |
| The file is not in `ssh-keys`, or the name is misspelled | `ssh_identityFile: no se pudo leer el archivo; no esta en ITOSS_SSH_KEYS_DIR del manager…` |
| The server does not trust the CA, the certificate expired, or the user does not match `-n` | `Auth fail` |

## Verify the Certificate

```
ssh-keygen -L -f ssh-keys/srv-erp-01.key-cert.pub
```

Check that:

- `Principals` includes `itoss`.

- `Valid` covers the current date.

- `Signing CA` is the key configured in `TrustedUserCAKeys`.

## Verify the Server Configuration

```
sudo sshd -T | grep -i trustedusercakeys
```

## Enable SSH Debug Mode

Client side:

```
ssh -vvv -i ssh-keys/srv-erp-01.key itoss@srv-erp-01.acme.local
```

Server side:

```
sudo journalctl -u sshd -f
```

# Security Best Practices

- Keep the CA private key outside ITOSS and outside the monitored servers.

- Issue certificates with a validity period (`-V`) and renew them before they expire.

- Restrict the certificate to the monitoring user with `-n`.

- Use a passphrase on the monitoring key when the policy requires it.

- Keep the `ssh-keys` folder readable only by the ITOSS service.

- Restrict sudo permissions to the minimum required.

- Disable password authentication for the monitoring account.

# Conclusion

Certificate authentication lets the organization control SSH access centrally with its CA: no `authorized_keys` to maintain on each server, and access that expires on its own. ITOSS only needs the key and its certificate, side by side, and the CT holds only the key file name.
