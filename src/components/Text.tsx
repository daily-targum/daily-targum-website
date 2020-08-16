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

function TextBase({
  htmlTag = 'span',
  ...props
}: {
  htmlTag?: Variant
  className?: string
  style?: React.CSSProperties
  children: (string | ReactChild)[] | string | ReactChild
  onClick?: () => any
}) {

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
    default:
      return <span {...props} />
  }

}

export function Text({
  children,
  className,
  variant = 'span',
  htmlTag,
  style,
  noPadding = false,
  onClick
}: {
  children: (string | ReactChild)[] | string | ReactChild
  className?: string
  variant?: Variant
  htmlTag?: Variant
  style?: CSSProperties
  noPadding?: boolean
  onClick?: () => any
}) {
  const styles = Theme.useStyleCreator(styleCreator);

  if (htmlTag === undefined && !/h{1,6}/.test(variant)) {
    htmlTag = variant;
  }

  return (
    <TextBase
      htmlTag={htmlTag}
      className={className}
      style={{
        ...styles[variant],
        ...(noPadding ? styles.noPadding : null),
        ...style
      }}
      onClick={onClick}
    >
      {children}
    </TextBase>
  );
}

Text.Truncate = Truncate;
function Truncate({
  children,
  numberOfLines = null,
  lockNumberOfLines = false,
  className,
  variant = 'span',
  htmlTag = 'span',
  style,
  noPadding = false
}: {
  children: (string | ReactChild)[] | string | ReactChild
  numberOfLines?: number | null
  lockNumberOfLines?: boolean
  className?: string
  variant?: Variant
  htmlTag?: Variant
  style?: CSSProperties
  noPadding?: boolean
}) {
  const styles = Theme.useStyleCreator(styleCreator, numberOfLines);
  const cng = Theme.useClassNameGenerator();

  return (
    <TextBase
      htmlTag={htmlTag}
      className={[
        className,
        numberOfLines ? cng(styles.trunkcate) : ''
      ].join(' ')}
      style={{
        ...styles[variant],
        ...(noPadding ? styles.noPadding : null),
        ...(lockNumberOfLines && (numberOfLines !== null) && variant) ? {
          minHeight: `calc(${styles[variant].lineHeight} * ${numberOfLines}`
        } : null,
        ...style
      }}
    >
      {children}
    </TextBase>
  );
}

export function Br() {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div style={styles.br}/>
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
    marginBottom: theme.spacing(1.5)
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
    fontSize: '1rem',
    wordWrap: 'break-word',
    hyphens: 'auto'
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