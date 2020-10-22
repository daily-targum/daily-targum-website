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
  style
}: {
  children: ReactChildren<string>
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  href?: string;
  className?: string
  style?: React.CSSProperties
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
            ...style
          }}
        >
          {children}
        </Link>
      ) : (
        <button 
          className={[
            className,
            classNames.button
          ]. join(' ')} 
          style={{
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