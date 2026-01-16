Feature: Update Property

  Scenario: Given a property exists with the specified id, When the PropertyMgr updates the property details (name, address, manager info, units count), Then Property Updated is recorded with the new values.
    Given a property exists with the specified id
    When the PropertyMgr updates the property details (name, address, manager info, units count)
    Then Property Updated is recorded with the new values.