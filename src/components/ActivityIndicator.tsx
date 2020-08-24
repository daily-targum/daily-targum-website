import React, { useState, useEffect } from 'react';

import { useVisibility } from '../utils';
import Theme from './Theme';

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
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        
        backgroundColor: colors.surface,
        zIndex: 500,
      }}
    >
      <ActivityIndicator />
    </div>
  );
}

function ActivityIndicatorProgressiveLoader({
  onVisible
}: {
  onVisible: () => any
}) {
  const [isVisible, ref] = useVisibility<HTMLDivElement>();
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (isVisible && !disabled) {
      setDisabled(true);

      onVisible();
      const id = setTimeout(() => {
        setDisabled(false);
      }, 1000);

      return () => {
        clearTimeout(id);
        setDisabled(false);
      };
    }
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
    border: `3px solid rgba(0,0,0,0.1)`,
    borderTop: `3px solid ${theme.colors.text}`,
    borderRadius: '50%',
    width: 30,
    height: 30
  }
}));

ActivityIndicator.Screen = ActivityIndicatorScreen;
ActivityIndicator.ProgressiveLoader = ActivityIndicatorProgressiveLoader;

export default ActivityIndicator;