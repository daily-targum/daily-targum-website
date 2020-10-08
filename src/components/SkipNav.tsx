import React from 'react';
import styles from './SkipNav.module.scss';
import { useRouter } from 'next/router';
import ResetTabIndex from './ResetTabIndex';

export const ID = 'skip-nav';

function Link() {
  const router = useRouter();

  return (
    <>
      <ResetTabIndex id={router.asPath.replace(/#[^/]*$/, '')}/>
      <a href={`#${ID}`} className={styles.link}>
        Skip to content
      </a>
    </>
  );
}

function Content() {
  return (
    <a 
      id={ID}
      tabIndex={-1} 
    />
  )
}

export const SkipNav = {
  Link,
  Content
}