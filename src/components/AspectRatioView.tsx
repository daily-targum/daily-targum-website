import React from 'react';
import { styleHelpers } from '../utils';
import { ReactChildren, ReactChild } from '../types';
import { ImageData, Image } from './Image';
import styles from './AspectRatioView.module.scss';
import cn from 'classnames';

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
  altText,
  Overlay,
  styleInside,
  classNameInside
}: {
  aspectRatio?: number
  data?: ImageData[]
  src?: string
  className?: string
  classNameInside?: string
  style?: React.CSSProperties
  styleInside?: React.CSSProperties
  onClick?: () => any
  altText?: string
  Overlay?: ReactChild
}) {
  return (
    <div 
      style={{
        width: '100%',
        ...style
      }}
      className={cn(
        className,
        {
          [styles.grow]: aspectRatio === undefined
        }
      )}
      onClick={onClick}
    >
      <Image
        styleOutside={{
          ...(aspectRatio ? {
            ...styleHelpers.aspectRatioFullWidth(aspectRatio),
            position: 'relative'
          } : null),
          ...styleInside
        }}
        classNameOutside={classNameInside}
        className={styles.image}
        style={{
          height: '100%'
        }}
        data={data}
        src={src}
        altText={altText}
      />
      {Overlay}
    </div>
  );
}