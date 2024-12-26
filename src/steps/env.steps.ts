import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { environments } from '../support/environments';

Given('I navigate to homepage', async function (this: CustomWorld) {
  const envKey = process.env.ENV as keyof typeof environments || 'qa';
  const baseURL = environments[envKey];
  await this.page?.goto(baseURL);
  await this.page?.waitForTimeout(5000);
});