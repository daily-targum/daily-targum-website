import * as React from 'react';
import cn from 'classnames';
import { nextUtils } from '../utils';
// @ts-ignore
import { AdSlot } from 'react-dfp';
import Styles from './Ad.styles';
import { ReactChildren } from '../types';
const { classNames, StyleSheet } = Styles;

type SizeMapping = { viewport: [number, number], sizes: [number, number][] }[];

interface AdBaseProps {
  className?: string;
  adUnit: string;
  sizes: [number, number][];
  sizeMapping?: SizeMapping
}

const AdBase = React.memo(({
  className,
  adUnit,
  sizes,
  sizeMapping
}: AdBaseProps) => {
  return (
    <AdSlot 
      adUnit={adUnit}
      sizes={sizes} 
      sizeMapping={sizeMapping}
      className={cn(
        className,
        {
          [classNames.dev]: !nextUtils.envIs(['production'])
        }
      )}
    />
  )
}, () => true);

const presets: {
  [key: string]: {
    wrapStyle: string;
    style: string;
    adUnit: string;
    sizes: [number, number][],
    sizeMapping?: SizeMapping
  }
} = {
  banner: {
    wrapStyle: classNames.bannerWrap,
    style: '',
    adUnit: "isb_super-leaderboard_970x90",
    sizes: [ [300, 75], [970, 90] ],
    sizeMapping: [
      { viewport: [1020, 768], sizes: [[970, 90]] },
      { viewport: [0, 0], sizes: [[300, 75]] },
    ]
  },
  rectange: {
    wrapStyle: '',
    style: '',
    adUnit: "isb_rectangle_one_300x250",
    sizes: [ [300, 250] ]
  },
  skyscraper: {
    wrapStyle: '',
    style: '',
    adUnit: 'isb_rectangle_half-page_300x600',
    sizes: [ [300, 600] ]
  }
};

function Ad({
  type,
  className,
  style,
  priority = 1,
  fallback
}: {
  type: keyof typeof presets;
  className?: string;
  style?: React.CSSProperties;
  priority?: number,
  fallback?: ReactChildren
}) {
  const [visible, setVisible] = React.useState(priority === 1);
  const ref = React.useRef<HTMLDivElement>(null);
  const [adBlocked, setAdBocked] = React.useState(false);

  const fallbackDefined = typeof fallback !== 'undefined';

  React.useEffect(() => {
    if (!visible) {
      const id = setTimeout(() => {
        setVisible(true);
      }, 20 * priority);

      return () => {
        clearTimeout(id);
      };
    }
  }, [visible, priority]);

  // React.useEffect(() => {
  //   if (nextUtils.isBrowser() && fallbackDefined) {
  //     fetch("//securepubads.g.doubleclick.net")
  //     .catch(() => { 
  //       setAdBocked(true);
  //     });
  //   }
  // }, [fallbackDefined]);

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

  if (visible && presets[type]) {
    const preset = presets[type];
    return (
      <>
        <div 
          ref={ref}
          className={cn(
            className,
            preset.wrapStyle
          )}
          style={style}
        >
          <AdBase 
            className={preset.style}
            adUnit={preset.adUnit}
            sizes={preset.sizes}
            sizeMapping={preset.sizeMapping}
          />
        </div>
        {StyleSheet}
        {adBlocked ? fallback : null}
      </>
    );
  }

  return null;
}

export default Ad;