import React, { CSSProperties } from 'react';
import { Theme } from './';
// import Truncate from 'react-truncate';
import styled from 'styled-components';
import { ReactChild } from '../types';

const Truncate = styled.span<{
  numberOfLines?: number
}>`
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.numberOfLines || 'initial'};
  -webkit-box-orient: vertical; 
  overflow: hidden;
`;

export function Text({
  children,
  numberOfLines,
  className,
  variant = 'span',
  style
}: {
  children: (string | ReactChild)[] | string | ReactChild,
  numberOfLines?: number,
  className?: string,
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
  style?: CSSProperties
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Truncate
      className={[className, classes[variant]].join(' ')}
      style={style}
      numberOfLines={numberOfLines}
    >
      {children}
    </Truncate>
  );
}

const styleCreator = Theme.makeStyleCreator(() => ({
  h1: {
    fontWeight: '700' as any
  },
  h2: {
    fontWeight: '700' as any
  },
  h3: {
    fontWeight: '700' as any,
    fontSize: '1.2rem'
  },
  h4: {
    fontWeight: '700' as any,
    fontSize: '1rem'
  },
  h5: {

  },
  h6: {

  },
  p: {

  },
  span: {

  }
}));

export default Text;