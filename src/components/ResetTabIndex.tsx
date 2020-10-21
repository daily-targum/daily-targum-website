import * as React from 'react';
import { ReactChild } from '../types';

export function ResetTabIndex({
  id, 
  bool = true
}: {
  id?: string;
  bool?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (bool && !firstRender.current) {
      ref.current?.focus();
      ref.current?.blur();
    }

    firstRender.current = false;
  }, [bool, id]);

  return (
    <div 
      ref={ref} 
      tabIndex={-1}
    />
  );
}

export function FocusControl({
  children,
  focus,
  onFocus,
  onMouseOver
}: {
  children: ReactChild;
  focus: boolean;
  onFocus?: ((event: React.FocusEvent<HTMLDivElement>) => void);
  onMouseOver?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (focus && ref.current) {
      try {
        // @ts-ignore
        ref.current.childNodes[0].focus();
      } catch(err) {
        console.warn('Failed to pull focus');
      }
    }
  }, [focus]);

  return (
    <div 
      ref={ref} 
      onFocus={onFocus}
      onMouseOver={onMouseOver}
    >
      {children}
    </div>
  );
}

export default ResetTabIndex;