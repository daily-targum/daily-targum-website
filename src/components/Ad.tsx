import React from 'react';
import styles from './Ad.module.scss';
import cn from 'classnames';

const AdBase = React.memo(({
  style,
  className
}: {
  style?: React.CSSProperties;
  className?: string
}) => {
  React.useEffect(() => {
    if(window) {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      className={cn(
        className,
        'adsbygoogle'
      )}
      style={style}
      data-ad-client="ca-pub-5742802668542373"
      data-ad-slot="1207418447"
    />
  )
}, () => true)

function Ad({
  type,
  className
}: {
  type: 'banner';
  className?: string
}) {
  if (type === 'banner') {
    return (
      <div 
        className={cn(
          className,
          styles.bannerWrap
        )}
      >
        <AdBase className={styles.banner}/>
      </div>
    );
  }

  return null;
}

export default Ad;