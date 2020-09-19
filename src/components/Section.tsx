import React from 'react';
import { ReactChildren } from '../types';
import styles from './Section.module.scss';
import cn from 'classnames';
import { StickyContainer as StickyContainerDefault } from "react-sticky";

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

Section.StickyContainer = StickyContainer;
function StickyContainer({
  children,
  ...props
}: SectionProps) {
  return (
    <Section {...props}>
      <StickyContainerDefault>
        {children}
      </StickyContainerDefault>
    </Section>
  )
}

export default Section;