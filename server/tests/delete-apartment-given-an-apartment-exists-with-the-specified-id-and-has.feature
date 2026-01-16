Feature: Delete Apartment

  Scenario: Given an apartment exists with the specified id and has no active leases, When the PropertyMgr deletes the apartment, Then Apartment Deleted is recorded and the apartment is removed from the system.
    Given an apartment exists with the specified id and has no active leases
    When the PropertyMgr deletes the apartment
    Then Apartment Deleted is recorded and the apartment is removed from the system.