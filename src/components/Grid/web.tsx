import React, { useContext } from 'react';
import * as types from './types';
import { Context, defaultContextValue } from './context';
import { computeBreakpoints, getBreakpoint } from './utils';
import * as contextExports from './context';
import Theme from '../Theme';

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
  cols?: string[]
}

export interface DisplayProps extends Partial<types.BreakPoints<boolean>> {
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}

function Col(props: ColProps) {
  const { xs, sm, md, lg, xl, xxl, style, children, className } = props;
  const computedBreakpoints = computeBreakpoints({ xs, sm, md, lg, xl, xxl });
  const classes = Theme.useStyleCreatorClassNames(styleCreator, computedBreakpoints);

  return (
    <div
      className={[
        className,
        classes.col
      ].join(' ')}
      style={style}
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
  className
}: RowProps) {
  const context = {
    ...contextExports.defaultContextValue,
    breakPoint: useContext(Context).breakPoint
  };

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
  const classes = Theme.useStyleCreatorClassNames(styleCreator, computedBreakPoints);
  return (
    <div
      className={[
        className,
        classes.display
      ].join(' ')}
      style={style}
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

const styleCreator = Theme.makeStyleCreator((theme, computedBreakPoints: types.BreakPoints<number | boolean>) => ({
  col: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    [theme.mediaQuery(undefined, 'sm')]: {
      display: computedBreakPoints.xs === 0 ? 'none' : null,
      gridColumnEnd: `span ${computedBreakPoints.xs}`
    },
    [theme.mediaQuery('sm', 'md')]: {
      display: computedBreakPoints.sm === 0 ? 'none' : null,
      gridColumnEnd: `span ${computedBreakPoints.sm}`
    },
    [theme.mediaQuery('md', 'lg')]: {
      display: computedBreakPoints.md === 0 ? 'none' : null,
      gridColumnEnd: `span ${computedBreakPoints.md}`
    },
    [theme.mediaQuery('lg', 'xl')]: {
      display: computedBreakPoints.lg === 0 ? 'none' : null,
      gridColumnEnd: `span ${computedBreakPoints.lg}`
    },
    [theme.mediaQuery('xl', 'xxl')]: {
      display: computedBreakPoints.xl === 0 ? 'none' : null,
      gridColumnEnd: `span ${computedBreakPoints.xl}`
    },
    [theme.mediaQuery('xxl')]: {
      display: computedBreakPoints.xxl === 0 ? 'none' : null,
      gridColumnEnd: `span ${computedBreakPoints.xxl}`
    }
  },
  display: {
    [theme.mediaQuery(undefined, 'sm')]: {
      display: computedBreakPoints.xs ? null : 'none'
    },
    [theme.mediaQuery('sm', 'md')]: {
      display: computedBreakPoints.sm ? null : 'none'
    },
    [theme.mediaQuery('md', 'lg')]: {
      display: computedBreakPoints.md ? null : 'none'
    },
    [theme.mediaQuery('lg', 'xl')]: {
      display: computedBreakPoints.lg ? null : 'none'
    },
    [theme.mediaQuery('xl', 'xxl')]: {
      display: computedBreakPoints.xl ? null : 'none'
    },
    [theme.mediaQuery('xxl')]: {
      display: computedBreakPoints.xxl ? null : 'none'
    }
  }
}));

export const Grid = {
  ...contextExports,
  Col,
  Row,
  Provider,
  Display
}

export default Grid;