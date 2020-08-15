import React from 'react';
import { makeStyleCreator, useStyleCreator } from './Theme'
import { ReactChildren } from '../types';

export function Section({
  children,
  className,
  style,
  classNameInside,
  styleInside
}: {
  children: ReactChildren,
  className?: string,
  style?: React.CSSProperties,
  classNameInside?: string,
  styleInside?: React.CSSProperties,
}) {
  const styles = useStyleCreator(styleCreator);
  return (
    <div 
      style={{
        ...styles.section,
        ...style
      }} 
      className={className}
    >
      <div 
        style={{
          ...styles.inside,
          ...styleInside
        }} 
        className={classNameInside}
      >
        {children}
      </div>
    </div>
  );
}

const styleCreator = makeStyleCreator(theme => ({
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  inside: {
    width: '100%',
    maxWidth: 'calc(1000px + 22vw)'
  }
}));

export default Section;