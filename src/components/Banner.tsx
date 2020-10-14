import React from 'react';
import styles from './Banner.module.scss';

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
      className={styles.logoWrap} 
      role='banner'
      aria-label={`${text}${accentText ? ' '+accentText : ''}`}
    >
      <h1 className={styles.logo} aria-hidden={true}>
        {text}
        {accentText ? <span className={styles.logoAccent}> {accentText}</span> : null}
      </h1>
    </div>
    </>
  );
}

export default Banner;