// ENVIRONMENT VARIABLES
require('dotenv').config();

import 'babel-polyfill';
import 'isomorphic-fetch';
import { equals } from 'expect/build/jasmineUtils';

jest.setTimeout(30000);

function anyOrValue(value) {
  return (other, expectedObject) => {
    let pass;

    if (other === value) {
      pass = true;
    }

    else if (expectedObject == String) {
      pass = typeof other == 'string' || other instanceof String;
    }

    else if (expectedObject == Number) {
      pass = typeof other == 'number' || other instanceof Number;
    }

    else if (expectedObject == Function) {
      pass = typeof other == 'function' || other instanceof Function;
    }

    else if (expectedObject == Object) {
      pass = other !== null && typeof other == 'object';
    }

    else if (expectedObject == Boolean) {
      pass = typeof other == 'boolean';
    }

    /* jshint -W122 */
    /* global Symbol */
    else if (typeof Symbol != 'undefined' && expectedObject == Symbol) {
      pass = typeof other == 'symbol';
    }
    /* jshint +W122 */
    else {
      pass = other instanceof expectedObject;
    }

    return {
      pass,
      // message: () => 'you shall not pass',
    }
  }
}

expect.extend({

  anyOrNull: anyOrValue(null),
  anyOrUndefined: anyOrValue(undefined),

  arrayContainingOrNull(other, sample) {
    if (!Array.isArray(sample)) {
      throw new Error(
        `You must provide an array to ${this.toString()}, not '` +
          typeof sample +
          "'.",
      );
    }

    let pass;
    
    if (other !== null) {
      pass = (
        sample.length === 0 ||
        (Array.isArray(other) &&
          sample.every(item =>
            other.some(another => equals(item, another)),
          ))
      );
    } 
    
    else {
      pass = true;
    }

    return {
      pass: true,
      // message: () => 'you shall not pass',
    };
  }
  
})