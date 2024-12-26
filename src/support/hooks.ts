// hooks.ts
import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { fixture } from './pageFixture';
import { CustomWorld } from './world';

setDefaultTimeout(10 * 1000); // Set the default timeout for steps to 10 seconds

// BeforeAll hook: Launch the browser once before any tests run
BeforeAll(async function () {
  await fixture.initialize(); // Initialize browser only once before all tests
});

// Before hook: Set up a new context and page for each scenario to ensure test isolation
Before(async function (this: CustomWorld) {
  await fixture.initialize(); // Re-use existing browser, create a new context and page
  this.page = fixture.page; // Assign the page to the Cucumber world for scenario-specific access
});

// After hook: Take a screenshot if a scenario fails, then close the context to ensure isolation
After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED && fixture.page) {
    try {
      const img = await fixture.page.screenshot({
        path: `./reports/screenshots/${pickle.name}.png`,
        type: 'png',
      });
      this.attach(img, 'image/png'); // Attach the screenshot to the Cucumber report
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  }

  // Close the context and reset page after each scenario to avoid test interference
  if (fixture.context) {
    await fixture.context.close(); // Close the context to release resources
    fixture.context = undefined; // Reset context to ensure a new one for the next scenario
    fixture.page = undefined; // Reset page reference to ensure a fresh page is used
  }
});

// AfterAll hook: Close the browser after all tests have completed to clean up resources
AfterAll(async function () {
  await fixture.close(); // Final cleanup to ensure no open browsers remain
});
