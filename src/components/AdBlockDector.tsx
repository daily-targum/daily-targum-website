import React from 'react';
import { ReactChildren } from '../types';
import { nextUtils } from '../utils';

function AdBlockDector({
  children
}: {
  children: ReactChildren
}) {
  const [adsBlocked, setAdsBlocked] = React.useState(false);

  React.useEffect(() => {
    if (nextUtils.isBrowser()) {
      fetch("https://securepubads.g.doubleclick.net/tag/js/gpt.js")
      .catch(() => { 
        setAdsBlocked(true)
      });
    }
  }, []);

  React.useEffect(() => {
    if (nextUtils.isBrowser()) {
      
      const id = setInterval(() => {
        //@ts-ignore
        const adBlockDected = window?.googletag?.apiReady === undefined;

        if (adBlockDected !== adsBlocked) {
          setAdsBlocked(adBlockDected);
        }
      }, 5000);

      return () => {
        clearInterval(id);
      }
    }
  }, [adsBlocked]);

  return adsBlocked ? (
    <>
      {children}
    </>
  ) : null;
}

export default AdBlockDector;