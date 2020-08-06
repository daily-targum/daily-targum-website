import React, { useState, useEffect } from 'react';

import { useVisibility } from '../utils';
import Theme from './Theme';
import Grid from './Grid/web';

function Spinner() {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div 
      className='animation-preset-spin'
      style={styles.spinner}
    />
  )
}
 
export function ActivityIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let id = setTimeout(() => {
      setVisible(true);
    }, 500);
    return () => clearTimeout(id);
  });

  return !visible ? null : <Spinner />;
}

function ActivityIndicatorScreen() {
  let { colors } = Theme.useTheme();

  return (
    <Grid.Row style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      
      backgroundColor: colors.surface,
      zIndex: 500,
    }}>
      <ActivityIndicator />
    </Grid.Row>
  );
}

function ActivityIndicatorProgressiveLoader({
  onVisible
}: {
  onVisible: () => any
}) {
  const [isVisible, ref] = useVisibility<HTMLDivElement>();
  React.useEffect(() => {
    if (isVisible) onVisible();
  }, [onVisible, isVisible]);
  return (
    <div 
      ref={ref}
      style={{
        padding: 20,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Spinner />
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  spinner: {
    border: `4px solid rgba(0,0,0,0.1)`,
    borderTop: `4px solid ${theme.colors.text}`,
    borderRadius: '50%',
    width: 38,
    height: 38
  }
}));

ActivityIndicator.Screen = ActivityIndicatorScreen;
ActivityIndicator.ProgressiveLoader = ActivityIndicatorProgressiveLoader;