import React from 'react';
import { useRouter } from 'next/router';
import ResetTabIndex from './ResetTabIndex';
import Styles from './SkipNav.styles';
const { classNames, StyleSheet } = Styles;

export const ID = 'skip-nav';

function Link() {
  const router = useRouter();

  return (
    <>
      <ResetTabIndex id={router.asPath.replace(/#[^/]*$/, '')}/>
      <a href={`#${ID}`} className={classNames.link}>
        Skip to content
      </a>
      {StyleSheet}
    </>
  );
}

function Content() {
  return (
    <>
      <a 
        id={ID}
        tabIndex={-1} 
      />
      {StyleSheet}
    </>
  )
}

export const SkipNav = {
  Link,
  Content
}