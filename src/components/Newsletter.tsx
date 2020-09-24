import React from 'react';
import Section from './Section';
import Text from './Text';
import Button from './Button';
import styles from './Newsletter.module.scss';

function NewsletterSection() {
  return (
    <Section className={styles.section}>
      <div className={styles.inner}>
        <Text variant='h1' className={styles.text}>Join our newsletter</Text>
        <Button href='http://eepurl.com/5lVdv'>
          Subscribe
        </Button>
      </div>
    </Section>
  );
}

export const Newsletter = {
  Section: NewsletterSection
}

export default Newsletter;