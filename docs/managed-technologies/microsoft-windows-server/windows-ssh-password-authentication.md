---
title: SSH Password Authentication for ITOSS (Windows)
sidebar_label: SSH - Password
sidebar_position: 1
---

# SSH Password Authentication for ITOSS (Windows)

## Overview

This document describes how to configure an SSH CT that authenticates against a Windows server running OpenSSH Server with a user and a password (`ssh_authenticationType` = `PASSWORD`).

This is the default authentication type and the way SSH CTs worked before ITOSS 8.8.0. Existing SSH CTs already use it and need no changes.

Use this type when the server accepts password logins and no key or certificate is available. For unattended monitoring, key-based authentication is recommended:

- [SSH Private Key Authentication](windows-ssh-private-key-authentication.md)
- [SSH Private Key with Passphrase Authentication](windows-ssh-private-key-passphrase-authentication.md)
- [SSH Certificate Authentication](windows-ssh-certificate-authentication.md)

The example uses the fictional company Acme and its legacy server `srv-win-legacy-04.acme.local`, with a local account.

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
|     Target Windows Server     |
|  OpenSSH Server (sshd)        |
+-------------------------------+
```

# Prerequisites

- Windows Server 2019 or later (or Windows 10 1809 or later).

- Local administrator access to the target server.

- Network connectivity between the ITOSS collector and the monitored system (TCP 22 by default).

- The same `ITOSS_CRYPTO_KEY` on the ITOSS manager and collector.

All commands on the Windows server run in PowerShell as Administrator.

# Step 1 - Install and Start OpenSSH Server

Check whether it is installed:

```
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Server*'
```

Install it if `State` is `NotPresent`:

```
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Start the service and enable it at boot:

```
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

Verify the firewall rule:

```
Get-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' | Select-Object Name, Enabled
```

If the rule does not exist, create it:

```
New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

# Step 2 - Create a Dedicated Monitoring User

```
$password = Read-Host -AsSecureString 'Password for itoss'
New-LocalUser -Name itoss -Password $password -PasswordNeverExpires -Description 'ITOSS monitoring'
Add-LocalGroupMember -Group Users -Member itoss
```

Verify the account:

```
Get-LocalUser -Name itoss
```

Add the account only to the local groups that the monitoring commands require (for example `Performance Monitor Users`). Avoid `Administrators`.

# Step 3 - Allow Password Authentication

Password authentication is enabled by default. Verify that `C:\ProgramData\ssh\sshd_config` does not disable it:

```
Select-String -Path "$env:ProgramData\ssh\sshd_config" -Pattern 'PasswordAuthentication'
```

If a line `PasswordAuthentication no` is active, comment it out, then validate and restart:

```
& "$env:WINDIR\System32\OpenSSH\sshd.exe" -t
Restart-Service sshd
```

# Step 4 - Validate the SSH Connection

From the ITOSS host:

```
ssh itoss@srv-win-legacy-04.acme.local whoami
```

The command prompts for the password and must return:

```
srv-win-legacy-04\itoss
```

# Step 5 - Configure the CT in ITOSS

```
ssh_target             : srv-win-legacy-04.acme.local
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
$password = Read-Host -AsSecureString 'New password for itoss'
Set-LocalUser -Name itoss -Password $password
```

Update `ssh_password` in the CT.

Validate that the CT returns to normal status.

# Troubleshooting

## Messages in the ITOSS Monitor

| Situation | Message in the monitor |
|---|---|
| Wrong password, or the server does not accept passwords | `Auth fail` |
| Different `ITOSS_CRYPTO_KEY` on the manager and the collector | The collector cannot decrypt the password and authentication fails |

## Verify the Account

```
Get-LocalUser -Name itoss | Select-Object Name, Enabled, PasswordExpires
Get-LocalGroupMember -Group Users
```

The account must be enabled and must be a member of `Users`.

## SSH Service Not Running

```
Get-Service sshd
Start-Service sshd
```

## Review the SSH Logs

```
Get-WinEvent -LogName 'OpenSSH/Operational' -MaxEvents 20 | Format-List TimeCreated, Message
```

Client side, from the ITOSS host:

```
ssh -vvv itoss@srv-win-legacy-04.acme.local
```

# Compatibility with Existing Installations

- Existing SSH CTs use `PASSWORD` and keep working unchanged after upgrading to 8.8.0.

- If a CT has an old, manually entered value in `ssh_authenticationType`, or the field is empty, it is treated as `PASSWORD`, as before 8.8.0.

# Security Best Practices

- Create a dedicated local account for ITOSS.

- Use a long, random password and rotate it periodically.

- Do not add the account to `Administrators`.

- Restrict the firewall rule to the collector's IP address:

```
Set-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -RemoteAddress 10.10.10.20
```

- Review the `OpenSSH/Operational` event log.

- Move to key or certificate authentication when feasible.

# Conclusion

Password authentication keeps existing SSH CTs working unchanged. For new installations and unattended monitoring, key-based or certificate-based authentication is the recommended method.
