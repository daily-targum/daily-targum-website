import React, { useState, useEffect } from 'react';
import { styleHelpers } from '../utils';
import cn from 'classnames';

ActivityIndicator.Spinner = Spinner;
function Spinner({
  className,
  size = 30
}: {
  className?: string;
  size?: number;
}) {
  return (
    <>
      <div 
        className={cn(
          'spinner',
          className
        )}
      />
      <style jsx>
        {`
          .spinner {
            border: 3px solid rgba(0,0,0,0.1);
            border-top: 3px solid ${styleHelpers.color('text')};
            border-radius: 50%;
            width: ${size}px;
            height: ${size}px;
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

ActivityIndicator.Screen = ActivityIndicatorScreen;

export default ActivityIndicator;