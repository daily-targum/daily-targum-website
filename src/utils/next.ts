import { useRouter } from 'next/router';

export function processNextQueryStringParam(str: string | string[] | undefined | null, fallbackValue = '') {
  if(typeof str === 'object' && str !== null) {
    return str[0] ?? fallbackValue;
  } else {
    return str ?? fallbackValue;
  }
}

function useRouteHistory() {
  const router = useRouter();
  // @ts-ignore
  return Object.keys(router.components ?? {}).filter(route => route.indexOf('_') !== 1);
}

export const nextUtils = {
  useRouteHistory
}