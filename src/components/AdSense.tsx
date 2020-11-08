import React from 'react';
import cn from 'classnames';
import { nextUtils } from '../utils';
import Styles from './Ad.styles';
const { classNames, StyleSheet } = Styles;

interface AdBaseProps {
  style?: React.CSSProperties;
  className?: string;
  adClient: string;
  adSlot: string;
  height: number;
}

const AdBase = React.memo(({
  style,
  className,
  adClient,
  height
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
          [classNames.dev]: !nextUtils.envIs(['production'])
        }
      )}
      style={{
        display: 'flex',
        minHeight: height,
        height: height,
        maxHeight: height,
        ...style
      }}
      data-ad-client={adClient}
      data-ad-slot="1207418447"
    />
  )
}, () => true);

const presets = {
  sidebar: {
    height: 300,
    adClient: "ca-pub-5742802668542373",
    adSlot: "3541862442"
  }
}

function AdSense({
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
      <>
        <div 
          className={className}
          style={style}
        >
          <AdBase 
            height={preset.height}
            adClient={preset.adClient}
            adSlot={preset.adSlot}
          />
        </div>
        {StyleSheet}
      </>
    );
  }

  return null;
}

export default AdSense;