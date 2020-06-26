import React, { useContext, useState, useEffect } from 'react';
import { breakPointKeys, breakPoints } from './index';
import { BreakPoint } from './types';

export const Context = React.createContext<{
  breakPoint: BreakPoint | null,
  spacing: number
}>({breakPoint: null, spacing: 0});

export function useGrid(): {breakPoint: BreakPoint | null, spacing: number} {
  return useContext(Context);
}

export function Provider(props: any) {
  function getBreakpoint() {
    let breaker = null;
    if(process.browser) {
      let width = window.innerWidth;
      breakPointKeys.forEach((key: BreakPoint) => {
        if(width > breakPoints[key]) {
          breaker = key;
        }
      });
    }
    return breaker;
  }

  const [breakPoint, setBreakPoint] = useState<BreakPoint | null>(getBreakpoint());

  useEffect(() => {
    if(process.browser) { 
      const onLayout = () => setBreakPoint(getBreakpoint());
      onLayout();
      window.addEventListener('resize', onLayout);
      return () => {
        window.removeEventListener('resize', onLayout);
      }
    }
  }, []);

  return (
    <Context.Provider value={{breakPoint, spacing: 0}}>
      <div style={{flex: 1, height: '100%'}}>
        {props.children}
      </div>
    </Context.Provider>
  );
}

export function Consumer({ children }: {
  children: (context: {breakPoint: BreakPoint | null, spacing: number}) => any
}) {
  return children(useGrid());
}

export function BreakpointSwitch(styles: any) {
  const { breakPoint } = useContext(Context);

  let style: any;
  breakPointKeys.forEach((key: BreakPoint) => {
    if(styles[key] !== undefined && breakPoint !== null && breakPointKeys.indexOf(key) <= breakPointKeys.indexOf(breakPoint)) {
      style = styles[key];
    }
  });

  return style;
}

export function useResponsiveStyles(styles: any) {
  const { breakPoint } = useContext(Context);

  let style: any;
  breakPointKeys.forEach((key: BreakPoint) => {
    if(styles[key] !== undefined && breakPoint !== null && breakPointKeys.indexOf(key) <= breakPointKeys.indexOf(breakPoint)) {
      style = styles[key];
    }
  });

  return style;
}