---
title: SSH Private Key Authentication for ITOSS (Windows)
sidebar_label: SSH - Private Key
sidebar_position: 2
---

# SSH Private Key Authentication for ITOSS (Windows)

## Overview

This document describes how to configure an SSH CT that authenticates against a Windows server running OpenSSH Server with a private key that has **no passphrase** (`ssh_authenticationType` = `PRIVATE_KEY`).

The public key is authorized in the user's `authorized_keys` on the server. The private key is protected only by the permissions of the file. If the key must be protected by a passphrase, see [SSH Private Key with Passphrase Authentication](windows-ssh-private-key-passphrase-authentication.md).

The example uses the fictional company Acme and its application server `srv-win-app-01.acme.local`, with a local account.

# Architecture Overview

```
+-----------------------------------+
|          ITOSS Manager            |
|  ./ssh-keys/srv-win-app-01.key    |
+-----------------+-----------------+
                  |
                  | Key encrypted with ITOSS_CRYPTO_KEY
                  v
+-----------------------------------+
|         ITOSS Collector           |
|  Decrypts the key in memory       |
+-----------------+-----------------+
                  |
                  | Public key authentication
                  v
+-----------------------------------+
|      Target Windows Server        |
|  C:\Users\itoss\.ssh\             |
|      authorized_keys              |
+-----------------------------------+
```

The key is never stored in the CT or in the database. It is placed in the `ssh-keys` folder of the ITOSS installation, and the CT holds only the file name. Every time a collector downloads its configuration, or a command or job runs on the CT, ITOSS reads the file, encrypts it with `ITOSS_CRYPTO_KEY` and sends it. The collector decrypts it in memory and never writes it to disk.

# Prerequisites

- Windows Server 2019 or later (or Windows 10 1809 or later) with OpenSSH Server installed and running. See Step 1 of [SSH Password Authentication](windows-ssh-password-authentication.md).

- Local administrator access to the target server.

- Network connectivity between the ITOSS collector and the monitored system (TCP 22 by default).

- itoss-manager, itoss-collector and itoss-jobscheduler at version 8.8.0 or later, all with the same `ITOSS_CRYPTO_KEY`.

Commands on the Windows server run in PowerShell as Administrator. Commands on the ITOSS host run in a Linux shell, in the ITOSS installation folder.

# Step 1 - Create a Dedicated Monitoring User

On the target server:

```
$password = Read-Host -AsSecureString 'Password for itoss'
New-LocalUser -Name itoss -Password $password -PasswordNeverExpires -Description 'ITOSS monitoring'
Add-LocalGroupMember -Group Users -Member itoss
```

Log in once with that password so that Windows creates the user profile (`C:\Users\itoss`). From the ITOSS host:

```
ssh itoss@srv-win-app-01.acme.local whoami
```

Do not create `C:\Users\itoss` by hand: if the folder exists before the first logon, Windows creates the profile in a different folder and `sshd` does not find the keys.

Do not add the account to `Administrators`. For members of that group, `sshd` ignores the user's `authorized_keys` and reads `C:\ProgramData\ssh\administrators_authorized_keys` instead.

# Step 2 - Generate the Key Pair

On the ITOSS host, with an empty passphrase (`-N ""`):

```
ssh-keygen -t ed25519 -N "" -f ssh-keys/srv-win-app-01.key -C itoss-monitoring
chmod 600 ssh-keys/srv-win-app-01.key
```

Generated files:

```
srv-win-app-01.key       -> Private Key (stays in ITOSS)
srv-win-app-01.key.pub   -> Public Key  (sent to the server administrator)
```

Supported key types: Ed25519 and RSA (OpenSSH or PEM format).

# Step 3 - Install the Public Key on the Target Server

Copy `srv-win-app-01.key.pub` to the server, then:

```
$sshDir = 'C:\Users\itoss\.ssh'
New-Item -ItemType Directory -Force -Path $sshDir | Out-Null
Get-Content .\srv-win-app-01.key.pub | Add-Content -Path "$sshDir\authorized_keys" -Encoding ascii
```

The file must be ASCII or UTF-8 without BOM. A UTF-16 file (the default of `>` in Windows PowerShell) is ignored by `sshd`.

