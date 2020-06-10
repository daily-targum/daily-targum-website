import React from 'react';
import Theme from './Theme';

export function Divider() {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <div className={classes.divider}/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.divider
  }
}));

export default Divider;