# SSH Private Key with Passphrase Authentication for ITOSS

## Overview

This document describes how to configure an SSH CT that authenticates against a Windows server running OpenSSH Server with a private key **protected by a passphrase** (`ssh_authenticationType` = `PRIVATE_KEY_PASSPHRASE`).

The server is configured exactly as for a key without passphrase: the public key is authorized in the user's `authorized_keys`. The passphrase only protects the private key file, so a copied file cannot be used without it.

The example uses the fictional company Acme and its database server `srv-win-sql-02.acme.local`, whose policy requires every private key to have a passphrase.

# Architecture Overview

```
+-----------------------------------+
|          ITOSS Manager            |
|  ./ssh-keys/srv-win-sql-02.key    |
|  CT: ssh_password = passphrase    |
+-----------------+-----------------+
                  |
                  | Key and passphrase encrypted
                  | with ITOSS_CRYPTO_KEY
                  v
+-----------------------------------+
|         ITOSS Collector           |
|  Decrypts and opens the key       |
|  in memory                        |
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

The key is never stored in the CT or in the database. It is placed in the `ssh-keys` folder of the ITOSS installation, and the CT holds only the file name. The passphrase is stored encrypted in `ssh_password`.

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
ssh itoss@srv-win-sql-02.acme.local whoami
```

Do not create `C:\Users\itoss` by hand, and do not add the account to `Administrators` (members of that group use `C:\ProgramData\ssh\administrators_authorized_keys`).

# Step 2 - Generate the Key Pair with a Passphrase

On the ITOSS host:

```
ssh-keygen -t ed25519 -N 'Sql#2026-mon' -f ssh-keys/srv-win-sql-02.key -C itoss-monitoring
chmod 600 ssh-keys/srv-win-sql-02.key
```

Generated files:

```
srv-win-sql-02.key       -> Private Key, encrypted (stays in ITOSS)
srv-win-sql-02.key.pub   -> Public Key (sent to the server administrator)
```

Record the passphrase (`Sql#2026-mon` in this example). It is needed in Step 6.

Supported key types: Ed25519 and RSA (OpenSSH or PEM format).

# Step 3 - Install the Public Key on the Target Server

Copy `srv-win-sql-02.key.pub` to the server, then:

```
$sshDir = 'C:\Users\itoss\.ssh'
New-Item -ItemType Directory -Force -Path $sshDir | Out-Null
Get-Content .\srv-win-sql-02.key.pub | Add-Content -Path "$sshDir\authorized_keys" -Encoding ascii
icacls "$sshDir\authorized_keys" /inheritance:r /grant "itoss:F" /grant "SYSTEM:F" /grant "Administrators:F"
```

The server only sees the public key, so the passphrase makes no difference to it.

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
ssh -i ssh-keys/srv-win-sql-02.key itoss@srv-win-sql-02.acme.local whoami
```

It prompts for the key passphrase and must return:

```
srv-win-sql-02\itoss
```

# Step 6 - Configure the CT in ITOSS

```
ssh_target             : srv-win-sql-02.acme.local
ssh_user               : itoss
ssh_port               : 22
ssh_authenticationType : PRIVATE_KEY_PASSPHRASE
ssh_password           : Sql#2026-mon
ssh_identityFile       : srv-win-sql-02.key
```

Where:

- `ssh_password` is the **passphrase of the private key**, not the Windows password of `itoss`. It is stored encrypted.

- `ssh_identityFile` holds only the file name, without the folder.

# SSH Key Rotation Procedure

On the ITOSS host, generate the replacement key under a temporary name:

```
ssh-keygen -t ed25519 -N 'Sql#2027-mon' -f ssh-keys/srv-win-sql-02.key.new -C itoss-monitoring-v2
```

On the target server, append the new public key:

```
Get-Content .\srv-win-sql-02.key.new.pub | Add-Content -Path 'C:\Users\itoss\.ssh\authorized_keys' -Encoding ascii
```

Validate connectivity with the new key:

```
ssh -i ssh-keys/srv-win-sql-02.key.new itoss@srv-win-sql-02.acme.local whoami
```

Replace the file in ITOSS, keeping the name used by the CT:

```
mv ssh-keys/srv-win-sql-02.key.new ssh-keys/srv-win-sql-02.key
```

If the passphrase changed, update `ssh_password` in the CT at the same time.

Remove the previous key line from `C:\Users\itoss\.ssh\authorized_keys`.

# Troubleshooting

## Messages in the ITOSS Monitor

The message never shows the passphrase.

| Situation | Message in the monitor |
|---|---|
| `ssh_password` was left as `N/A` | `ssh_password: PRIVATE_KEY_PASSPHRASE necesita la passphrase de la clave en ssh_password` |
| Wrong passphrase | `ssh_identityFile: la clave privada no se pudo cargar (la passphrase de ssh_password no es la de la clave)` |
| Different `ITOSS_CRYPTO_KEY` on the manager and the collector | `ssh_password: no se pudo descifrar la passphrase; ITOSS_CRYPTO_KEY tiene que ser la misma en el manager y en el collector` |
| The file is not in `ssh-keys`, or the name is misspelled | `ssh_identityFile: no se pudo leer el archivo; no esta en ITOSS_SSH_KEYS_DIR del manager…` |
| The server does not accept the key | `Auth fail` |

## Verify the Passphrase

On the ITOSS host. This command prints the public key only if the passphrase is correct:

```
ssh-keygen -y -f ssh-keys/srv-win-sql-02.key
```

## Permission denied (publickey)

The most common causes on Windows:

- The account is a member of `Administrators`, so `sshd` reads `C:\ProgramData\ssh\administrators_authorized_keys`.

- `authorized_keys` is UTF-16 or has a BOM.

- `authorized_keys` grants access to other users.

Verify:

```
Get-LocalGroupMember -Group Administrators
icacls C:\Users\itoss\.ssh\authorized_keys
```

## Review the SSH Logs

```
Get-WinEvent -LogName 'OpenSSH/Operational' -MaxEvents 20 | Format-List TimeCreated, Message
```

Client side, from the ITOSS host:

```
ssh -vvv -i ssh-keys/srv-win-sql-02.key itoss@srv-win-sql-02.acme.local
```

# Security Best Practices

- Create a dedicated local account for ITOSS and keep it out of `Administrators`.

- Use a long, random passphrase and do not reuse it for other keys.

- Keep the `ssh-keys` folder readable only by the ITOSS service.

- Restrict the firewall rule to the collector's IP address.

- Rotate keys periodically.

- Disable password authentication for the monitoring account.

# Conclusion

A passphrase adds a second factor to the key file: copying the file is not enough to log in. ITOSS keeps the passphrase encrypted in the CT and opens the key only in memory.