Apply permissions. Only the user, `SYSTEM` and `Administrators` may access the file:

```
icacls "$sshDir\authorized_keys" /inheritance:r /grant "itoss:F" /grant "SYSTEM:F" /grant "Administrators:F"
```

Ensure public key authentication is enabled in `C:\ProgramData\ssh\sshd_config`:

```
PubkeyAuthentication yes
```

# Step 4 - Disable Password Authentication for the Account (Optional)

Add at the end of `C:\ProgramData\ssh\sshd_config`:

```
Match User itoss
    PasswordAuthentication no
```

Validate and restart:

```
& "$env:WINDIR\System32\OpenSSH\sshd.exe" -t
Restart-Service sshd
```

# Step 5 - Validate the SSH Connection

From the ITOSS installation folder:

```
ssh -i ssh-keys/srv-win-app-01.key itoss@srv-win-app-01.acme.local whoami
```

It must not prompt for anything and must return:

```
srv-win-app-01\itoss
```

# Step 6 - Configure the CT in ITOSS

```
ssh_target             : srv-win-app-01.acme.local
ssh_user               : itoss
ssh_port               : 22
ssh_authenticationType : PRIVATE_KEY
ssh_password           : N/A
ssh_identityFile       : srv-win-app-01.key
```

Where:

- `ssh_identityFile` holds only the file name, without the folder.

- `ssh_password` does not apply and is set to `N/A`.

# SSH Key Rotation Procedure

On the ITOSS host, generate the replacement key under a temporary name:

```
ssh-keygen -t ed25519 -N "" -f ssh-keys/srv-win-app-01.key.new -C itoss-monitoring-v2
```

On the target server, append the new public key:

```
Get-Content .\srv-win-app-01.key.new.pub | Add-Content -Path 'C:\Users\itoss\.ssh\authorized_keys' -Encoding ascii
```

Validate connectivity with the new key:

```
ssh -i ssh-keys/srv-win-app-01.key.new itoss@srv-win-app-01.acme.local whoami
```

Replace the file in ITOSS, keeping the name used by the CT. The CT is not edited:

```
mv ssh-keys/srv-win-app-01.key.new ssh-keys/srv-win-app-01.key
```

Remove the previous key line from `C:\Users\itoss\.ssh\authorized_keys`.

# Troubleshooting

## Messages in the ITOSS Monitor

| Situation | Message in the monitor |
|---|---|
| The key actually has a passphrase | `ssh_identityFile: la clave esta cifrada: use PRIVATE_KEY_PASSPHRASE con la passphrase en ssh_password` |
| The file is not in `ssh-keys`, or the name is misspelled | `ssh_identityFile: no se pudo leer el archivo; no esta en ITOSS_SSH_KEYS_DIR del manager…` |
| `ssh_identityFile` was left as `N/A` | `ssh_identityFile: PRIVATE_KEY necesita la clave privada en ssh_identityFile` |
| The server does not accept the key | `Auth fail` |

## Permission denied (publickey)

The most common causes on Windows:

- The account is a member of `Administrators`, so `sshd` reads `C:\ProgramData\ssh\administrators_authorized_keys`.

- `authorized_keys` is UTF-16 or has a BOM.

- `authorized_keys` grants access to other users.

- The profile was created in a different folder (for example `C:\Users\itoss.SRV-WIN-APP-01`).

Verify:

```
Get-LocalGroupMember -Group Administrators
icacls C:\Users\itoss\.ssh\authorized_keys
(Get-CimInstance Win32_UserProfile | Where-Object LocalPath -like '*itoss*').LocalPath
```

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
ssh -vvv -i ssh-keys/srv-win-app-01.key itoss@srv-win-app-01.acme.local
```

# Security Best Practices

- Create a dedicated local account for ITOSS and keep it out of `Administrators`.

- Keep the `ssh-keys` folder readable only by the ITOSS service.

- Use a passphrase if the policy requires the key file to be useless when copied.

- Restrict the firewall rule to the collector's IP address.

- Rotate keys periodically.

- Disable password authentication for the monitoring account.

# Conclusion

Private key authentication avoids storing a password for the monitoring account. Rotating the key is replacing a file in ITOSS, with no changes to the CT.
