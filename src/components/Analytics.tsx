import React from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import { nextUtils } from '../utils';

export function Analytics() {
  const router = useRouter();

  React.useEffect(() => {
    if (nextUtils.envIs(['production'])) {
      ReactGA.initialize('UA-000000-01');
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