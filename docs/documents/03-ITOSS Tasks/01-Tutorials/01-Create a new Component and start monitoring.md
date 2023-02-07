---
id: 'create a new component and start monitoring'
title: Create a new Linux Component and start monitoring
---
>#### Requirements: 
>Monitoring of linux systems is done through ssh (22 default port unless changed). SSHD daemon >must be up and running on the target system, and 22 port connection allowed between the >collector and the linux host.

1. Configuration -> Component -> Click on the plus icon.
2. Select "Linux" on the component type dialog.
3. Select "TEST" for the new component's environment.
4. Fill up the *Hostname*, *IP*, *User*, *Timezone* and *Password* fields for the Linux component you want to monitor. In the *Authentication type* field just leave the word "PASSWORD".
5. Click the plus sign and fill the company data. On the *Management profile* field, select "Linux basic", and select "QA-INTERNAL" as the collector that will monitor the component.
6. Click on the save icon.
7. Done!

The list of created components will be displayed with the component you've just created. 
1. Press on the *Run all monitors* icon to check if all monitors of the management profile are able to run and collect data. A new dialog will display the results. Check if there was any error.
2. If everything went fine, change the state of the component to "OPERATIONS" pressing the last icon.

Now you will be able to see your component health on the dashboards.
