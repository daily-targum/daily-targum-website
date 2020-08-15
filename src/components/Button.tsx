import React from 'react';
import Theme from './Theme';

export function Button({
  children,
  onClick,
  className,
  style
}: {
  children: string
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
      <span style={styles.buttonText}>{children}</span>
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  button: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    backgroundColor: theme.colors.accent,
    borderRadius: theme.roundness(1),
    cursor: 'pointer'
  },
  buttonText: {
    color: '#fff',
    fontSize: '1.3rem'
  }
}));

export default Button;