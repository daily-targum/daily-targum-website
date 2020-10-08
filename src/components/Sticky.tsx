import { Sticky as StickyDefault } from 'react-sticky';
import { ReactChildren } from '../types';

function offsetType(top: string | number | undefined, offset: number) {
  if (typeof top === 'number') {
    return top + offset;
  }

  if (typeof top === 'string') {
    return `calc(${top} + ${offset}px)`
  }

  return 0;
}

export function Sticky({
  children
}: {
  children: ReactChildren
}) {
  return (
    <StickyDefault topOffset={-82} bottomOffset={82}>
      {({ style }) => (
        <div 
          style={{
            ...style,
            top: offsetType(style.top, 82)
          } as any}
        >
        {children}
        </div>
      )}
    </StickyDefault>
  )
}