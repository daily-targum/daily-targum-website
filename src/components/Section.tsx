import React from 'react';
import { ReactChildren } from '../types';
import cn from 'classnames';
import { StickyContainer as StickyContainerDefault } from "react-sticky";
import { styleHelpers } from '../utils';

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
        className={cn(className, 'section')}
        style={style} 
      >
        <div 
          style={styleInside} 
          className={cn(classNameInside, 'inside')}
        >
          {children}
        </div>
      </div>
      <style jsx>
        {`
          .section {
            ${styleHelpers.flex('column')}
            width: 100%;
            align-items: center;
            padding-right: calc(${styleHelpers.spacing(1.25)} + 1vw);
            padding-left: calc(${styleHelpers.spacing(1.25)} + 1vw);
          }

          .inside {
            width: 100%;
            max-width: calc(1000px + 22vw);
          }
        `}
      </style>
      <style jsx global>
        {`
          @media print {
            .section {
              padding: 0;
            }

            .inside {
              max-width: 100%;
            }
          }
        `}
      </style>
    </>
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
          'offsetPadding', 
          className
        )}
      >
        {children}
      </section>
      <style jsx>
        {`
          @media ${styleHelpers.mediaQuery('xs', 'md')} {
            .offsetPadding {
              margin-right: calc((${styleHelpers.spacing(1.25)} + 1vw) * -1);
              margin-left: calc((${styleHelpers.spacing(1.25)} + 1vw) * -1);
            }
          }
        `}
      </style>
      <style jsx global>
        {`
          @media print {
            .offsetPadding {
              margin: 0;
            }
          }
        `}
      </style>
    </>
  );
}

export default Section;