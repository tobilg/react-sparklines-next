// Vitest setup file
// jsdom is automatically loaded by vitest when environment is set to 'jsdom'

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
