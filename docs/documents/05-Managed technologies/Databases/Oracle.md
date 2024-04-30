---
title: "Oracle Database"
---
In order to create Database metrics you must follow theese standards for jdbc url connection strings. In any case, follow the database vendor documentations.

### JDBC URL Format database
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