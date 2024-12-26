@TestAPI
Feature: Test API
  As an Engineer
  I want to be able to test API endpoints
  So I can validate the response data

  Scenario: Create a user with data using POST request and validate response fields
    Given I send a POST request to "/api/users" with the following data
      | name | John Doe          |
      | job  | Software Engineer |
    Then the response should contain "name" with value "John Doe"
    And the response should contain "job" with value "Software Engineer"

  Scenario: Retrieve a user by ID using GET request and validate response fields
    Given I send a GET request to "/api/users/2"
    Then the response should contain "id" with value "2"
    And the response should contain "first_name" with a non-empty value
    And the response should contain "last_name" with a non-empty value
