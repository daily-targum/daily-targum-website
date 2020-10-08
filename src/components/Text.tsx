import React from 'react';
import { ReactChildren } from '../types';
import styles from './Text.module.scss';
import cn from 'classnames';

type GetArrayElementType<T extends readonly any[]> = T extends readonly (infer U)[] ? U : never;

export const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'time'] as const;
export type Variant = GetArrayElementType<typeof variants>;

interface TextBaseProps {
  htmlTag?: Variant;
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
    default:
      return <span {...props} />
  }
}

interface TextProps extends TextBaseProps {
  noPadding?: boolean;
  variant?: Variant;
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
    <TextBase
      htmlTag={htmlTag}
      className={cn(className, styles[variant], {
        [styles.noPadding]: noPadding
      })}
      style={style}
      onClick={onClick}
      aria-label={label}
      aria-hidden={ariaHidden}
      data-tooltip-position={tooltipPosition}
    >
      {children}
    </TextBase>
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
    <TextBase
      numberOfLines={numberOfLines}
      htmlTag={htmlTag}
      className={cn(
        className, 
        styles[variant], 
        styles.truncate,
        {
          [styles.noPadding]: noPadding
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
  );
}

export function Br() {
  return (
    <div className={styles.br}/>
  );
}

Text.Br = Br;
export default Text;