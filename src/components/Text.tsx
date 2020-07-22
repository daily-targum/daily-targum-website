import React, { CSSProperties } from 'react';
import Theme from './Theme';
import { ReactChild } from '../types';

const LINE_HEIGHT_MULTIPLIER = 1.2;
const LINE_HEIGHT_MULTIPLIER_PARAGRAPH = 1.8;

function getTextBase({
  size,
  type = 'normal'
} : {
  size: number
  type?: 'normal' | 'paragraph'
}) {
  return {
    fontSize: `${size}rem`,
    lineHeight: `${(type === 'normal' ? LINE_HEIGHT_MULTIPLIER : LINE_HEIGHT_MULTIPLIER_PARAGRAPH)}em`
  } as const;
}

export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
export const variants: Variant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];

export function Text({
  children,
  numberOfLines = null,
  lockNumberOfLines = false,
  className,
  variant = 'span',
  style,
  noPadding = false
}: {
  children: (string | ReactChild)[] | string | ReactChild
  numberOfLines?: number | null
  lockNumberOfLines?: boolean
  className?: string
  variant?: Variant
  style?: CSSProperties
  noPadding?: boolean
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator, numberOfLines);
  const styles = Theme.useStyleCreator(styleCreator, numberOfLines);
  return (
    <span
      className={[
        noPadding ? classes.noPadding : null,
        classes[variant],
        numberOfLines ? classes.trunkcate : null,
        className, 
      ].join(' ')}
      style={{
        ...(lockNumberOfLines && (numberOfLines !== null) && variant) ? {
          minHeight: `calc(${styles[variant].lineHeight} * ${numberOfLines}`
        } : null,
        ...style
      }}
    >
      {children}
    </span>
  );
}

export function Br() {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <div className={classes.br}/>
  );
}

const styleCreator = Theme.makeStyleCreator((theme, numberOfLines) => ({
  trunkcate: numberOfLines ? {
    display: '-webkit-box',
    '-webkit-line-clamp': numberOfLines,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  } : {},
  h1: {
    ...getTextBase({
      size: 2.5
    }),
    fontWeight: 800,
    marginBottom: theme.spacing(2)
  },
  h2: {
    ...getTextBase({
      size: 2
    }),
    fontWeight: 700,
    marginBottom: theme.spacing(2)
  },
  h3: {
    ...getTextBase({
      size: 1.4
    }),
    fontWeight: 700,
    marginBottom: theme.spacing(2)
  },
  h4: {
    ...getTextBase({
      size: 1.2
    }),
    fontWeight: 700,
    marginBottom: theme.spacing(1)
  },
  h5: {
    ...getTextBase({
      size: 1
    }),
    fontWeight: 700,
    marginBottom: theme.spacing(1)
  },
  h6: {
    ...getTextBase({
      size: 0.8
    }),
    marginBottom: theme.spacing(1),
  },
  p: {
    marginBottom: theme.spacing(2),
    ...getTextBase({
      size: 1.8,
      type: 'paragraph'
    }),
    fontSize: '1rem'
  },
  span: {
    ...getTextBase({
      size: 1
    }),
  },
  br: {
    height: theme.spacing(2),
  },
  noPadding: {
    marginBottom: 0
  }
}));

Text.Br = Br;
export default Text;