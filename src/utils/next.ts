export function processNextQueryStringParam(str: string | string[] | undefined) {
  if(typeof str === 'object') {
    return str[0]
  } else {
    return str || '';
  }
}