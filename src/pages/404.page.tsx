import React from 'react';
import { Section, Theme, Text, Button } from '../components';
import { styleHelpers, nextUtils } from '../utils';
import { useRouter } from 'next/router';
import Link from 'next/link';

function NotFound() {
  const styles = Theme.useStyleCreator(styleCreator);
  const canGoBack = nextUtils.useCanGoBack();
  const router = useRouter();

  return (
    <Section 
      style={styles.section}
      styleInside={styles.sectionInside}
    >
      <div style={styles.textWrap}>
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

const styleCreator = Theme.makeStyleCreator(theme => ({
  section: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    flex: 1,
    justifyContent: 'center'
  },
  sectionInside: {
    ...styleHelpers.flex('column'),
    alignItems: 'center'
  },
  textWrap: {
    ...styleHelpers.flex('column'),
    alignItems: 'flex-start'
  }
}));

export default NotFound;