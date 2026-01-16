Feature: Cancel Work Order

  Scenario: Given a work order exists with the specified id and has not been completed, When the ConstrDept cancels the work order with a reason, Then Work Order Cancelled is recorded and the work order is removed from the schedule.
    Given a work order exists with the specified id and has not been completed
    When the ConstrDept cancels the work order with a reason
    Then Work Order Cancelled is recorded and the work order is removed from the schedule.