// cucumber.mjs

import isCI from "is-ci"; // Import the is-ci module to check if the code is running in a CI environment

const config = {
    paths: [process.env.FEATURE_PATH || 'src/features/**/*.feature'],
    requireModule: ['ts-node/register'], // Enables TypeScript support
    require: [
        process.env.STEP_PATH || 'src/steps/**/*.steps.ts',
        'src/support/*.ts',
    ],
    strict: true,
    format: [
        'progress',
        'json:reports/cucumber_report.json',
        'html:reports/report.html',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    worldParameters: {},
    retry: isCI ? 1 : 0,
};

export default config;
