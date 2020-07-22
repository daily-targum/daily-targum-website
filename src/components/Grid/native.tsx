import React, { useContext } from 'react';
import * as types from './types';
import { Context, defaultContextValue } from './context';
import { View, useWindowDimensions } from 'react-native';
import { computeBreakpoints, getBreakpoint } from './utils';
import * as contextExports from './context';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';


export type NativeStyle = ViewStyle | TextStyle | ImageStyle;

export interface ColProps extends types.BreakPoints<number> {
  style?: NativeStyle
  children?: React.ReactNode
}

export interface RowProps {
  style?: NativeStyle
  children?: React.ReactNode
  spacing?: number
}

function Col({
  xs, 
  sm, 
  md, 
  lg, 
  xl, 
  xxl, 
  style, 
  children
}: ColProps) {
  const { spacing, breakPoint } = useContext(Context);
  const computedBreakpoints = computeBreakpoints({ xs, sm, md, lg, xl, xxl });
  const width = computedBreakpoints[breakPoint];

  return (
    <View
      style={[
        {
          position: 'relative',
          display: width === 0 ? 'none' : undefined,
          flexDirection: 'column',
          paddingRight: spacing / 2,
          paddingLeft: spacing / 2,
          minWidth: width,
          width,
          maxWidth: width
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

function Row({
  spacing = 0, 
  children, 
  style
}: RowProps) {
  const context = useContext(Context);
  return (
    <Context.Provider value={{...context, spacing }}>
      <View  
        style={[
          {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: -spacing / 2,
            marginRight: -spacing / 2,
            flex: 1
          },
          style
        ]}
      >
        {children}
      </View>
    </Context.Provider>
  );
}

function Provider(props: any) {
  const dimensions = useWindowDimensions();

  const [ breakPoint, setBreakPoint ] = React.useState(getBreakpoint(dimensions.width));

  React.useEffect(() => {
    setBreakPoint(getBreakpoint(dimensions.width));
  }, [dimensions.width]);

  return (
    <Context.Provider value={{ ...defaultContextValue, breakPoint, spacing: 0 }}>
      {props.children}
    </Context.Provider>
  );
}

export const Grid = {
  ...contextExports,
  Col,
  Row,
  Provider
}

export default Grid;