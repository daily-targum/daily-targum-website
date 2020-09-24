import React, { useContext } from 'react';
import * as types from './types';
import { Context, defaultContextValue } from './context';
import { computeBreakpoints, getBreakpoint } from './utils';
import * as contextExports from './context';
import styles from './styles.module.scss';
import cn from 'classnames';

export interface ColProps extends Partial<types.BreakPoints<number>> {
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}

export interface RowProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  spacing?: number;
  className?: string;
  cols?: string[] | number;
  /**
   * This method of reversing is dangerous
   * cause it only reversed the order visually
   * and not for people using screen readers
   */
  dangerouslyReverse?: boolean;
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

  const vars: any = {};
  Object.keys(computedBreakpoints).forEach(breakpoint => {
    // @ts-ignore
    vars[`--gridWidth-${breakpoint}`] = computedBreakpoints[breakpoint];
    // @ts-ignore
    vars[`--gridDisplay-${breakpoint}`] = computedBreakpoints[breakpoint] === 0 ? 'none' : 'flex';
  });

  return (
    <div 
      style={{
        ...vars,
        ...style
      }}
      className={cn(
        className,
        styles.col
      )}
    >
      {children}
    </div>
  );
}

function Row({
  cols,
  spacing = 0, 
  children, 
  style, 
  className,
  dangerouslyReverse = false
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
        className={cn(
          className,
          styles.row
        )} 
        style={{
          gridTemplateColumns: (cols || context.cols).join(' '),
          gridGap: spacing+'px',
          direction: dangerouslyReverse ? 'rtl' : undefined,
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
  const computedBreakpoints = computeBreakpoints(rest);

  const vars: any = {};
  Object.keys(computedBreakpoints).forEach(breakpoint => {
    // @ts-ignore
    vars[`--gridDisplay-${breakpoint}`] = computedBreakpoints[breakpoint] ? 'flex' : 'none';
  });

  return (
    <div
      className={cn(
        className,
        styles.display
      )}
      style={{
        ...vars,
        ...style
      }}
    >
      {children}
    </div>
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