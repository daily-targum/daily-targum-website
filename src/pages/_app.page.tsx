import React from 'react';
import { AppProps } from 'next/app';
import { Navbar, Footer, Grid, PodcastPlayerBar, Video, Page, Analytics, SEO } from '../components';
import { Provider as ReduxProvider } from '../store';
import '../styles.css';

import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import getConfig from 'next/config'
// @ts-ignore
import { DFPSlotsProvider } from 'react-dfp';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig()
  const distDir = `${config?.serverRuntimeConfig?.rootDir ?? ''}/.next`
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename?.replace(distDir, 'app:///_next')
          return frame
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })
}

interface CustomAppProps extends AppProps {
  err: any
}

function App({
  Component, 
  pageProps, 
  err
}: CustomAppProps) {
  const seo = pageProps.seo ?? {};

  // React.useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     // @ts-ignore
  //     window.googletag = window.googletag || { cmd: [] };
  //     // @ts-ignore
  //     const googletag: any = window.googletag;

  //     googletag.cmd.push(function() {
  //       googletag.defineSlot('/13580645/isb_super-leaderboard_970x90', [970, 90], 'div-gpt-ad-1600300335641-0').addService(googletag.pubads());
  //       googletag.pubads().enableSingleRequest();
  //       googletag.enableServices();
  //     });
  //   }
  // }, []);

  return (
    <>
      <SEO {...seo}/>
      <ReduxProvider>
        <Grid.Provider>
          <DFPSlotsProvider dfpNetworkId='13580645'>
            <Page>
              <Analytics/>

              <Navbar/>
              <Component {...pageProps} err={err}/>
              <Footer/>

              <PodcastPlayerBar/>
              <Video.PersistentPlayer/>
            </Page>
          </DFPSlotsProvider>
        </Grid.Provider>
      </ReduxProvider>
    </>
  );

}

export default App;