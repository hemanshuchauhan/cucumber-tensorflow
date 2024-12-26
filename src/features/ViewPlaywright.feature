@ViewPlaywright
Feature: View Playwright
  As a user
  I want to view the Playwright website
  So I can get some inspiration

  Scenario: Navigate to the Playwright website
    Given I am on the Playwright website
    When I go to GET STARTED
    Then I should see the Getting Started page