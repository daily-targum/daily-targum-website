import React from 'react';
import { AppProps } from 'next/app';
import { Navbar, Theme, Footer, Grid, PodcastPlayerBar, Video, Page, Analytics } from '../components';
import { Provider as ReduxProvider } from '../store';
import '../styles.css';

import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import getConfig from 'next/config'

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig()
  const distDir = `${config?.serverRuntimeConfig?.rootDir ?? ''}/.next`
  Sentry.init({
    enabled: true || process.env.NODE_ENV === 'production',
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

  return (
    <ReduxProvider>
      <Grid.Provider>
        <Theme.Provider>
          <Page>
            <Analytics/>

            <Navbar/>
            <Component {...pageProps} err={err}/>
            <Footer/>

            <PodcastPlayerBar/>
            <Video.PersistentPlayer/>
          </Page>
        </Theme.Provider>
      </Grid.Provider>
    </ReduxProvider>
  );

}

export default App;