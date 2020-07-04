import React from 'react';
import { styleHelpers } from '../utils';
import { ReactChildren } from '../types';

export function AspectRatioView({
  aspectRatio,
  children,
  className,
  classNameInside,
  style,
  styleInside
}: {
  aspectRatio: [number, number]
  children?: ReactChildren
  className?: string
  classNameInside?: string
  style?: React.CSSProperties
  styleInside?: React.CSSProperties
}) {
  return (
    <div 
      style={style}
      className={className}
    >
      <div 
        className={classNameInside}
        style={{
          ...styleHelpers.aspectRatioFullWidth(...aspectRatio),
          ...styleInside
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function AspectRatioImage({
  aspectRatio,
  src,
  className,
  style,
}: {
  aspectRatio: [number, number]
  src: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <AspectRatioView
      aspectRatio={aspectRatio}
      className={className}
      style={{
        background: `url(${src})`,
        ...styleHelpers.centerBackgroundImage(),
        ...style
      }}
    />
  );
}