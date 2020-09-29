import React from 'react';
import styles from './Ad.module.scss';
import cn from 'classnames';
import { nextUtils } from '../utils';
// @ts-ignore
import { AdSlot } from 'react-dfp';

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
          [styles.dev]: !nextUtils.envIs(['production'])
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
    wrapStyle: styles.bannerWrap,
    style: '',
    adUnit: "isb_super-leaderboard_970x90",
    sizes: [ [300, 75], [970, 90] ],
    sizeMapping: [
      { viewport: [1350, 768], sizes: [[970, 90]] },
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
          adUnit={preset.adUnit}
          sizes={preset.sizes}
          sizeMapping={preset.sizeMapping}
        />
      </div>
    );
  }

  return null;
}

export default Ad;