import React from 'react';
import styles from './Ad.module.scss';
import cn from 'classnames';
import { nextUtils } from '../utils';

interface AdBaseProps {
  style?: React.CSSProperties;
  className?: string;
  id: string;
}

const AdBase = React.memo(({
  style,
  className,
  id
}: AdBaseProps) => {
  React.useEffect(() => {
    if(window) {
      // @ts-ignore
      googletag.cmd.push(function() { googletag.display(id); });
    }
  }, [id]);

  return (
    <ins
      id={id}
      className={cn(
        className,
        {
          [styles.dev]: nextUtils.envIs(['development'])
        }
      )}
      style={style}
    />
  )
}, () => true);

const presets = {
  banner: {
    wrapStyle: styles.bannerWrap,
    style: styles.banner,
    id: "div-gpt-ad-1600297989342-0"
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
          id={preset.id}
        />
      </div>
    );
  }

  return null;
}

export default Ad;