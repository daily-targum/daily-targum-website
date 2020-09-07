import React from 'react';
import styles from './Divider.module.scss';
import cn from 'classnames';

export function Divider({
  className,
  style
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div 
      className={cn(styles.divider, className)}
      style={style}
    />
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
    <div 
      className={cn(styles.dividerVertical, className)}
      style={style}
    />
  );
}

Divider.Vertical = Vertical;
export default Divider;