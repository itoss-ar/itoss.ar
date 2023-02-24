---
title: "Rule and condition actions"
---

These are the list of actions for use in monitor configuration:

| Action | Description | Return value  | Parameters | Use |
| :--- | :--- | :--- | :--- | :--- |
|`action.save()`| Saves the metric collected in timeseries | None | | |
|`action.saveOnChange()`| Saves the metric collected in timeseries only if metric value has changed| None | | |
|`action.isDownStatus()`| Returns "true" if the status of the component is down, and "false" otherwise | True/False | | `if (action.isDownStatus()) { ... }`|
|`action.setStatusDown()`| Set the component status as being "down" | None | | |
|`action.setStatusUp()`| Set the component status as being "up" | None | | |
|`action.deleteDashEntry()`| Delete any active dashboard entry for the CT and monitor | None | | |
|`action.createDashEntry('severity')`| Creates a dashboard entry for the CT and monitor with the specified severity | None | A text for the severity. |`action.createDashEntry('RED')`|
|`action.onChange()`| Returns "true" if the monitored metric has changed its value from previous measure | True/False | | |
|`action.sendMail({'receiver',...},'message', toolId)`| Sends a mail to the selected receivers. If tool ID was set, the mail will have the tool output attached. | None |<ul><li>Receivers: the reciever of the message (possible values are MANAGER,SUPPORTUSER,WORKGROUP and CONTACT)</li><li>Text: message string.</li><li>(Optional) Tool ID: ID of the tool to be executed.</li></ul> |`action.sendMail({'MANAGER','SUPPORTUSER','WORKGROUP'},'Ct is down.');`|
|`action.isLastRecord()`| Returns "true" if the record being analysed is the last one, "false" otherwise. | True/False | |`if (action.isLastRecord()) {...}`|
|`action.isMetricEmpty()`| Returns "true" if the read metric is empty, "false" otherwise. | True/False | | `if (action.isMetricEmpty()) {...}` |
|`action.getTotalRecords()`  | Returns the total number of records read. | Number of records | | |
|`action.addField('field_name','value')`| Create a field within the payload mapped. | None | |`action.addField('cpus',2);`|
|`action.isMetricFault()`| Returns "true" if the metric could not be read. Applies only to non-status metrics. | True/False | |`if (action.isMetricFault()) {...}`|
|`action.isFault()`| Returns "true" if the metric could not be read. Applies to all metrics. | True/False | |`if (action.isFault()) {...}`|
|`action.isSecondaryFault()`| Returns "true" if the metric could not be read because the component status is down. | True/False | |`if (action.isSecondaryFault()) {...}`|
|`action.log('message')`| Returns "true" if the metric could not be read because the component status is down. | True/False |(Optional) Message|`action.log('CRITICAL:'+ct.ctName +':'+ action.monitor.monitorName +':'+action.monitor.metricName +':ABAP instance down:'+ct.environment);`|
|`action.secsBetweenNowAnd('date_time_field', 'date format')`| Returns seconds between now and date_time_field being passed. | None |<ul><li>Date string</li><li>Format</li></ul> |`if (action.secsBetweenNowAnd(typejob.fields.STRTDATE + typejob.fields.STRTTIME, 'yyyyMMddHHmmss')> 86400){countJobsRuntime1d++;}`|
|`action.notifyTo('ct list attribute with receivers', 'message',toolId)`| Sends a mail to the selected receivers. If tool ID was set, the mail will have the tool output attached. | None |<ul><li>Date string</li><li>Format</li><li>(Optional) Tool ID: ID of the tool to be executed.</li></ul> |`action.notifyTo(ct.getAttribute('NotifyTo'),'ITOSS notification - '+ct.ctName +' - '+ct.ctType +' - '+ action.monitor.monitorName +' - '+ action.ruleEvaluated.getDescription());`|
|`action.sendNotification({'receiver',...},'message')`| Sends a notification to the dashboard of the user whose tennant is same as CT, or to selected receivers, if receivers were sent. | None | <ul><li>Receivers: the reciever of the message (possible values are MANAGER,SUPPORTUSER,WORKGROUP and CONTACT)</li><li>Text: message string.</li></ul>|`action.sendNotification({'MANAGER','SUPPORTUSER','WORKGROUP'},'Ct is down.');`|
