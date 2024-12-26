# Behavior-Driven Development (BDD) Story Pointing
In a Behavior-Driven Development (BDD) model, story points for a feature are assigned by accumulating points from each scenario within the feature. Here’s how the process works:

### How Story Points are Assigned
1. Scenarios
Each scenario within a feature represents a specific use case and is assigned a story point value based on the complexity and effort required.

2. Dev and QA Effort
At the scenario level, story points are further broken down by estimating the effort required by both Development (Dev) and Quality Engineering (QE) teams. These contributions are reflected in the total scenario points, where Dev and QE might have separate responsibilities and corresponding points.

3. Roll-Up
Points from each scenario (combining Dev and QE efforts) roll up to contribute to the overall story points for the feature. The final tally at the feature level represents the cumulative effort needed to implement and verify the feature, providing an accurate total story point value for the feature.

### Example of Story Pointing with BDD
In the feature "Authenticate User," scenarios have individual points based on the combined effort of Dev and QE teams. For example:

- Scenario: Successfully authenticate with valid credentials
Points: 7 (4 for Dev, 3 for QE)

- Scenario: Fail authentication with invalid credentials
Points: 5 (2 for Dev, 3 for QE)

- Scenario: Fail authentication with an inactive account
Points: 3 (1 for Dev, 2 for QE)

- Scenario: Fail authentication with a locked account
Points: 4 (2 for Dev, 2 for QE)

### Roll-Up Summary
This approach provides a clear understanding of effort distribution, ensuring that both Dev and QE contributions are factored into the overall feature story point total. In this example, the feature "Authenticate User" has a total of 19 points when rolling up all scenario points, which helps prioritize and allocate resources effectively.






::: mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'fontSize': '24px}}}%%

graph BT
F[Feature: Autheticate User: 19 points]
S1[Scenario: Successfully authenticate with valid credentials] -. "7 points" .-> F
S2[Scenario: Fail authentication with invalid credentials] -. "5 points" .-> F
S3[Scenario: Fail authentication with an inactive account] -. "3 points" .-> F
S4[Scenario: Fail authentication with a locked account] -. "4 points" .-> F
T1[Dev] -. "4 points" .-> S1
T2[QE] -. "3 points" .-> S1
T3[Dev] -. "2 points" .-> S2
T4[QE] -. "3 points" .-> S2
T5[Dev] -. "1 points" .-> S3
T6[QE] -. "2 points" .-> S3
T7[Dev] -. "2 points" .-> S4
T8[QE] -. "2 points" .-> S4