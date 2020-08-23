import React from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import { nextUtils } from '../utils';

export function Analytics() {
  const router = useRouter();

  React.useEffect(() => {
    if (nextUtils.envIs(['production'])) {

      if (process.env.GOOGLE_ANALYTICS_TRACKING_ID !== undefined) {
        ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID);
      } else {
        console.warn("Failed to initialize Google Analytics. Check to make sure Tracking ID isn't missing.")
      }
    }

    else {
      console.log('Analytics Simulate: initialize')
    }
  }, []);

  React.useEffect(() => {
    if (nextUtils.envIs(['production'])) {
      ReactGA.pageview(router.asPath); 
    }

    else {
      console.log(`Analytics Simulate: pageView (${router.asPath})`)
    }
  }, [router.asPath]);

  return null;
}