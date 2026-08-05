---
title: SAP Monitoring requirements
---



## User Profile ITOUSER in SAP

| **Authorization Object** | **Field** | **Value** | **Description** | **Application that uses it** |
|---|---|---|---|---|
| S_RFC | RFC_TYPE | * | Executes all function modules in SAP. | CHK |
| S_RFC | RFC_NAME | * | Executes all function modules in SAP. | CHK |
| S_TABU_DIS | ACTVT | 03 (display) | Can query all tables in SAP. | CHK |
| S_TABU_DIS | DICBERCLS | * | Can query all tables in SAP. | CHK |
| S_XMI_PROD | EXTCOMPANY | * | Executes the XAL interface (BAPIs). | CHK |
| S_XMI_PROD | EXTPRODUCT | * | Executes the XAL interface (BAPIs). | CHK |
| S_XMI_PROD | INTERFACE | * | Executes the XAL interface (BAPIs). | CHK |
| /SDF/E2E | ACTVT | 03 (display) | Can query SAP diagnostic functions. | CHK |
| S_DX_MAIN | TCD | * | Read files from the application server. | AVA |
| S_DX_MAIN | ACTVT | 03 (display), 36 (extended maintenance) | Read files from the application server. | AVA |
| S_RZL_ADM | ACTVT | 03 (display) | Read SAP system profile parameters. | AVA, SEG |
| S_USER_GRP | CLASS | * | Read users (for security checklist). | SEG |
| S_USER_GRP | ACTVT | 03 (display) | Read users (for security checklist). | SEG |
| S_DATASET | CTVT | 33 | Read files from the application server. | AVA |
| S_DATASET | FILENAME | * | Read files from the application server. | AVA |
| S_DATASET | PROGRAM | SAPLDX_FILE | Read files from the application server. | AVA |


**This must be edited in the user role ITOUSER in the Development environment and transported to Production.**
