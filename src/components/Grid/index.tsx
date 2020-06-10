import React from 'react';
import Col from './Col';
import Row from './Row';
import * as Styles from './styles';
import { Context, Provider, useResponsiveStyles } from './context';
import { BreakPoint, ComputedStyles } from './types';

// backwards compatibility for renamed function
const BreakpointSwitch = useResponsiveStyles;

export const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
export const breakPointKeys: BreakPoint[] = Object.keys(breakPoints) as BreakPoint[];

let camelToDash = (s: string) => s.replace(/[A-Z]/g, m => "-" + m.toLowerCase());

function toBrowserCss(css: any) {
  let output: any = {};
  Object.keys(css).forEach(prop => {
    output[camelToDash(prop)] = css[prop];
  }); 
  return output;
}

function ResponsiveStyles({ children, styles }: {
  children: React.ReactChild,
  styles: any
}) {
  let crntStyle: any,
  computedStyles: ComputedStyles = {};
  breakPointKeys.forEach(key => {
    if(typeof styles[key] !== 'undefined') {
      crntStyle = styles[key];
    }
    computedStyles[key] = toBrowserCss(crntStyle);
  });

  return (
    <Styles.BreakpointSwitch
      breakPoints={breakPoints}
      computedStyles={computedStyles}
    >
      {children}
    </Styles.BreakpointSwitch>
  );
}

export {
  Col,
  Row,
  Context,
  Provider,
  BreakpointSwitch,
  useResponsiveStyles,
  ResponsiveStyles
};

export default {
  Col,
  Row,
  Context,
  Provider,
  BreakpointSwitch: useResponsiveStyles,
  useResponsiveStyles,
  ResponsiveStyles
}
