Feature: Update Apartment

  Scenario: Given an apartment exists with the specified id, When the PropertyMgr updates the apartment details (unit number, floor area, bedrooms, status), Then Apartment Updated is recorded with the new values.
    Given an apartment exists with the specified id
    When the PropertyMgr updates the apartment details (unit number, floor area, bedrooms, status)
    Then Apartment Updated is recorded with the new values.