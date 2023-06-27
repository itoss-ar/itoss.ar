---
title: "Condition and action fields and methods"
---

Every monitor has rules that are evaluated against the metric payload data. If a rule condition is evaluated as true, i.e., matches the condition, then the action of that rule gets executed.
For every rule condition and rule action there are a couple of fileds and methods available to get data or execute some actions.

These are fields and methos that can be accessed within the context of monitor actions and conditions:

### `lastMetric`

Contains the mapped field values of the last metric read, to be used for comparison purposes.

- `.tags` (Map): *See description and use case below.*
- `.fields`(Map): *See description and use case below.*
- `.time` (Text): UTC timestamp of the last metric read.
- `.ruleApplied` (Text): Name of the rule applied on last metric collection.

### `metric`

It has the attributes of the metric being read:

- `.tags` (Map): It is a map to access the tags defined within the metric.

```java
if (metric.tags.dirName == 'C:\temp') {
    // ignoring
}
```

- `.fields` (Map): It is a map to access the fields defined within the metric.

```java
if (metric.fields.fsutil > 95) {
    action.createDashEntry('RED');
}
```

- `.metricName` (Text): Name of the metric being read.
- `.phase` (Text): Processing phase, wheather it is *Detail* or *Aggregate*.
- `.metricId` (Number): Internal ID of the metric.
- `.ctId` (Number): Internal ID of the monitored component.
- `.monitorId` (Number): Internal monitor ID.
- `.rawResult` (Text): Raw result of the metric just being read.
- `.time` (Text): UTC timestamp of the metric data collection.

### ct

- `.getAttribute('attribute name')`: This is a method to access any of the ct attributes.

Use:

```java
action.log(ct.ctName + ' is down - Notify to: ' + ct.getAttribute('NotifyTo'))
```

These are the ct fields to be used within the condition or action context:

- `.ctName` (Text): Name of the component.
- `.ctType` (Text): Component type.
- `.environment` (Text): Component environment (PRODUCTION, DEVELOPMENT, QA, PILOT, TEST).
- `.workgroup` (Text): Support workgroup of the CT.
- `.supportUser` (Text): Support user name.
- `.company` (Text): Owner company of the component.
- `.companyId` : Internal company ID.
- `.ctAttributes` (List): Attribute list of the CT.
- `.companyAttributes` (List): Company attributes.
- `.typeAttributes` (List): Type attributes.
- `.profileName` (Text): Name of the management profile assigned to the CT.
- `.profileId` (Number): Internal profile ID.
- `.ctInstrumParamValues` (List): CT instrumentation parameter values.

### action

These are the list of actions methods for use in monitor configuration:

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
|`action.suppressTime(time threshold, send first, continuous, timeToLive)`| Returns true or false depending on a suppress condition based on time.| True/False | <ul><li>time threshold: string with the suppress duration (possible values are: "1d2h30m0s", in any combination)</li><li>Send first: boolean value indicating if the return value will be true for the first match and then suppress.</li><li>Continuous: boolean value indicating if the return value will be true after the suppression time if the condition keeps the same.</li><li>Time to live: duration of the suppression, after this duration, counters and timers will be reseted.</li></ul>|`action.supressTime("1h",false,false,"2h");`|
|`action.suppressCount(count threshold, send first, continuous, timeToLive)`| Returns true or false depending on the suppress condition based on matches.| True/False |<ul><li>count threshold: integer with the suppress number of matches.</li><li>Send first: boolean value indicating if the return value will be true for the first match and then suppress.</li><li>Continuous: boolean value indicating if the return value will be true after the suppression time if the condition keeps the same.</li><li>Time to live: duration of the suppression, after this duration, counters and timers will be reseted.</li></ul>|`action.supressCount(3,false,false,"2h");`|
|`action.suppressTimeCount(time threshold, count threshold, send first, continuous, timeToLive)`| Returns true or false depending on the suppress condition based on matches and time (whatever happends first).| True/False | <ul><li>time threshold: string with the suppress duration (possible values are: "1d2h30m0s", in any combination)</li><li>count threshold: integer with the suppress number of matches.</li><li>Send first: boolean value indicating if the return value will be true for the first match and then suppress.</li><li>Continuous: boolean value indicating if the return value will be true after the suppression time if the condition keeps the same.</li><li>Time to live: duration of the suppression, after this duration, counters and timers will be reseted.</li></ul>|`action.supressCount(3,false,false,"2h");`|



Within action there is a couple of field + method to be accessed as well:

- `.ruleEvaluated.getDescription()` (Text): Name of the rule being evaluated.
  
### `.monitor`

Monitor configuration data. Has the following sub fields:

- `.monitorName` (Text): Name of the monitor.
- `.metricName` (Text): Name of the metric.
- `.profileName` (Text): Name of the management profile.
