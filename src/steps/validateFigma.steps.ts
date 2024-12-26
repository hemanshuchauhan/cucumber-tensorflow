// src/steps/validateFigma.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../support/pageFixture';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';

Given('the Figma design for {string} is available', async function (designName: string) {
  // Assuming we have pre-saved PNGs for Figma designs
  const designPath = path.resolve(`src/support/figmaImages/${designName}.png`);
  if (!fs.existsSync(designPath)) {
    throw new Error(`Figma design file not found: ${designPath}`);
  }
  this.designPath = designPath;
});

When('I load the {string} in the browser', async function (url: string) {
  await fixture.initialize();
  await fixture.page?.goto(url);
  await fixture.page?.screenshot({ path: 'reports/current_page.png' });
  this.currentScreenshotPath = 'reports/current_page.png';
});

When('I load the {string} in the mobile browser with a viewport size of {int}x{int}', async function (url: string, width: number, height: number) {
  await fixture.initialize();
  await fixture.page?.setViewportSize({ width, height });
  await fixture.page?.goto(url);
  await fixture.page?.screenshot({ path: 'reports/current_page_mobile.png' });
  this.currentScreenshotPath = 'reports/current_page_mobile.png';
});

Then('the visual appearance should match the Figma design with a tolerance of {int}%', async function (tolerancePercent: number) {
  if (!this.designPath || !this.currentScreenshotPath) {
    throw new Error('Missing design or current screenshot path');
  }

  const designImage = PNG.sync.read(fs.readFileSync(this.designPath));
  const currentImage = PNG.sync.read(fs.readFileSync(this.currentScreenshotPath));

  const { width, height } = designImage;
  const diffImage = new PNG({ width, height });
  const pixelDiff = pixelmatch(designImage.data, currentImage.data, diffImage.data, width, height, { threshold: 0.1 });

  const totalPixels = width * height;
  const tolerancePixels = (tolerancePercent / 100) * totalPixels;

  fs.writeFileSync('reports/diff.png', PNG.sync.write(diffImage));

  expect(pixelDiff).toBeLessThanOrEqual(tolerancePixels);
});
