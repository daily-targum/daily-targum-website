import React from 'react';
import { Section, Theme, Text } from '../components';

function NotFound() {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Section className={classes.section}>
      <Text variant='h1' htmlTag='h1'>404. Not found.</Text>
      <Text variant='p'>Sorry, but the page you were trying to view does not exist.</Text>
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  section: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));

export default NotFound;