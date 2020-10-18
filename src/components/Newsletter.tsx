import React from 'react';
import Section from './Section';
import Text from './Text';
import Button from './Button';
import Styles from './Newsletter.styles';
const { classNames, StyleSheet } = Styles;

function NewsletterSection() {
  return (
    <>
      <Section className={classNames.section}>
        <div className={classNames.inner}>
          <Text variant='h1' className={classNames.text}>Join our newsletter</Text>
          <Button href='http://eepurl.com/5lVdv'>
            Subscribe
          </Button>
        </div>
      </Section>
      {StyleSheet}
    </>
  );
}

export const Newsletter = {
  Section: NewsletterSection
}

export default Newsletter;