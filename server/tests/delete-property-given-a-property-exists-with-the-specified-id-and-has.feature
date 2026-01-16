Feature: Delete Property

  Scenario: Given a property exists with the specified id and has no apartments, When the PropertyMgr deletes the property, Then Property Deleted is recorded and the property is removed from the system.
    Given a property exists with the specified id and has no apartments
    When the PropertyMgr deletes the property
    Then Property Deleted is recorded and the property is removed from the system.