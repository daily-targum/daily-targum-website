import React from 'react';
import { Section, Text, Button, Semantic } from '../components';
import { nextUtils } from '../utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './404.module.scss';
import pino from 'pino';
const logger = pino();

function NotFound() {
  const canGoBack = nextUtils.useCanGoBack();
  const router = useRouter();

  if (nextUtils.isServer() && router.asPath !== '/404') {
    const {
      route,
      pathname,
      query,
      asPath
    } = router;

    logger.info({
      route: {
        route,
        pathname,
        query,
        asPath
      },
      event: {
        tag: '404'
      }
    });
  }

  return (
    <Section 
      className={styles.section}
      classNameInside={styles.sectionInside}
    >
      <Semantic role='main' pritable skipNavContent>
        <div className={styles.textWrap}>
          <Text variant='h1' htmlTag='h1'>404. Not found.</Text>
          <Text variant='p'>Sorry, but the page you were trying to view does not exist.</Text>
          {canGoBack ? (
            <Button onClick={() => router.back()}>
              Go Back
            </Button>
          ) : (
            <Link href='/'>
              <a>
                <Button>
                  Go to Home
                </Button>
              </a>
            </Link>
          )}
          
        </div>
      </Semantic>
    </Section>
  );
}

export default NotFound;