import React, { useState, useEffect } from 'react';

import { useVisibility } from '../utils';

import styles from './ActivityIndicator.module.scss';

function Spinner() {
  return (
    <div 
      className={styles.spinner}
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
  return (
    <div className={styles.screen}>
      <ActivityIndicator />
    </div>
  );
}

function ActivityIndicatorProgressiveLoader({
  onVisible
}: {
  onVisible: () => any
}) {
  const [isVisible, ref] = useVisibility<HTMLDivElement>(2.5);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (isVisible && !disabled) {
      setDisabled(true);

      onVisible();
      const id = setTimeout(() => {
        setDisabled(false);
      }, 2000);

      return () => {
        clearTimeout(id);
        setDisabled(false);
      };
    }
  }, [onVisible, isVisible]);
  
  return (
    <div 
      ref={ref}
      className={styles.progressiveLoader}
    >
      <Spinner />
    </div>
  );
}

ActivityIndicator.Screen = ActivityIndicatorScreen;
ActivityIndicator.ProgressiveLoader = ActivityIndicatorProgressiveLoader;

export default ActivityIndicator;