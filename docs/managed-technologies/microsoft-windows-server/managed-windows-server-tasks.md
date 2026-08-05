---
title: Managed Windows Server Tasks
---

Remote management of Microsoft Windows (and its entire related ecosystem) can be implemented using either of these two transport protocols:

### WSMan (WINRM)
This option is supported for communication between Windows systems.

### OpenSSH
This option is implemented in ITOSS, allowing interoperability between different operating systems and being more efficient.

### Microsoft Windows Management in ITOSS
The operational management of Microsoft Windows in ITOSS is implemented using the OpenSSH protocol. To enable these features in Windows management objects, follow these steps (from PowerShell terminal as an administrator user):
1. Enable remote access for the administrators group
```shell
New-itemproperty -name LocalAccountTokenFilterPolicy -path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System -propertyType DWord -value 1
```
2. Install OpenSSh server
```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```
3. Start the sshd service
```powershell
Start-Service sshd
```
### OPTIONAL but recommended:
```powershell
Set-Service -Name sshd -StartupType 'Automatic'
```
### More info
https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=powershell
### Command to set the default shell to be powershell.exe:
```powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String
```
### More info
https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_server_configuration
