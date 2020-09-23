import React from 'react';
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import styles from './SkipNav.module.scss';
import { useRouter } from 'next/router';
import ResetTabIndex from './ResetTabIndex';

function Link() {
  const router = useRouter();

  return (
    <>
      <ResetTabIndex key={router.asPath}/>
      <SkipNavLink className={styles.link}/>
    </>
  );
}

function Content() {
  return (
    <SkipNavContent className={styles.content}/>
  )
}

export const SkipNav = {
  Link,
  Content
}