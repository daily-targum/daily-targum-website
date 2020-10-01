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
    // @ts-ignore
    if (nextUtils.isBrowser() && window?.googletag?.apiReady === undefined) {
      setAdsBlocked(true);
    }
  }, []);

  return adsBlocked ? (
    <>
      {children}
    </>
  ) : null;
}

export default AdBlockDector;