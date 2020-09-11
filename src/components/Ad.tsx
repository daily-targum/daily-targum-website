import React from 'react';
import styles from './Ad.module.scss';
import cn from 'classnames';
import { nextUtils } from '../utils';

interface AdBaseProps {
  style?: React.CSSProperties;
  className?: string;
  adClient: string;
  adSlot: string;
}

const AdBase = React.memo(({
  style,
  className,
  adClient
}: AdBaseProps) => {
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
        'adsbygoogle',
        {
          [styles.dev]: nextUtils.envIs(['development'])
        }
      )}
      style={style}
      data-ad-client={adClient}
      data-ad-slot="1207418447"
    />
  )
}, () => true);

const presets = {
  banner: {
    wrapStyle: styles.bannerWrap,
    style: styles.banner,
    adClient: "ca-pub-5742802668542373",
    adSlot: "1207418447"
  }
}

function Ad({
  type,
  className,
  style
}: {
  type: keyof typeof presets;
  className?: string;
  style?: React.CSSProperties
}) {
  if (presets[type]) {
    const preset = presets[type];
    return (
      <div 
        className={cn(
          className,
          preset.wrapStyle
        )}
        style={style}
      >
        <AdBase 
          className={preset.style}
          adClient={preset.adClient}
          adSlot={preset.adSlot}
        />
      </div>
    );
  }

  return null;
}

export default Ad;