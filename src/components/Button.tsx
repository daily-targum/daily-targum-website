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
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <button 
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
    </button>
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
    <button 
      onClick={onClick}
      className={styles.textButton}
      style={{
        ...style
      }}
    >
      {children}
    </button>
  );
}

Button.Text = ButtonText;
export default Button;