---
title: "PostgreSQL Database"
---
In order to create Database metrics you must follow theese standards for jdbc url connection strings. In any case, follow the database vendor documentations.

### JDBC URL Format database
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

Note:

This document provides a general overview of common options. Refer to the official documentation of your chosen database vendor for the most accurate and up-to-date connection details and encryption options.
Additional vendor-specific properties and encryption configurations might be available.