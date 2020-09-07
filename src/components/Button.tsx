import React from 'react';
import { ReactChildren } from '../types';
import styles from './Button.module.scss';

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
  return (
    <div 
      className={[
        className,
        styles.button
      ]. join(' ')} 
      style={{
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
  return (
    <span 
      onClick={onClick}
      className={styles.textButton}
      style={{
        ...style
      }}
    >
      {children}
    </span>
  );
}

Button.Text = ButtonText;
export default Button;