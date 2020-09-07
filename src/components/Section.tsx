import React from 'react';
import { ReactChildren } from '../types';
import styles from './Section.module.scss';
import cn from 'classnames';

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
  return (
    <div 
      className={cn(className, styles.section)}
      style={style} 
    >
      <div 
        style={styleInside} 
        className={cn(classNameInside, styles.inside)}
      >
        {children}
      </div>
    </div>
  );
}

export default Section;