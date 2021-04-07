/**
 * url that includes http(s) protocol
 */
export const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

/**
 * ISO date
 */
export const dateISO = {
  /**
   * W3C
   * http://www.w3.org/TR/NOTE-datetime
   */
  W3C: {
    complete: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
    noMilliseconds: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/,
    noSeconds: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/
  },
  /**
   * ISO 8601:2004(E) doc
   * http://dotat.at/tmp/ISO_8601-2004_E.pdf
   */
  updated2004: {
    noTimezone: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+/,
    noMilliseconds: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d/,
    noSeconds: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d/
  }
};

/**
 * Databse ID
 */
export const id = /^[a-z0-9]+(-[a-z0-9]+){0,4}$/i