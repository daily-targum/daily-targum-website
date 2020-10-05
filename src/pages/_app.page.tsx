import React from 'react';
import { AppProps } from 'next/app';
import { Navbar, Footer, Grid, PodcastPlayerBar, Video, Page, Analytics, SEO, SkipNav, AccessibilityFix } from '../components';
import { Provider as ReduxProvider } from '../store';
import '../styles/global.scss';

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

  return (
    <>
      <SEO {...seo}/>
      <ReduxProvider>
        <Grid.Provider>
          <DFPSlotsProvider dfpNetworkId='13580645'>
            <AccessibilityFix/>
            <SkipNav.Link/>

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