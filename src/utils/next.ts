import { useRouter } from 'next/router';

type Env = 'staging' | 'production' | 'development';
const env = (process.env.ENV || 'development') as Env;

export function processNextQueryStringParam(str: string | string[] | undefined | null, fallbackValue = '') {
  if(typeof str === 'object' && str !== null) {
    return str[0] ?? fallbackValue;
  } else if (typeof str === 'string') {
    return str
  } else {
    return fallbackValue;
  }
}

function useRouteHistory() {
  const router = useRouter();
  // @ts-ignore
  return Object.keys(router?.components ?? {}).filter(route => route.indexOf('_') !== 1);
}

function useCanGoBack() {
  const routeHistory = useRouteHistory();
  return routeHistory.slice(-2, -1).length > 0;
}

function envIs(envs: Env[]) {
  return envs.includes(env);
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function isServer() {
  return typeof window === 'undefined';
}

export const nextUtils = {
  useRouteHistory,
  useCanGoBack,
  envIs,
  isBrowser,
  isServer
}