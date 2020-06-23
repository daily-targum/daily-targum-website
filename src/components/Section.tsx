import React from 'react';
import { makeStyleCreator, useStyleCreatorClassNames } from './Theme'
import { ReactChildren, Theme } from '../types';
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
        <Grid.Col xs={24} xl='1150px' xxl='1350px'>
          {children}
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}

const styleCreator = makeStyleCreator(() => ({
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center',
    paddingRight: 'calc(5px + 0.5vw)',
    paddingLeft: 'calc(5px + 0.5vw)',
  },
  row: {
    width: '100%',
    justifyContent: 'center'
  }
}));

export const sectionStyle = {
  page: (theme: Theme) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6)
  })
}

Section.style = sectionStyle;
export default Section;