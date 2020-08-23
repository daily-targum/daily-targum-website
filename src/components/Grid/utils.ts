import { breakPointKeys, breakPoints } from './config';
import { BreakPoint, BreakPoints } from './types';

// Web and Native
export function getBreakpoint(
  windowWidth: number
): BreakPoint {
  let breaker: BreakPoint = 'xs';

  breakPointKeys.forEach((key: BreakPoint) => {
    if(windowWidth > breakPoints[key]) {
      breaker = key;
    }
  });

  return breaker;
}

// Web and Native
export function computeBreakpoints<T>(
  breakpoints: Partial<BreakPoints<T>>
): BreakPoints<T> {
  const computedBreakPoints: Partial<BreakPoints<T>> = {};
  let crntWidth: T;

  breakPointKeys.forEach(key => {
    crntWidth = breakpoints[key] ?? crntWidth;
    computedBreakPoints[key] = crntWidth;
  });

  return computedBreakPoints as any;
}