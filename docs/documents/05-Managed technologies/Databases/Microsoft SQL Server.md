---
title: "Microsoft SQL Server Database"
---
In order to create Database metrics you must follow theese standards for jdbc url connection strings. In any case, follow the database vendor documentations.

### JDBC URL Format database
URL: jdbc:sqlserver://{hostname}:{port};databaseName={database}?{properties}

Properties:
  - `{hostname}`: Database server hostname or IP address.
  - `{port}`: Database server port number (default 1433).
  - `{database}`: Database name.
  - `{properties}`: Additional connection properties (optional).

Encryption Options:
  - `encrypt=true`: Enables encryption for communication.
  - `trustServerCertificate=true`: Trusts the server certificate without verification (not recommended).
