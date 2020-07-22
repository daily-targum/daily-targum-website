import React from 'react';
import { makeStyleCreator, useStyleCreatorClassNames } from './Theme'
import { ReactChildren } from '../types';

export function Section({
  children,
  className,
  style,
}: {
  children: ReactChildren,
  className?: string,
  style?: React.CSSProperties,
}) {
  const classes = useStyleCreatorClassNames(styleCreator);
  return (
    <div style={style} className={[className, classes.section].join(' ')}>
      <div className={classes.inside}>
        {children}
      </div>
    </div>
  );
}

const styleCreator = makeStyleCreator(theme => ({
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  inside: {
    width: 'max(1100px, 80vw)',
    maxWidth: '100%'
  }
}));

export default Section;