---
title: "HANA Database"
---

In order to create Database metrics you must follow these standards for JDBC URL connection strings. In any case, follow the database vendor documentations.

### JDBC URL Format for HANA

URL: jdbc:sap://{hostname}:{port}/?databaseName={database}&{properties}

Properties:
   - `{hostname}`: Database server hostname or IP address.
   - `{port}`: Database server port number (default 3NN15 for non-SSL, 3NN14 for SSL).
   - `{database}`: Database name.
   - `{properties}`: Additional connection properties (optional).

Encryption Options:
   - `encrypt=true`: Enables encryption.
   - `validateCertificate=true`: Validates server's certificate.

Note:

This document provides a general overview of common options. Refer to the official documentation of SAP HANA for the most accurate and up-to-date connection details and encryption options.
Additional vendor-specific properties and encryption configurations might be available.