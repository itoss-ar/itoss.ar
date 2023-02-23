---
title: "Password encryption"
---

### Password Encryption

If you want to encrypt the passwords, you can use an endpoint created for this purpose. Opening an SSH session against the ITOSS mgr server, execute the following command:

```shell
curl -X POST -d 'password' -H "Content-Type: application/text" <http://localhost:8080/encrypt>
```

The result will be a string with the encrypted password:
SlKeCjeEDcl+48yliaUn5TfNT8YuWxEa
Then use the encrypted text in any password parameter of application.properties file:
```shell
Example: metrics.password=ENC(SlKeCjeEDcl+48yliaUn5TfNT8YuWxEa)
```
