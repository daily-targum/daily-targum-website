import * as React from 'react';
import { ReactChildren } from '../types';
import cn from 'classnames';
import Styles from './Section.styles';
const { classNames, StyleSheet } = Styles;

type SectionProps = {
  children: ReactChildren,
  className?: string,
  style?: React.CSSProperties,
  classNameInside?: string,
  styleInside?: React.CSSProperties,
}

export function Section({
  children,
  className,
  style,
  classNameInside,
  styleInside
}: SectionProps) {
  return (
    <>
      <div 
        className={cn(
          className, 
          classNames.section
        )}
        style={style} 
      >
        <div 
          style={styleInside} 
          className={cn(
            classNameInside, 
            classNames.inside
          )}
        >
          {children}
        </div>
      </div>
      {StyleSheet}
    </>
  );
}

Section.OffsetPadding = OffsetPadding;
function OffsetPadding({
  children,
  className
}: {
  children: ReactChildren;
  className?: string
}) {
  return (
    <>
      <section
        className={cn(
          classNames.offsetPadding, 
          className
        )}
      >
        {children}
      </section>
    </>
  );
}

export default Section;