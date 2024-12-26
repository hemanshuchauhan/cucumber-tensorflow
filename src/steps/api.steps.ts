import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { sendPostRequest, sendGetRequest } from '../support/api/apiHelper';

// Define a more specific type for API responses
type ApiResponse = {
  data: Record<string, unknown>; // More precise typing for response data
  [key: string]: unknown; // Allow additional keys if needed
};

// Define type for DataTable argument
type DataTable = {
  rowsHash: () => Record<string, string>;
};

let response: ApiResponse;

Given(
  'I send a POST request to {string} with the following data',
  async function (endpoint: string, dataTable: DataTable) {
    const data = dataTable.rowsHash();
    try {
      response = (await sendPostRequest(endpoint, data)) as ApiResponse;
    } catch (error) {
      throw new Error(`Failed to send POST request to ${endpoint}: ${error}`);
    }
  }
);

Given('I send a GET request to {string}', async function (endpoint: string) {
  try {
    response = (await sendGetRequest(endpoint)) as ApiResponse;
  } catch (error) {
    throw new Error(`Failed to send GET request to ${endpoint}: ${error}`);
  }
});

Then(
  'the response should contain {string} with value {string}',
  function (key: string, value: string) {
    const expectedValue = isNaN(Number(value)) ? value : Number(value);
    const actualValue =
      response.data && response.data[key] ? response.data[key] : response[key];
    expect(actualValue).toEqual(expectedValue);
  }
);

Then(
  'the response should contain {string} with a non-empty value',
  function (key: string) {
    const actualValue =
      response.data && response.data[key] ? response.data[key] : response[key];
    expect(actualValue).toBeDefined();
    expect(actualValue).not.toBe('');
  }
);
