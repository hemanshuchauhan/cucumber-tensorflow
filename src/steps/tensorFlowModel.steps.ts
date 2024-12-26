// Import Cucumber steps for defining Gherkin steps and Playwright's expect assertion
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Import TensorFlow.js and custom model functions
import * as tf from '@tensorflow/tfjs';
import { createSimpleModel, predictValue } from '../support/model/simpleModel';

let model: tf.LayersModel; // Variable to store the TensorFlow model
let prediction: number; // Variable to store the model's prediction result

// Given step: Create and train a simple TensorFlow model
Given('I have trained a simple TensorFlow model', async () => {
  model = await createSimpleModel(); // Call a function to initialize and train the model
});

// When step: Make a prediction using the trained model with the given input
When('I input the value {int}', async (input: number) => {
  prediction = await predictValue(model, input); // Use the model to predict based on the input value
});

// Then step: Verify the prediction is close to an expected value
Then('the prediction should be close to {int}', (expectedValue: number) => {
  expect(prediction).toBeCloseTo(expectedValue, 0.5); // Check that the prediction is within 0.5 of the expected value
});
