---
title: "Rule and condition actions"
---

These are the list of actions for use in monitor configuration:

| Action | Description | Return value  | Parameters | Example |
| :--- | :--- | :--- | :--- | :--- |
| `action.save()` | Saves the metric collected in timeseries | None | | |
| `action.saveOnChange()` | Saves the metric collected in timeseries only if metric value has changed| None | | |
| `action.isDownStatus()` | Returns "true" if the status of the component is down, and "false" otherwise | True/False | | |
| `action.setStatusDown()` | Set the component status as being "down" | None | | |
| `action.setStatusUp()` | Set the component status as being "up" | None | | |
| `action.deleteDashEntry()` | Delete any active dashboard entry for the CT and monitor | None | | |
| `action.createDashEntry('severity')` | Creates a dashboard entry for the CT and monitor with the specified severity | None | A text for the severity. | `action.createDashEntry('RED');` |
| `action.onChange()` | Returns "true" if the monitored metric has changed its value from previous measure | True/False | | |
| `action.sendMail({'receiver1','receiver2',...},'message');`  | Sends a mail to the selected receivers. | None |<ul><li>Receivers: the reciever of the message (possible values are MANAGER,SUPPORTUSER,WORKGROUP and CONTACT)</li><li>Text: message string.</li></ul> | `action.sendMail({'MANAGER','SUPPORTUSER','WORKGROUP'},'Ct is down.');` |

