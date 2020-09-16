import React from 'react';
import { AppProps } from 'next/app';
import { Navbar, Footer, Grid, PodcastPlayerBar, Video, Page, Analytics, SEO } from '../components';
import { Provider as ReduxProvider } from '../store';
import '../styles.css';

import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import getConfig from 'next/config'

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

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.googletag = window.googletag || { cmd: [] };
      // @ts-ignore
      const googletag: any = window.googletag;

      googletag.cmd.push(function() {
        googletag.defineSlot('/13580645/rdt_mobile_leaderboard_320x50', [320, 50], 'div-gpt-ad-1600297989342-0').addService( googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
    }
  }, []);

  return (
    <>
      <SEO {...seo}/>
      <ReduxProvider>
        <Grid.Provider>
          <Page>
            <Analytics/>

            <Navbar/>
            <Component {...pageProps} err={err}/>
            <Footer/>

            <PodcastPlayerBar/>
            <Video.PersistentPlayer/>
          </Page>
        </Grid.Provider>
      </ReduxProvider>
    </>
  );

}

export default App;