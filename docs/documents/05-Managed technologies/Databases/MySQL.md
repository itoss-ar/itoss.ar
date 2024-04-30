---
title: "MySQL Database"
---
In order to create Database metrics you must follow theese standards for jdbc url connection strings. In any case, follow the database vendor documentations.

### JDBC URL Format database
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

Note:

This document provides a general overview of common options. Refer to the official documentation of your chosen database vendor for the most accurate and up-to-date connection details and encryption options.
Additional vendor-specific properties and encryption configurations might be available.