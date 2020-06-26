import React, { useContext } from 'react';
import * as types from './types';
import { Context } from './context';
import * as Styles from './styles';

const breakPoints: types.GlobalBreakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
const breakPointKeys = Object.keys(breakPoints) as types.BreakPoint[];

function Col(props: types.ColProps) {
  const context = useContext(Context);
  const { spacing } = context;
  const { xs, sm, md, lg, xl, xxl, style, children, className, ...cssProperties } = props;
  const breakpointProps = { xs, sm, md, lg, xl, xxl };

  let crntWidth = '';
  let computedBreakPoints: types.BreakPoints = {};
  breakPointKeys.forEach(key => {
    if(typeof breakpointProps[key] === 'number') {
      // @ts-ignore
      crntWidth = breakpointProps[key] / 0.24 + '%';
    } else if(typeof breakpointProps[key] === 'string') {
      // @ts-ignore
      crntWidth = breakpointProps[key];
    }
    computedBreakPoints[key] = crntWidth;
  });

  let computedStyle = Object.assign({}, style, cssProperties);

  return (
    <Styles.Col 
      className={className}
      computedBreakPoints={computedBreakPoints as types.ComputedBreakPoints} 
      spacing={spacing}
      style={computedStyle}
      breakPoints={breakPoints}
    >
      {children}
    </Styles.Col>
  );
}

export default Col;