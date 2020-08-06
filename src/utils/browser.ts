import { browserName, Browser } from 'detect-browser';

function is(browsers: Browser[]) {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const name = browserName(navigator.userAgent);

  if (name === null) {
    return false;
  }

  return browsers.includes(name);
}

export const browser = {
  is
};