import React from 'react';
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import styles from './SkipNav.module.scss';
import { useRouter } from 'next/router';

function Link() {
  const router = useRouter();
  const ref = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    ref.current?.focus();
    ref.current?.blur();
  }, [router.asPath]);

  return (
    <>
      <a ref={ref} href='#focus-reset' tabIndex={-1}/>
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