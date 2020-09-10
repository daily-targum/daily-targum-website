import React from 'react';
import styles from './Ad.module.scss';
import cn from 'classnames';
import { useRouter } from 'next/router';

function AdBase({
  style,
  className
}: {
  style?: React.CSSProperties;
  className?: string
}) {
  const router = useRouter();

  React.useEffect(() => {
    if(window) {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [router.asPath]);

  return (
    <ins 
      key={router.asPath}
      className={cn(
        className,
        'adsbygoogle'
      )}
      style={style}
      data-ad-client="ca-pub-5742802668542373"
      data-ad-slot="1207418447"
      data-adtest="on"
    />
  )
}

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