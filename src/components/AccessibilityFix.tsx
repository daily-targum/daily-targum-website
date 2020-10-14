import * as React from 'react';
import { nextUtils } from '../utils';

export function AccessibilityFix() {
  const [enableOutline, setEnableOutline] = React.useState(true);
  const [enableTooltip, setEnableTooltip] = React.useState(true);

  React.useEffect(() => {
    if (nextUtils.isBrowser()) {

      function handleMousedown() {
        setEnableOutline(false);
      }
    
      function handleTouchstart() {
        setEnableTooltip(false);
      }

      function handleKeydown() {
        setEnableOutline(true);
      }

      document.addEventListener('mousedown', handleMousedown);
      document.addEventListener('touchstart', handleTouchstart);
      document.addEventListener('keydown', handleKeydown);

      return () => {
        document.removeEventListener('mousedown', handleMousedown);
        document.removeEventListener('touchstart', handleTouchstart);
        document.removeEventListener('keydown', handleKeydown);
      };
    }
    
  }, []);

  let computedStyles = '';

  if (!enableOutline) {
    computedStyles += ':focus{outline:0}::-moz-focus-inner{border:0;} [aria-label]:focus:after { opacity: 0; visibility: none; } ';
  }

  if (!enableTooltip) {
    computedStyles += '[aria-label]:after { display: none; } ';
  }

  return (
    <style jsx global>
      {computedStyles}
    </style>
  )
}