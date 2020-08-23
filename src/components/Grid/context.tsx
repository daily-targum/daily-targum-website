import React from 'react';
import { breakPointKeys } from './config';
import { BreakPoint, Context as ContextType } from './types';

export const defaultContextValue: ContextType = {
  breakPoint: 'xs', 
  cols: (new Array(24)).fill('1fr'),
  spacing: 0
}

export const Context = React.createContext(defaultContextValue);

// Web and Native
export function useGrid() {
  return React.useContext(Context);
}

// Web and Native
export function useResponsiveStyles(styles: any) {
  const { breakPoint } = React.useContext(Context);

  let style: any;
  breakPointKeys.forEach((key: BreakPoint) => {
    if(styles[key] !== undefined && breakPoint !== null && breakPointKeys.indexOf(key) <= breakPointKeys.indexOf(breakPoint)) {
      style = styles[key];
    }
  });

  return style;
}

// Web and Native
export function Consumer({ 
  children 
}: {
  children: (context: { breakPoint: BreakPoint | null, spacing: number }) => any
}) {
  return children(useGrid());
}


// Web and Native
export function BreakpointSwitch(styles: any) {
  const { breakPoint } = React.useContext(Context);

  let style: any;
  breakPointKeys.forEach((key: BreakPoint) => {
    if(styles[key] !== undefined && breakPoint !== null && breakPointKeys.indexOf(key) <= breakPointKeys.indexOf(breakPoint)) {
      style = styles[key];
    }
  });

  return style;
}