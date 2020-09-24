import React from 'react';
import { ReactChildren } from '../types';
import styles from './Button.module.scss';
import Link from './Link';

export function Button({
  children,
  onClick,
  href,
  className,
  style
}: {
  children: ReactChildren<string>
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  href?: string;
  className?: string
  style?: React.CSSProperties
}) {
  return href ? (
    <Link 
      href={href}
      className={[
        className,
        styles.button
      ]. join(' ')} 
      style={{
        ...style
      }}
    >
     {children}
    </Link>
  ) : (
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