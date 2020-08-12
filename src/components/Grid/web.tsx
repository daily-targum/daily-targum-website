import React, { useContext } from 'react';
import * as types from './types';
import { Context, defaultContextValue } from './context';
import { computeBreakpoints, getBreakpoint } from './utils';
import * as contextExports from './context';
import * as Styles from './styles';
import { breakPoints } from './config';

export interface ColProps extends Partial<types.BreakPoints<number>> {
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}

export interface RowProps {
  style?: React.CSSProperties
  children?: React.ReactNode
  spacing?: number
  className?: string
  cols?: string[] | number
}

export interface DisplayProps extends Partial<types.BreakPoints<boolean>> {
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}

function Col(props: ColProps) {
  // const context = useContext(Context);
  const { xs, sm, md, lg, xl, xxl, style, children, className } = props;
  const computedBreakpoints = computeBreakpoints({ xs, sm, md, lg, xl, xxl });

  return (
    <Styles.Col 
      className={className}
      computedBreakPoints={computedBreakpoints} 
      style={style}
      breakPoints={breakPoints}
    >
      {children}
    </Styles.Col>
  );
}

function Row({
  cols,
  spacing = 0, 
  children, 
  style, 
  className
}: RowProps) {
  const context = {
    ...contextExports.defaultContextValue,
    breakPoint: useContext(Context).breakPoint
  };

  if (typeof cols === 'number') {
    cols = Array.from({ length: cols }).map(() => '1fr');
  }

  return (
    <Context.Provider 
      value={{
        ...context, 
        spacing, 
        cols: cols || context.cols
      }}
    >
      <div 
        className={className} 
        style={{
          display: 'grid',
          gridTemplateColumns: (cols || context.cols).join(' '),
          gridGap: spacing,
          flex: 1,
          ...style
        }}
      >
        {children}
      </div>
    </Context.Provider>
  );
}

function Display({
  children,
  className,
  style,
  ...rest
}: DisplayProps) {
  const computedBreakPoints = computeBreakpoints(rest);
  return (
    <Styles.Display
      computedBreakPoints={computedBreakPoints}
      breakPoints={breakPoints}
      className={className}
      style={style}
    >
      {children}
    </Styles.Display>
  )
}

function Provider({
  children
}: {
  children: React.ReactNode
}) {
  const [ breakPoint, setBreakPoint ] = React.useState(getBreakpoint(process.browser ? window.innerWidth : 0));

  React.useEffect(() => {
    if(process.browser) { 
      const onLayout = () => setBreakPoint(getBreakpoint(window.innerWidth));
      onLayout();
      window.addEventListener('resize', onLayout);
      return () => {
        window.removeEventListener('resize', onLayout);
      }
    }
  }, []);

  return (
    <Context.Provider value={{ ...defaultContextValue, breakPoint }}>
      {children}
    </Context.Provider>
  );
}

export const Grid = {
  ...contextExports,
  Col,
  Row,
  Provider,
  Display
}

export default Grid;