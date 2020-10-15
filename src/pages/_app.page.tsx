import React from 'react';
import { AppProps } from 'next/app';
import { Navbar, Footer, Grid, PodcastPlayerBar, Video, Page, Analytics, SEO, SkipNav, AccessibilityFix } from '../components';
import { Provider as ReduxProvider } from '../store';
import '../styles/global.scss';
import { styleHelpers } from '../utils';

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
      <GlobalStyles/>
    </>
  );

}

function GlobalStyles() {
  return (
    <style jsx global>
      {`
        :root {
          ${styleHelpers.lightTheme()}
        }
        
        .force-dark-mode {  
          ${styleHelpers.darkTheme()}
        }
        
        @media only screen {
          .dark-mode {
            ${styleHelpers.darkTheme()}
          }
        }


        html,
        body {
          padding: 0;
          margin: 0;
          color: var(--text-color);
          background-color: var(--colors-background_light);
        }

        *:focus .showOnFocus {
          opacity: 1;
        }

        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          -ms-user-drag: none;
          user-drag: none;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        span { 
          padding: 0;
          margin: 0;
        }

        a {
          color: var(--colors-accent_main);
        }

        table tr th,
        table tr td {
          text-align: left;
        }

        table tr th:last-child,
        table tr td:last-child {
          text-align: right;
        }

        table th {
          background-color: var(--background-color);
        }

        table th,
        table td {
          padding: 0;
        }

        table tr td {
          border-bottom: 1px solid var(--divider-color);
        }

        .hide-scrollbars::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbars {
          scrollbar-width: none;
          overflow: -moz-scrollbars-none;
        }

        [aria-label] {
          position: relative;
        }

        [aria-label][data-tooltip-position="right"]:after {
          left: 0px;
        }

        [aria-label][data-tooltip-position="none"]:after {
          display: none !important;
        }

        [aria-label][data-tooltip-position="left"]:after {
          right: 0px;
        }

        [aria-label][data-tooltip-position="center"]:after {
          top: 55%;
        }

        .hamburger-react:after {
          // Aria label position
          right: 0 !important;
          left: unset !important;
          content: '' !important;
          display: none !important;
        }

        [aria-label]:after {
          content: attr(aria-label);
          display: block;
          position: absolute;
          top: 110%;
          z-index: 5000;
          pointer-events: none;
          padding: 8px 10px;
          line-height: 15px;
          white-space: nowrap;
          text-decoration: none;
          text-indent: 0;
          overflow: visible;
          font-size: .9em;
          font-weight: normal;
          color: var(--colors-tooltip_contrastText);
          background-color: var(--colors-tooltip);
          -webkit-border-radius: 2px;
          border-radius: 2px;
          -webkit-box-shadow: 1px 2px 6px rgba(0,0,0,0.3);
          box-shadow: 1px 2px 6px rgba(0,0,0,0.3);
          visibility: hidden;
          opacity: 0;
          outline: none;
          outline-width: 0;
        }

        [aria-label]:focus:after {
          visibility: visible;
          opacity: 1;
        }

        [aria-label]:hover:after {
          visibility: visible !important;
          opacity: 1 !important;
          transition: opacity 250ms 600ms;
        }

        .accessibility-outline {
          outline: 1px dotted #212121;
          outline: 5px auto -webkit-focus-ring-color;
        }

        @media print {
          body * {
            visibility: hidden;
            height: 0;
          }
        }

        *[id] {
          scroll-margin-top: 65px;
        }
      `}
    </style>
  );
}

export default App;