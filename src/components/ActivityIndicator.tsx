import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Dots } from 'react-activity';
import { Grid, Theme } from '.';
import { useVisibility } from '../utils';
 
export function ActivityIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let id = setTimeout(() => {
      setVisible(true);
    }, 500);
    return () => clearTimeout(id);
  });

  return !visible ? null : <Dots />;
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
  // console.log(isVisible);
  return (
    <div 
      ref={ref}
      style={{
        padding: 20,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Dots />
    </div>
  );
}

ActivityIndicator.Screen = ActivityIndicatorScreen;
ActivityIndicator.ProgressiveLoader = ActivityIndicatorProgressiveLoader;