@ValidateAccessibility @a11y
Feature: Validate Accessibility
  As a user,
  I want the application to be accessible,
  So that all users, including those with disabilities, can use it effectively.

  #a11y - Accessibility
  #a11y reports are generated in /artifacts/acceessibilityReport.html

  Scenario: Validate a11y for a site
    Given I go to the following "https://www.a11yproject.com/"
    When I run the a11y check
    Then I should not see violations

  @wip
  Scenario: Validate A11y on a specific element

  @wip
  Scenario: Validate A11y on a specific element with a specific rule

  @wip
  Scenario: Validate contrast ratios
