import React from 'react';
import { Section, Text, Button, Link } from '../components';
import { nextUtils } from '../utils';
import { useRouter } from 'next/router';
import styles from './404.module.scss';
import pino from 'pino';
const logger = pino();

function NotFound() {
  const canGoBack = nextUtils.useCanGoBack();
  const router = useRouter();

  if (nextUtils.isServer()) {
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

  const isArticleScreen = router.pathname === '/article/[year]/[month]/[slug]';

  if (isArticleScreen) {
    return (
      <Section
        className={styles.section}
        classNameInside={styles.sectionInside}
      >
        <div className={styles.textWrap}>
          <Text variant='h1' htmlTag='h1'>Article Was Not Found.</Text>
          <Text variant='p'>Sorry for the inconvenience. We are in the process of fixing some missing articles. You can try accessing this article on our legacy website by clicking the button below. If you have any questions or concerns, please email <a href='mailto:eic@dailytargum.com'>eic@dailytargum.com</a>.</Text>
          <Text.Br/>
          <a href={`http://legacy.dailytargum.com${router.asPath}`}>
            <Button>
              Launch Legacy Website
            </Button>
          </a>
        </div>
      </Section>
    );
  }

  return (
    <Section 
      className={styles.section}
      classNameInside={styles.sectionInside}
    >
      <div className={styles.textWrap}>
        <Text variant='h1' htmlTag='h1'>404. Not found.</Text>
        <Text variant='p'>Sorry, but the page you were trying to view does not exist.</Text>
        {canGoBack ? (
          <Button onClick={() => router.back()}>
            Go Back
          </Button>
        ) : (
          <Link href='/'>
            <Button>
              Go to Home
            </Button>
          </Link>
        )}
        
      </div>
    </Section>
  );
}

export default NotFound;