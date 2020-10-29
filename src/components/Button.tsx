import * as React from 'react';
import { ReactChildren } from '../types';
import Link from './Link';
import Styles from './Button.styles';
const { classNames, StyleSheet } = Styles;

export function Button({
  children,
  onClick,
  href,
  className,
  style,
  disabled = false,
  cursor
}: {
  children: ReactChildren<string>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  cursor?: string
}) {
  return (
    <>
      {href ? (
        <Link 
          href={href}
          className={[
            className,
            classNames.button
          ]. join(' ')} 
          style={{
            cursor: cursor ?? (disabled ? 'not-allowed' : 'pointer'),
            ...style
          }}
        >
          {children}
        </Link>
      ) : (
        <button 
          disabled={disabled}
          className={[
            className,
            classNames.button
          ]. join(' ')} 
          style={{
            cursor: cursor ?? (disabled ? 'not-allowed' : 'pointer'),
            ...style
          }}
          onClick={onClick}
        >
          {children}
        </button>
      )}
      {StyleSheet}
    </>
  )
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
    <>
      <button 
        onClick={onClick}
        className={classNames.textButton}
        style={{
          ...style
        }}
      >
        {children}
      </button>
      {StyleSheet}
    </>
  );
}

Button.Text = ButtonText;
export default Button;