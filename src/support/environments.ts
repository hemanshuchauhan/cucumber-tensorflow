// src/support/environments.ts
export const environments: Record<'qa' | 'dev' | 'staging', string> = {
  qa: 'https://qa.in-house.com/',
  dev: 'https://dev.in-house.com/',
  staging: 'https://staging.in-house.com/',
};

export const getBaseURL = (): string => {
  const envKey = (process.env.ENV as keyof typeof environments) ?? 'qa'; // Fallback to 'qa' if undefined
  const baseURL = environments[envKey];
  if (!baseURL) throw new Error('Invalid environment value');
  return baseURL;
};