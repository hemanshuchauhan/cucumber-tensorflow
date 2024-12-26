// a11y.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { AxeResults, Result } from 'axe-core';
import { createHtmlReport } from 'axe-html-reporter';
import { writeFileSync } from 'fs';

// Declare the axe type in the global window object
declare global {
  interface Window {
    axe: {
      run: () => Promise<AxeResults>;
    };
  }
}

// Function to inject the Axe accessibility testing library into the webpage
async function injectAxe(page: Page) {
  await page.addScriptTag({
    path: require.resolve('axe-core/axe.min.js'),
  });
}

// Function to run the Axe accessibility check and return the results
async function checka11y(page: Page): Promise<AxeResults> {
  return await page.evaluate(async () => {
    return await window.axe.run(); // Use the declared window.axe type
  });
}


Given('I go to the following {string}', async function (url: string) {
  await this.page.goto(url);
});

// Given step: Navigate to a specific accessible website
Given('I go to a site that is accessible', async function () {
  await this.page.goto('https://www.a11yproject.com/');
});

// When step: Inject Axe and prepare for accessibility checks
When('I run the a11y check', async function () {
  await injectAxe(this.page);
});

// Then step: Run accessibility check and handle/report violations
Then('I should not see violations', async function () {
  const results: AxeResults = await checka11y(this.page);

  const reportHtml = createHtmlReport({
    results,
    options: {
      projectKey: 'Accessibility Testing',
    },
  });

  writeFileSync('reports/a11y-report.html', reportHtml);

  if (results.violations.length > 0) {
    const seriousViolations: Result[] = results.violations.filter(
      (v) => v.impact === 'serious'
    );

    if (seriousViolations.length > 0) {
      throw new Error(
        `A11y issues found: ${JSON.stringify(seriousViolations, null, 2)}`
      );
    }
  }
});
