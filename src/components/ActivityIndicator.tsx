import React, { useState, useEffect } from 'react';
import { useVisibility, styleHelpers } from '../utils';

ActivityIndicator.Spinner = Spinner;
function Spinner() {
  return (
    <>
      <div 
        className='spinner'
      />
      <style jsx>
        {`
          .spinner {
            border: 3px solid rgba(0,0,0,0.1);
            border-top: 3px solid ${styleHelpers.color('text')};
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  )
}
 
export function ActivityIndicator({
  delay = 500
}: {
  delay?: number
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let id = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(id);
  }, [delay]);

  return !visible ? null : <Spinner />;
}

function ActivityIndicatorScreen({
  delay = 500
}: {
  delay?: number
}) {
  return (
    <>
      <div className='screen'>
        <ActivityIndicator 
          delay={delay} 
        />
      </div>
      <style jsx>
        {`
          .screen {
            display: flex;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            justify-content: center;
            align-items: center;
            background-color: ${styleHelpers.color('surface')};
            z-index: 500;
          }
        `}
      </style>
    </>
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
    <>
      <div 
        ref={ref}
        className='progressiveLoader'
      >
        <Spinner />
      </div>
      <style jsx>
        {`
          .progressiveLoader {
            padding: 20px;
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
}

ActivityIndicator.Screen = ActivityIndicatorScreen;
ActivityIndicator.ProgressiveLoader = ActivityIndicatorProgressiveLoader;

export default ActivityIndicator;