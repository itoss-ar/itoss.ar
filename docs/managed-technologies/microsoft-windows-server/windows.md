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
           | Key-based or password authentication
           v
+----------------------+
| Target Windows Server|
| OpenSSH + PowerShell |
+----------------------+
```

### Supported Authentication Methods

| Method | Recommended For |
|--------|-----------------|
| SSH Public Key | Production and unattended automation (preferred) |
| Username and Password | Only when key-based authentication cannot be implemented |

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

Complete the SSH connection fields according to the authentication type.

| Field | Parameter | Password Authentication | SSH Public Key Authentication |
|-------|-----------|-------------------------|-------------------------------|
| target | `ssh_target` | Hostname or IP address (e.g. `8.243.164.21`) | Hostname or IP address (e.g. `8.243.164.21`) |
| user | `ssh_user` | Service account (e.g. `itossuser`) | Service account (e.g. `itossuser`) |
| password | `ssh_password` | Service account password | Private key passphrase, or `N/A` if the key has no passphrase |
| port | `ssh_port` | `22` | `22` |
| authenticationtype | `ssh_authenticationType` | `PASSWORD` | `PRIVATE_KEY` |
| identityfile | `ssh_identityFile` | `N/A` | Path to the private key on the ITOSS Collector (e.g. `~/.ssh/id_ed25519_itoss`) |

For SSH Public Key Authentication, the private key file must exist on the ITOSS Collector at the path set in `ssh_identityFile`, and the matching public key must be installed on the target server:

- For accounts in the Administrators group: `C:\ProgramData\ssh\administrators_authorized_keys`
- For standard accounts: `C:\Users\<user>\.ssh\authorized_keys`

If the private key is protected with a passphrase, set it in `ssh_password`.
