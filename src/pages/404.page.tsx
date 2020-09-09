import React from 'react';
import { Section, Text, Button } from '../components';
import { nextUtils } from '../utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './404.module.scss';

function NotFound() {
  const canGoBack = nextUtils.useCanGoBack();
  const router = useRouter();

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
            <a>
              <Button>
                Go to Home
              </Button>
            </a>
          </Link>
        )}
        
      </div>
    </Section>
  );
}

export default NotFound;