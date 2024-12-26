import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page } from 'playwright';

export class CustomWorld extends World {
  page: Page | undefined;

  constructor(options: IWorldOptions) { // Using IWorldOptions for the options type
    super(options);
    this.page = undefined;
  }
}

setWorldConstructor(CustomWorld);
