import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the Playwright website', async function () {
    await this.page.goto('https://playwright.dev/');
});

When('I go to GET STARTED', async function () {
    await this.page.getByRole('link', { name: 'GET STARTED' }).click();
});

Then('I should see the Getting Started page', async function () {
    await expect(this.page).toHaveURL('https://playwright.dev/docs/intro');
});
