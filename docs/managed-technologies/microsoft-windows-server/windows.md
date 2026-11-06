# Microsoft Windows Server

## Overview

ITOSS manages Microsoft Windows systems through the **SSH** instrumentation using **OpenSSH Server**, which allows interoperability between different operating systems and is more efficient than WSMan (WinRM). No agent needs to be installed on the target server: the ITOSS Collector connects remotely, executes PowerShell commands, and processes the results.

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
| Target Windows Server|
| OpenSSH + PowerShell |
+----------------------+
```

### Supported Authentication Methods

| Method | Recommended For | Guide |
|--------|-----------------|-------|
| SSH Private Key | Production and unattended automation (preferred) | [SSH Private Key Authentication](./windows-ssh-private-key-authentication.md) |
| SSH Private Key with Passphrase | When policy requires private keys to be protected by a passphrase | [SSH Private Key with Passphrase Authentication](./windows-ssh-private-key-passphrase-authentication.md) |
| SSH Certificate | When policy requires SSH logins to use a certificate signed by a trusted CA | [SSH Certificate Authentication](./windows-ssh-certificate-authentication.md) |
| Username and Password | Only when no key or certificate is available | [SSH Password Authentication](./windows-ssh-password-authentication.md) |

---

# Setup

## Requirements

- Windows Server with OpenSSH Server installed and the `sshd` service running.
- Administrative access to the target server (required only during setup).
- Network connectivity from the ITOSS Collector to the target server on the SSH port (default `22`).
- A dedicated service account for ITOSS (for example `itoss`). Never use `Administrator`, domain administrator, or personal accounts.
- PowerShell configured as the default OpenSSH shell.
- ITOSS credential repository available.

## Configuration

Run the following commands from a PowerShell terminal as an administrator user. See [Managed Windows Server Tasks](./managed-windows-server-tasks.md) for details.

Enable remote access for the administrators group:

```powershell
New-ItemProperty -Name LocalAccountTokenFilterPolicy -Path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System -PropertyType DWord -Value 1
```

Install OpenSSH Server:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Start the `sshd` service and set it to start automatically:

```powershell
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'
```

Set PowerShell as the default shell:

```powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String
```

Verify the SSH service status:

```powershell
Get-Service sshd
```

Verify that the firewall allows inbound SSH:

```powershell
Get-NetFirewallRule -Name *OpenSSH-Server* | Select-Object Name, Enabled
```

---

# Registering a Windows Server in ITOSS

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
| identityfile | `ssh_identityFile` | `N/A` | Private key file name (e.g. `srv-win-app-01.key`) | Private key file name (e.g. `srv-win-sql-02.key`) | Private key file name (e.g. `srv-win-erp-02.key`) |

For the key and certificate types, place the private key in the `ssh-keys` folder of the ITOSS installation. `ssh_identityFile` holds only the file name, without the folder.

- **Private Key and Private Key with Passphrase**: install the matching public key in `C:\Users\<user>\.ssh\authorized_keys` on the target server. Do not add the service account to the `Administrators` group: for its members, `sshd` ignores that file and reads `C:\ProgramData\ssh\administrators_authorized_keys` instead.
- **Certificate**: place the certificate next to the private key (e.g. `srv-win-erp-02.key-cert.pub`). It has no field of its own. The target server must trust the signing CA through `TrustedUserCAKeys`.

See the guide for each method under [Supported Authentication Methods](#supported-authentication-methods) for the full procedure.
