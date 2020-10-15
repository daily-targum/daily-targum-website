import React from 'react';
import { ReactChildren } from '../types';
import cn from 'classnames';
import Styles from './Text.styles';
const { classNames, StyleSheet } = Styles;

type GetArrayElementType<T extends readonly any[]> = T extends readonly (infer U)[] ? U : never;

export const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'time', 'blockquote'] as const;
export type Variant = GetArrayElementType<typeof variants>;

interface TextBaseProps {
  htmlTag?: Variant | string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactChildren<string>;
  onClick?: () => any;
  numberOfLines?: number;
  /* Aria Label */
  label?: string;
  tooltipPosition?: 'left' | 'right';
  ariaHidden?: boolean
}

function TextBase({
  htmlTag = 'span',
  numberOfLines: _,
  ...props
}: TextBaseProps) {
  switch (htmlTag) {
    case 'h1':
      return <h1 {...props} />;
    case 'h2':
      return <h2 {...props} />;
    case 'h3':
      return <h3 {...props} />;
    case 'h4':
      return <h4 {...props} />;
    case 'h5':
      return <h5 {...props} />;
    case 'h6':
      return <h6 {...props} />;
    case 'p':
      return <p {...props} />;
    case 'time':
      return <time {...props} />;
    case 'blockquote':
      return <blockquote {...props} />
    default:
      return <span {...props} />
  }
}

interface TextProps extends TextBaseProps {
  noPadding?: boolean;
  variant?: Variant | string;
}

export function Text({
  children,
  className,
  variant = 'span',
  htmlTag,
  style,
  noPadding = false,
  onClick,
  label,
  tooltipPosition,
  ariaHidden
}: TextProps) {
  if (htmlTag === undefined && !/h{1,6}/.test(variant)) {
    htmlTag = variant;
  }

  return (
    <>
      <TextBase
        htmlTag={htmlTag}
        className={cn(
          className, 
          // @ts-ignore
          classNames[variant], 
          {
            [classNames.noPadding]: noPadding
          }
        )}
        style={style}
        onClick={onClick}
        aria-label={label}
        aria-hidden={ariaHidden}
        data-tooltip-position={tooltipPosition}
      >
        {children}
      </TextBase>
      {StyleSheet}
    </>
  );
}

interface TrunkcateTextProps extends TextProps {
  numberOfLines?: number;
  lockNumberOfLines?: boolean;
}

Text.Truncate = Truncate;
function Truncate({
  children,
  numberOfLines,
  lockNumberOfLines = false,
  className,
  variant = 'span',
  htmlTag = 'span',
  style,
  noPadding = false,
  onClick,
  label,
  tooltipPosition,
  ariaHidden
}: TrunkcateTextProps) {
  return (
    <>
      <TextBase
        numberOfLines={numberOfLines}
        htmlTag={htmlTag}
        className={cn(
          className, 
          // @ts-ignore
          classNames[variant], 
          classNames.truncate,
          {
            [classNames.noPadding]: noPadding
          }
        )}
        onClick={onClick}
        style={{
          // @ts-ignore
          '--text-numberOfLines': numberOfLines,
          ...(lockNumberOfLines && (numberOfLines !== undefined) && variant) ? {
            minHeight: (1.2 * numberOfLines) + 'em'
          } : null,
          ...style
        }}
        aria-label={label}
        aria-hidden={ariaHidden}
        data-tooltip-position={tooltipPosition}
      >
        {children}
      </TextBase>
      {StyleSheet}
    </>
  );
}

export function Br() {
  return (
    <div className={classNames.br}/>
  );
}

Text.Br = Br;
export default Text;