import React from 'react';
import Section from './Section';
import Text from './Text';
import Theme from './Theme';
import Button from './Button';
import Link from './Link';

function NewsletterSection() {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();

  return (
    <Section className={cng(styles.section)}>
      <div className={cng(styles.inner)}>
        <Text variant='h1' className={cng(styles.text)}>Join our newsletter</Text>
        <Link href='http://eepurl.com/5lVdv'>
          <Button>Subscribe</Button>
        </Link>
      </div>
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  section: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    backgroundColor: theme.colors.surface
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  }
}));

export const Newsletter = {
  Section: NewsletterSection
}

export default Newsletter;