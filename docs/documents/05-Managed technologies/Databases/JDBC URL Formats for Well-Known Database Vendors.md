---
title: "JDBC URL Formats common database vendors"
---
In order to create Database metrics you must follow theese standards for jdbc url connection strings. In any case, follow the database vendor documentations.

Below are common JDBC URL formats for connecting to databases:

### MySQL


URL: jdbc:mysql://{hostname}:{port}/{database}?{properties}

Properties:
  - `{hostname}`: Database server hostname or IP address.
  - `{port}`: Database server port number (default 3306).
  - `{database}`: Database name.
  - `{properties}`: Additional connection properties (optional).

Encryption Options:
  - `useSSL=true`: Enables SSL encryption for communication.
  - `requireSSL=true`: Enforces SSL encryption for communication (server-side configuration required).
  - `serverTimezone={timezone}`: Sets the server timezone (e.g., `serverTimezone=UTC`).

### PostgreSQL


URL: jdbc:postgresql://{hostname}:{port}/{database}?{properties}

Properties:
  - `{hostname}`: Database server hostname or IP address.
  - `{port}`: Database server port number (default 5432).
  - `{database}`: Database name.
  - `{properties}`: Additional connection properties (optional).

Encryption Options:
  - `sslmode={mode}`: Specifies SSL encryption mode:
    - `disable`: Disables SSL (not recommended).
    - `require`: Enforces SSL encryption.
    - `verify-ca`: Verifies server certificate against a trusted CA.
    - `verify-full`: Verifies server certificate and hostname.


### Microsoft SQL Server
Vendor: Microsoft SQL Server

URL: jdbc:sqlserver://{hostname}:{port};databaseName={database}?{properties}

Properties:
  - `{hostname}`: Database server hostname or IP address.
  - `{port}`: Database server port number (default 1433).
  - `{database}`: Database name.
  - `{properties}`: Additional connection properties (optional).

Encryption Options:
  - `encrypt=true`: Enables encryption for communication.
  - `trustServerCertificate=true`: Trusts the server certificate without verification (not recommended).

### Oracle Database


URL: jdbc:oracle:thin:@//{hostname}:{port}/{database}?{properties}

Properties:
  - `{hostname}`: Database server hostname or IP address.
  - `{port}`: Database server port number (default 1521).
  - `{database}`: Database service name (SID or service name).
  - `{properties}`: Additional connection properties (optional).

Encryption Options:
  - `ssl=true`: Enables SSL encryption for communication.
  - `trustServerCertificate=true`: Trusts the server certificate without verification (not recommended).
Note:

This document provides a general overview of common options. Refer to the official documentation of your chosen database vendor for the most accurate and up-to-date connection details and encryption options.
Additional vendor-specific properties and encryption configurations might be available.