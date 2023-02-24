---
title: "LDAP Configuration"
---

Authentication of each user in the tool can be done in one of two ways: Internal or LDAP. In the case where the user is configured with internal authentication, the validation of the user's credentials is done by ITOSS. However, if authentication is done through LDAP, the password will be the one configured in LDAP. It is not possible to have both configurations for the same user at the same time.

### LDAP Integration Parameters

1. For integration with the LDAP service, first, it is necessary to configure a the LDAP servers. In the ITOSS Manager, **go to Security -> LDAP Servers, and click the <span class="material-symbols-outlined">
add_box
</span> icon**.

![ldap-1](/img/ldap-1.png)
2. Fill up the LDAP fields:
![ldap-2](/img/ldap-2.png)

### Enabling Users for LDAP Authentication

To authenticate a user with the LDAP server, it is necessary to access the user manager and select Authenticator: LDAP. This way the authentication of the user will be delegated to the LDAP authenticator.
However, if INTERNAL is selected, the tool ITOSS will authenticate and validate the password.

3. ** Go to Security / Users, edit the user and select "LDAP" in the Authenticator field:

![ldap-3](/img/ldap-3.png)
