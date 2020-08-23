import React from 'react';
import Theme from './Theme';
import { styleHelpers } from '../utils';

export function Banner({
  text,
  accentText
}: {
  text: string
  accentText?: string
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div style={styles.logoWrap}>
      <span style={styles.logo}>
        {text}
        {accentText ? <span style={styles.logoAccent}> {accentText}</span> : null}
      </span>
    </div>
  );
}


const styleCreator = Theme.makeStyleCreator(theme => ({
  logoWrap: {
    ...styleHelpers.card(theme),
    backgroundColor: theme.colors.primary.main,
    padding: theme.spacing(2),
    margin: theme.spacing(0, 0, 2),
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    textTransform: 'uppercase',
    fontWeight: 900,
    fontSize: 'calc(32px + 2vw)',
    textAlign: 'center',
    color: '#fff'
  },
  logoAccent: {
    color: theme.colors.accent,
    display: 'inline'
  }
}));

export default Banner;