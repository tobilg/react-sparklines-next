// Setup jsdom for DOM testing
require('jsdom-global')();

// Suppress console warnings during tests (optional)
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Not implemented: HTMLFormElement.prototype.submit') ||
     args[0].includes('Not implemented'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};
