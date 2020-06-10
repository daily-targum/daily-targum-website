import React from 'react';
import Theme from './Theme';

export function Footer() {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <div className={classes.footer}>

    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  footer: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.primary
  }
}));

export default Footer;