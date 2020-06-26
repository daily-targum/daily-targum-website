import React from 'react';
import Theme from './Theme';

export function Divider({
  className
}: {
  className?: string
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <div className={[className, classes.divider].join(' ')}/>
  );
}

function Vertical({
  className
}: {
  className: string
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <div className={[className, classes.dividerVertical].join(' ')}/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.divider
  },
  dividerVertical: {
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.divider
  }
}));

Divider.Vertical = Vertical;
export default Divider;