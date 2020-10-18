import React from 'react';
import Styles from './Banner.styles';
const { classNames, StyleSheet } = Styles;

export function Banner({
  text,
  accentText
}: {
  text: string
  accentText?: string
}) {
  return (
    <>
      <div 
        className={classNames.logoWrap} 
        role='banner'
        aria-label={`${text}${accentText ? ' '+accentText : ''}`}
      >
        <h1 className={classNames.logo} aria-hidden={true}>
          {text}
          {accentText ? <span className={classNames.logoAccent}> {accentText}</span> : null}
        </h1>
      </div>
      {StyleSheet}
    </>
  );
}

export default Banner;