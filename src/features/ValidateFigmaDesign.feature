@validateFigmaDesign
Feature: Validate Figma Design
    As a UI engineer
    I want to ensure that the web page matches the Figma design
    So that I can maintain design consistency across all environments

    Scenario: Compare web page appearance with Figma design
        Given the Figma design for "search" is available
        When I load the "https://qa.in-house.com/houses" in the browser
        Then the visual appearance should match the Figma design with a tolerance of 5%

    Scenario: Compare mobile web page appearance with Figma design
        Given the Figma design for "searchMobile" is available
        When I load the "https://qa.in-house.com/houses" in the mobile browser with a viewport size of 375x812
        Then the visual appearance should match the Figma design with a tolerance of 5%