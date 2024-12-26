// /src/support/performance/loadTest.js

// Import K6's HTTP module for sending HTTP requests, check for validations, and sleep for delays
import http from "k6/http";
import { check, sleep } from "k6";

// Import HTML report generator for K6 from an external source
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Retrieve the number of virtual users and test duration from environment variables or set defaults
const vus = __ENV.VUS ? parseInt(__ENV.VUS) : 1; // Default to 1 virtual user if VUS is not provided
const duration = __ENV.DURATION ? __ENV.DURATION : "1s"; // Default to 1 second if DURATION is not provided

// Log the VU and duration values to confirm they are set correctly
console.log(`Running load test with ${vus} virtual users for ${duration}`);

// Export K6 test options, using dynamically set VUS and DURATION, and define performance thresholds
export let options = {
  vus: vus,
  duration: duration,
  thresholds: {
    http_req_duration: ["avg<200", "p(95)<300"], // Set thresholds: average response time < 200ms, 95th percentile < 300ms
    checks: ["rate>0.99"], // Require 99% of checks to pass
  },
};

// Default function executed by each virtual user, performing the main HTTP request and checks
export default function () {
  // Send a GET request to the specified endpoint
  const res = http.get("https://jsonplaceholder.typicode.com/posts");

  // Validate the response status and timing with checks
  const resultCheck = check(res, {
    "status is 200": (r) => r.status === 200, // Check if the response status is 200
    "response time < 1000ms": (r) => r.timings.duration < 1000, // Check if the response time is under 1000ms
  });

  // Log an error message if any check fails, including response status and duration
  if (!resultCheck) {
    console.error(
      `One or more checks failed. Response status: ${res.status}, Response time: ${res.timings.duration}ms`,
    );
  }

  sleep(1); // Pause execution for 1 second between iterations to simulate real user behavior
}

// Function to handle the test summary and generate both JSON and HTML reports
export function handleSummary(data) {
  return {
    // Save JSON summary report to the specified file path
    "reports/performance/loadTest.json": JSON.stringify(data, null, 2),

    // Generate an HTML report using the external HTML report generator
    "reports/performance/loadTest.html": htmlReport(data),
  };
}
