// Vitest setup file
// jsdom is automatically loaded by vitest when environment is set to 'jsdom'

// Suppress console warnings during tests (optional)
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Not implemented: HTMLFormElement.prototype.submit') ||
     args[0].includes('Not implemented'))
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};

