import React from 'react';
import cn from 'classnames';
import { nextUtils } from '../utils';
import { ReactChildren } from '../types';
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
    if(window && !nextUtils.envIs(['development'])) {
      setTimeout(() => {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 1000);
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
      data-ad-slot="8591084445"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}, () => true);

const presets = {
  sidebar: {
    height: 300,
    adClient: "ca-pub-5742802668542373",
    adSlot: "8591084445"
  }
}

function AdSense({
  type,
  className,
  style,
  fallback
}: {
  type: keyof typeof presets;
  className?: string;
  style?: React.CSSProperties;
  fallback?: ReactChildren
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [adBlocked, setAdBocked] = React.useState(false);

  const fallbackDefined = typeof fallback !== 'undefined';

  React.useEffect(() => {
    if (!adBlocked && fallbackDefined) {
      const id = setInterval(() => {
        if (ref.current && ref.current.clientHeight === 0) {
          setAdBocked(true);
        }
      }, 100);
  
      return () => {
        clearInterval(id);
      }
    }
  }, [adBlocked, fallbackDefined]);

  if (presets[type]) {
    const preset = presets[type];
    return (
      <>
        <div 
          ref={ref}
          className={className}
          style={style}
        >
          <AdBase 
            height={preset.height}
            adClient={preset.adClient}
            adSlot={preset.adSlot}
          />
        </div>
        {adBlocked ? fallback : null}
        {StyleSheet}
      </>
    );
  }

  return null;
}

export default AdSense;