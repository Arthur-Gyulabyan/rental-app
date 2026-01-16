Feature: Cancel Inspection

  Scenario: Given a scheduled inspection exists with the specified id, When the PropertyMgr cancels the inspection with a reason, Then Inspection Cancelled is recorded and the inspection is removed from the schedule.
    Given a scheduled inspection exists with the specified id
    When the PropertyMgr cancels the inspection with a reason
    Then Inspection Cancelled is recorded and the inspection is removed from the schedule.