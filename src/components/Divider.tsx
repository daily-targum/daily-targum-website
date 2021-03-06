import * as React from 'react';
import cn from 'classnames';
import Styles from './Divider.styles';
const { classNames, StyleSheet } = Styles;

export function Divider({
  className,
  style,
  vertical = false
}: {
  className?: string;
  style?: React.CSSProperties;
  vertical?: boolean;
}) {
  return (
    <>
      {vertical ? (
        <div
          className={cn(
            classNames.dividerVertical, 
            className
          )}
          style={style}
          aria-label='Vertical separator'
        />
      ) : (
        <hr 
          className={cn(
            classNames.divider, 
            className
          )}
          style={style}
        />
      )}
      {StyleSheet}
    </>
  );
}

function Vertical({
  className,
  style
}: {
  className?: string,
  style?: React.CSSProperties
}) {
  return (
    <>
      <div
        className={cn(
          classNames.dividerVertical, 
          className
        )}
        style={style}
        aria-label='Vertical separator'
      />
      {StyleSheet}
    </>
  );
}

Divider.Vertical = Vertical;
export default Divider;