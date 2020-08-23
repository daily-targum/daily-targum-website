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
  styleInside,
  onClick
}: {
  aspectRatio?: number
  children?: ReactChildren
  className?: string
  classNameInside?: string
  style?: React.CSSProperties
  styleInside?: React.CSSProperties
  onClick?: () => any
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
      onClick={onClick}
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
  src,
  className,
  style,
  onClick,
  altText
}: {
  aspectRatio?: number
  data?: ImageData[]
  src?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => any
  altText?: string
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
      onClick={onClick}
    >
      <Image
        style={{
          ...styleHelpers.absoluteFill(),
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }}
        data={data}
        src={src}
        altText={altText}
      />
    </AspectRatioView>
  );
}