import React from 'react';
import Theme from './Theme';
import { ReactChildren } from '../types';

export function Button({
  children,
  onClick,
  className,
  style
}: {
  children: ReactChildren<string>
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => any
  className?: string
  style?: React.CSSProperties
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div 
      className={className} 
      style={{
        ...styles.button,
        ...style
      }}
      onClick={onClick}
    >
     {children}
    </div>
  );
}

export function ButtonText({
  children,
  onClick,
  style
}: {
  children: ReactChildren<string>
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => any
  style?: React.CSSProperties
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <span 
      onClick={onClick}
      style={{
        ...styles.textButton,
        ...style
      }}
    >
      {children}
    </span>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  button: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    backgroundColor: theme.colors.accent,
    borderRadius: theme.roundness(1),
    cursor: 'pointer',
    color: '#fff',
    fontSize: '1.3rem'
  },
  textButton: {
    color: theme.colors.accent,
    cursor: 'pointer'
  }
}));

Button.Text = ButtonText;
export default Button;