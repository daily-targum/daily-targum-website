import React from 'react';
import { styleHelpers } from '../utils';
import { ReactChildren } from '../types';
import { ImageData, Image } from './Image';

export function AspectRatioView({
  aspectRatio,
  children,
  className,
  classNameInside,
  style,
  styleInside
}: {
  aspectRatio?: number
  children?: ReactChildren
  className?: string
  classNameInside?: string
  style?: React.CSSProperties
  styleInside?: React.CSSProperties
}) {
  return (
    <div 
      style={{
        ...(aspectRatio ? null : {
          flex: 1,
          height: '100%'
        }),
        ...style
      }}
      className={className}
    >
      <div 
        className={classNameInside}
        style={{
          ...(aspectRatio ? styleHelpers.aspectRatioFullWidth(aspectRatio) : null),
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
  data,
  className,
  style,
}: {
  aspectRatio?: number
  data: ImageData[]
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <AspectRatioView
      aspectRatio={aspectRatio}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        ...style
      }}
    >
      <Image
        style={{
          ...styleHelpers.absoluteFill(),
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }}
        data={data}
      />
    </AspectRatioView>
  );
}