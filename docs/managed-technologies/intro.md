# Technology Management 

## Introduction

The purpose of this document is to describe the requirements, security considerations, account configuration, and system preparation tasks required to enable technology management through ITOSS.

ITOSS provides a technology-independent management framework capable of monitoring, operating, and automating IT services through a set of standardized interfaces.

Each managed technology must be configured to allow secure communication between the target system and the ITOSS platform.

# Technology Management Architecture

ITOSS implements the following native management interfaces:
```text
ICMP
TCP
SAP RFC
JDBC
SSH
EXEC
REST API
```

These interfaces allow ITOSS to interact with operating systems, databases, enterprise applications, cloud services, middleware platforms, and infrastructure components.

# Technology Onboarding Process

The onboarding process for any technology follows four major stages:

```text
1. Connectivity Validation
2. Authentication Configuration
3. Account Provisioning
4. Technology Registration
```

# Authentication Models

Depending on the technology being managed, ITOSS supports different authentication methods.

## Username and Password

Used by:

```text
SSH
JDBC
SAP RFC
REST API
```

Credential Type:

```text
Username
Password
```

Passwords are stored encrypted within the ITOSS credential repository.

## SSH Public Key Authentication

Recommended for:

```text
Linux
Windows OpenSSH
Unix Systems
```

Credential Type:

```text
Username
Private Key
Optional Passphrase
```

Benefits:

```text
No password transmission
Simplified credential rotation
Improved security
Better support for unattended automation
```
## Token-Based Authentication

Used by:

```text
REST APIs
Cloud Services
Kubernetes
```

Credential Types:

```text
Bearer Tokens
API Keys
OAuth Tokens
```

## Certificate-Based Authentication

Used by:

```text
REST APIs
mTLS Integrations
Enterprise Platforms
```

Credential Types:

```text
Client Certificate
Private Key
Trust Store
```
# Service Account Requirements

ITOSS should never use personal user accounts.

For each managed technology a dedicated service account should be created.

Recommended naming convention:

```text
itoss-mon
itoss-svc
itoss-monitor
```

Service accounts should:

- Be dedicated to ITOSS.
- Be auditable.
- Follow least privilege principles.
- Be protected by credential policies.
- Be excluded from interactive use whenever possible.

# Security Recommendations

The following security controls are recommended for all managed technologies.

## Dedicated Service Accounts

Avoid:

```text
root
Administrator
Domain Administrator
Personal Accounts
```

Prefer:

```text
itoss-mon
```

---

## Restricted Network Access

Allow management access only from authorized ITOSS servers.

Examples:

```text
SSH
Database Listener
REST API Endpoint
SAP Gateway
```

should only be reachable from approved source IP addresses.

---

## Credential Protection

Credentials stored in ITOSS should:

```text
Remain encrypted at rest
Be decrypted only during authentication
Never be logged
Never be embedded in scripts
```

---

## Audit Logging

Whenever possible:

```text
Authentication Events
Connection Events
Administrative Actions
```

should be logged by the managed system.

---

## Principle of Least Privilege

Grant only the permissions required for monitoring and operational activities.

Administrative privileges should only be granted when technically required.


# Supported Technologies

The following technologies are currently supported by ITOSS.

## Microsoft Windows

Management Interface:

```text
SSH (OpenSSH)
```

Requirements:

```text
OpenSSH Server
Dedicated Service Account
PowerShell
```

---

## Linux

Management Interface:

```text
SSH
```

Capabilities:

```text
Availability Monitoring
Process Monitoring
Filesystem Monitoring
Service Monitoring
Remote Command Execution
Operational Automation
```

Requirements:

```text
OpenSSH Server
Dedicated Service Account
Shell Access
```

---

## PostgreSQL

Management Interface:

```text
JDBC
```

Capabilities:

```text
Database Availability
Performance Monitoring
Session Monitoring
Operational Queries
```

Requirements:

```text
Database Account
Network Connectivity
JDBC Access
```

---

## Oracle Database

Management Interface:

```text
JDBC
```

Capabilities:

```text
Availability Monitoring
Tablespace Monitoring
Session Monitoring
Performance Monitoring
SQL Execution
```

Requirements:

```text
Database Account
Listener Connectivity
JDBC Access
```

---

## SAP HANA

Management Interface:

```text
JDBC
SSH (Optional)
```

Capabilities:

```text
Database Monitoring
Performance Monitoring
System Administration
Operational Automation
```

Requirements:

```text
Database Account
Network Connectivity
SQL Access
```

---

## Microsoft SQL Server

Management Interface:

```text
JDBC
```

Capabilities:

```text
Database Monitoring
Performance Monitoring
Session Monitoring
Administrative Queries
```

Requirements:

```text
Database Account
Network Connectivity
JDBC Access
```

---

## Kubernetes

Management Interfaces:

```text
REST API
EXEC
```

Capabilities:

```text
Cluster Monitoring
Node Monitoring
Pod Monitoring
Namespace Monitoring
Resource Monitoring
Operational Automation
```

Requirements:

```text
API Access
Service Account
Bearer Token or Certificate
kubectl (optional)
```

---

# EXEC Interface

## Purpose

The EXEC interface provides a generic extensibility mechanism that allows ITOSS to integrate technologies not natively supported by the platform.

Examples:

```text
SNMP Utilities
Cloud SDKs
Vendor CLI Tools
Custom Scripts
Third-Party Applications
```

---

## EXEC Script Standards

Scripts executed through the EXEC interface must:

```text
Run without user interaction
Use deterministic output
Return proper exit codes
Protect credentials
Handle timeouts
Handle communication errors
```