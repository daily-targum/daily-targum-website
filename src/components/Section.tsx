import React from 'react';
import { makeStyleCreator, useStyleCreatorClassNames } from './Theme'
import { ReactChildren } from '../types';
import Grid from './Grid';

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
      <Grid.Row className={classes.row}>
        <Grid.Col xs={24} xl='1100px' xxl='1300px'>
          {children}
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}

const styleCreator = makeStyleCreator(theme => ({
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  row: {
    width: '100%',
    justifyContent: 'center'
  }
}));

export default Section;