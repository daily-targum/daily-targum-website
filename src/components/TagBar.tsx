import React from 'react';
import styles from './TagBar.module.scss';
import cn from 'classnames';

export function TagBar({
  tags,
  onChange,
  value,
  style
}: {
  tags: string[]
  onChange: (val: string | null) => any
  value: string | null
  style?: React.CSSProperties
}) {
  return (
    <div 
      className={styles.tagBar}
      style={style}
    >
      <button 
        className={cn(
          styles.tag,
          {
            [styles.tagSelected]: value === null
          }
        )}
        onClick={() => onChange(null)}
      > 
        all
      </button>

      {tags.map(tag => (
        <button 
          className={cn(
            styles.tag,
            {
              [styles.tagSelected]: tag === value
            }
          )}
          key={tag}
          onClick={() => {
            onChange(tag);
          }}
        >
          {tag.replace(/s-/g, "'s ")}
        </button>
      ))}
    </div>
  );
}