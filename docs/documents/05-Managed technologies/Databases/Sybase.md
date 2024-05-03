---
title: "Sybase Database"
---
In order to create Database metrics you must follow these standards for JDBC URL connection strings. In any case, follow the database vendor documentations.

### JDBC URL Format for Sybase
URL: jdbc:sybase:Tds:{hostname}:{port}/{database}?{properties}

Properties:
   - `{hostname}`: Database server hostname or IP address.
   - `{port}`: Database server port number (default 5000).
   - `{database}`: Database name.
   - `{properties}`: Additional connection properties (optional).

Encryption Options:
   - `ssl={true|false}`: Enables or disables SSL encryption.
   - `ssl.trustStore={path_to_truststore}`: Specifies the path to the truststore file for SSL encryption.
   - `ssl.trustStorePassword={truststore_password}`: Specifies the password for the truststore file.
   - `ssl.verifyServerCertificate={true|false}`: Specifies whether to verify the server certificate for SSL encryption.

Note:

This document provides a general overview of common options. Refer to the official documentation of Sybase for the most accurate and up-to-date connection details and encryption options.
Additional vendor-specific properties and encryption configurations might be available.