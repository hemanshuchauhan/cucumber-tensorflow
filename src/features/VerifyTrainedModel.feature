@VerifyTrainedModel
Feature: Verify Trained Model
  As an Engineer
  I need to be able to verify the prediction of a trained model
  So I can validate the model's accuracy

  Scenario: Train and test a simple TensorFlow model
    Given I have trained a simple TensorFlow model
    When I input the value 5
    Then the prediction should be close to 9
