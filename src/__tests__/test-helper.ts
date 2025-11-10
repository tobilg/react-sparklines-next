// Setup jsdom for DOM testing
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('jsdom-global')();

// Suppress console warnings during tests (optional)
const originalConsoleErrorHelper = console.error;
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Not implemented: HTMLFormElement.prototype.submit') ||
     args[0].includes('Not implemented'))
  ) {
    return;
  }
  originalConsoleErrorHelper.call(console, ...args);
};

