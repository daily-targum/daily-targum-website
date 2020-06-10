import React from 'react';
import Section from './Section';
import Text from './Text';
import Theme from './Theme';
import Button from './Button';

function NewsletterSection() {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Section className={classes.section}>
      <div className={classes.inner}>
        <Text variant='h1' className={classes.text}>Join our newsletter</Text>
        <Button>Subscribe</Button>
      </div>
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  section: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10)
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