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
    <div className={styles.logoWrap}>
      <span className={styles.logo}>
        {text}
        {accentText ? <span className={styles.logoAccent}> {accentText}</span> : null}
      </span>
    </div>
  );
}

export default Banner;