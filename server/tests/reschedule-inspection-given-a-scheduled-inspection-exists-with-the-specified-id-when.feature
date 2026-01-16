Feature: Reschedule Inspection

  Scenario: Given a scheduled inspection exists with the specified id, When the PropertyMgr reschedules the inspection with a new date, time and optionally a different inspector, Then Inspection Rescheduled is recorded with the updated schedule.
    Given a scheduled inspection exists with the specified id
    When the PropertyMgr reschedules the inspection with a new date, time and optionally a different inspector
    Then Inspection Rescheduled is recorded with the updated schedule