---
title: SAP Monitoring requirements
---


## Requirements for User Profile ITOUSER in SAP

| **Authorization Object** | **Field** | **Value** | **Description** | **Application that uses it** |
|---|---|---|---|---|
| S_RFC | RFC_TYPE | * | Executes all function modules in SAP. | All |
| CHK | RFC_NAME | * | ACTVT | * |
| S_TABU_DIS | ACTVT | 03 (display) | Can query all tables in SAP. | All |
| CHK | DICBERCLS | * | | |
| S_XMI_PROD | EXTCOMPANY | * | Executes the XAL interface (BAPIs). | All |
| CHK | EXTPRODUCT | * | | |
| INTERFACE | * | /SDF/E2E | Can query SAP diagnostic functions. | All |
| CHK | S_DX_MAIN | TCD | * | |
| AVA | ACTVT | 03 (display), 36 (extended maintenance) | Read files from the application server. | All |
| S_RZL_ADM | ACTVT | 03 (display) | Read SAP system profile parameters. | AVA, SEG |
| S_USER_GRP | CLASS | * | Read users (for security checklist). | SEG |
| ACTVT | 03 (display) | | | |
| S_DATASET | CTVT | 33 | Read files from the application server. | AVA |
| FILENAME | * | | | |
| PROGRAM | SAPLDX_FILE | | | |

**Notes:**

* The `*` wildcard means that all values are allowed for that field.
* The `ACTVT` field indicates the authorization activity that the user has for the object. The possible values are:
    * 03 (display): The user can view the object.
    * 36 (extended maintenance): The user can modify the object.
* The `CHK` field indicates whether the authorization is checked. A value of `*` means that the authorization is always checked.

**This must be edited in the user role ITOUSER in the Development environment and transported to Production.**

