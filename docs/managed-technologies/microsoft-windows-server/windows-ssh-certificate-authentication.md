---
title: SSH Certificate Authentication for ITOSS (Windows)
sidebar_label: SSH - Certificate
sidebar_position: 4
---

# SSH Certificate Authentication for ITOSS (Windows)

## Overview

This document describes how to configure an SSH CT that authenticates against a Windows server running OpenSSH Server with an **OpenSSH certificate signed by a CA** the server trusts (`ssh_authenticationType` = `CERTIFICATE`).

The server does not list the ITOSS key in any `authorized_keys`. It accepts the connection because the certificate is signed by a CA configured in `TrustedUserCAKeys`.

One type covers both variants:

- **Without passphrase**: the private key has no passphrase. `ssh_password` is `N/A`.
- **With passphrase**: the private key has a passphrase. `ssh_password` holds it.

The CA is never loaded into ITOSS, and the certificate does not need its own field. ITOSS receives two files, the private key and the certificate. The CT holds only the key file name, and ITOSS derives the certificate name from it.

The example uses the fictional company Acme and its ERP server `srv-win-erp-02.acme.local`, with a local account. Acme's policy requires every SSH login to use a certificate signed by the company's CA.

# Architecture Overview

```
+-----------------------------------+        +----------------------+
|          ITOSS Manager            |        |  Acme Security Team  |
|  ./ssh-keys/                      |        |  acme-user-ca (CA)   |
|    srv-win-erp-02.key             |<-------+  signs the key       |
|    srv-win-erp-02.key-cert.pub    |        +----------+-----------+
+-----------------+-----------------+                   |
                  |                                     | acme-user-ca.pub
                  | Key and certificate encrypted       |
                  | with ITOSS_CRYPTO_KEY               |
                  v                                     |
+-----------------------------------+                   |
|         ITOSS Collector           |                   |
|  Decrypts in memory               |                   |
+-----------------+-----------------+                   |
                  |                                     |
                  | Certificate authentication          |
                  v                                     v
+---------------------------------------------------------------------+
|                     Target Windows Server                           |
|   TrustedUserCAKeys __PROGRAMDATA__/ssh/acme-user-ca.pub            |
+---------------------------------------------------------------------+
```

What goes where:

| Item | Where it lives | Loaded into ITOSS? |
|---|---|---|
| CA private key (`acme-user-ca`) | Kept by the security team | Never |
| CA public key (`acme-user-ca.pub`) | On every monitored server | No |
| Monitoring private key (`srv-win-erp-02.key`) | `./ssh-keys` | Yes, in `ssh_identityFile` |
| Certificate (`srv-win-erp-02.key-cert.pub`) | `./ssh-keys`, next to the key | Yes, without a field |

# Prerequisites

- Windows Server 2019 or later (or Windows 10 1809 or later) with OpenSSH Server installed and running. See Step 1 of [SSH Password Authentication](windows-ssh-password-authentication.md).

- Local administrator access to the target server.

- Access to the organization's SSH CA, or permission to create one.

- Network connectivity between the ITOSS collector and the monitored system (TCP 22 by default).

- itoss-manager, itoss-collector and itoss-jobscheduler at version 8.8.0 or later, all with the same `ITOSS_CRYPTO_KEY`.

Commands on the Windows server run in PowerShell as Administrator. Commands on the ITOSS host and on the CA run in a Linux shell.

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

The same CA serves Linux and Windows servers.

# Step 2 - Configure the Target Server to Trust the CA

Copy `acme-user-ca.pub` to `C:\ProgramData\ssh\acme-user-ca.pub` and restrict its permissions:

```
icacls "$env:ProgramData\ssh\acme-user-ca.pub" /inheritance:r /grant "SYSTEM:F" /grant "Administrators:F"
```

Create the monitoring user:

```
$password = Read-Host -AsSecureString 'Password for itoss'
New-LocalUser -Name itoss -Password $password -PasswordNeverExpires -Description 'ITOSS monitoring'
Add-LocalGroupMember -Group Users -Member itoss
```

Add to `C:\ProgramData\ssh\sshd_config`, **before** any `Match` block:

```
TrustedUserCAKeys __PROGRAMDATA__/ssh/acme-user-ca.pub
```

Optionally, at the end of the file, disable password authentication for the account:

```
Match User itoss
    PasswordAuthentication no
```

Validate and restart:

```
& "$env:WINDIR\System32\OpenSSH\sshd.exe" -t
Restart-Service sshd
```

No `authorized_keys` file is required. Unlike key authentication, the account may also be a member of `Administrators` without changing this setup, although that is not recommended for monitoring.

# Step 3 - Generate the Monitoring Key

On the ITOSS host, in the ITOSS installation folder. Choose the variant at this step.

Without passphrase:

```
ssh-keygen -t ed25519 -N "" -f ssh-keys/srv-win-erp-02.key -C itoss-monitoring
```

With passphrase:

```
ssh-keygen -t ed25519 -N 'WinErp#2026-mon' -f ssh-keys/srv-win-erp-02.key -C itoss-monitoring
```

For the variant with passphrase, record it. It is needed in Step 6.

Both variants generate:

```
srv-win-erp-02.key       -> Private Key (stays in ITOSS)
srv-win-erp-02.key.pub   -> Public Key  (sent to the security team)
```

Steps 4 and 5 are identical for both variants.

# Step 4 - Sign the Public Key (Security Team)

```
ssh-keygen -s acme-user-ca -I itoss-srv-win-erp-02 -n itoss -V +52w srv-win-erp-02.key.pub
```

Where:

- `-I itoss-srv-win-erp-02`: the certificate identity, shown in the server logs.

- `-n itoss`: the user the certificate is valid for. It must match `ssh_user`.

- `-V +52w`: the certificate expires in one year.

The command generates `srv-win-erp-02.key-cert.pub`, which is returned to the ITOSS operator. The CA signs the public key only, so it does not know or care whether the private key has a passphrase.

# Step 5 - Place the Files in ITOSS and Validate

```
ssh-keys/
├── srv-win-erp-02.key            # private key (Step 3)
├── srv-win-erp-02.key.pub        # not used, may stay
└── srv-win-erp-02.key-cert.pub   # certificate (Step 4)
```

Inspect the certificate (user, CA and validity):

```
ssh-keygen -L -f ssh-keys/srv-win-erp-02.key-cert.pub
```

Test the connection:

```
ssh -i ssh-keys/srv-win-erp-02.key itoss@srv-win-erp-02.acme.local whoami
```

It must return `srv-win-erp-02\itoss`. With a passphrase, it prompts for it first. Like ITOSS, `ssh` picks up the certificate located next to the key.

# Step 6 - Configure the CT in ITOSS

```
ssh_target             : srv-win-erp-02.acme.local
ssh_user               : itoss
ssh_port               : 22
ssh_authenticationType : CERTIFICATE
ssh_password           : N/A  or  the key passphrase
ssh_identityFile       : srv-win-erp-02.key
```

Only `ssh_password` changes between the variants:

| Variant | `ssh_authenticationType` | `ssh_password` |
|---|---|---|
| Without passphrase | `CERTIFICATE` | `N/A` |
| With passphrase | `CERTIFICATE` | `WinErp#2026-mon` (stored encrypted) |

How ITOSS finds the certificate: it appends `-cert.pub` to the key name:

```
srv-win-erp-02.key  +  -cert.pub  =  srv-win-erp-02.key-cert.pub
```

This is the OpenSSH convention. `ssh-keygen -s` already uses that name when signing, so usually nothing needs to be renamed. If the certificate arrives under a different name, rename it.

# Certificate Renewal Procedure

Before the certificate expires, the security team signs the same public key again:

```
ssh-keygen -s acme-user-ca -I itoss-srv-win-erp-02 -n itoss -V +52w srv-win-erp-02.key.pub
```

Replace `ssh-keys/srv-win-erp-02.key-cert.pub` with the new file. The CT is not edited.

To replace the key as well, repeat Steps 3 to 5 keeping the file names. If the new key has a different passphrase, update `ssh_password`.

To revoke access before the certificate expires, use `RevokedKeys` in the server's `sshd_config`.

# Troubleshooting

## Messages in the ITOSS Monitor

The message never shows the passphrase.

| Situation | Message in the monitor |
|---|---|
| `srv-win-erp-02.key-cert.pub` is missing | `CERTIFICATE necesita el certificado al lado de la clave, con el nombre de la clave + '-cert.pub'…` |
| The key has a passphrase and `ssh_password` is `N/A` | `ssh_identityFile: la clave esta cifrada: cargue su passphrase en ssh_password` |
| Wrong passphrase | `ssh_identityFile: la clave privada no se pudo cargar (la passphrase de ssh_password no es la de la clave)` |
| The plain `.pub` file was copied instead of the certificate | `el certificado de ssh_identityFile no es un certificado OpenSSH…` |
| The file is not in `ssh-keys`, or the name is misspelled | `ssh_identityFile: no se pudo leer el archivo; no esta en ITOSS_SSH_KEYS_DIR del manager…` |
| The server does not trust the CA, the certificate expired, or the user does not match `-n` | `Auth fail` |

## Verify the Certificate

On the ITOSS host:

```
ssh-keygen -L -f ssh-keys/srv-win-erp-02.key-cert.pub
```

Check that:

- `Principals` includes `itoss`.

- `Valid` covers the current date.

- `Signing CA` is the key configured in `TrustedUserCAKeys`.

## Verify the Server Configuration

```
Select-String -Path "$env:ProgramData\ssh\sshd_config" -Pattern 'TrustedUserCAKeys'
icacls "$env:ProgramData\ssh\acme-user-ca.pub"
```

`TrustedUserCAKeys` must not be inside a `Match` block, and the CA file must be readable by `SYSTEM`.

## Review the SSH Logs

```
Get-WinEvent -LogName 'OpenSSH/Operational' -MaxEvents 20 | Format-List TimeCreated, Message
```

For detailed server output, stop the service and run `sshd` in debug mode (it serves one connection and exits):

```
Stop-Service sshd
& "$env:WINDIR\System32\OpenSSH\sshd.exe" -d
Start-Service sshd
```

Client side, from the ITOSS host:

```
ssh -vvv -i ssh-keys/srv-win-erp-02.key itoss@srv-win-erp-02.acme.local
```

# Security Best Practices

- Keep the CA private key outside ITOSS and outside the monitored servers.

- Issue certificates with a validity period (`-V`) and renew them before they expire.

- Restrict the certificate to the monitoring user with `-n`.

- Use a passphrase on the monitoring key when the policy requires it.

- Keep the `ssh-keys` folder readable only by the ITOSS service.

- Create a dedicated local account for ITOSS and keep it out of `Administrators`.

- Restrict the firewall rule to the collector's IP address.

# Conclusion

Certificate authentication lets the organization control SSH access centrally with its CA, for Linux and Windows servers alike: no `authorized_keys` to maintain on each server, and access that expires on its own. ITOSS only needs the key and its certificate, side by side, and the CT holds only the key file name.
