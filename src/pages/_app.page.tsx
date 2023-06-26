import * as React from "react";
import { AppProps } from "next/app";
import {
  Navbar,
  Footer,
  ScrollFix,
  Grid,
  // PodcastPlayerBar,
  Video,
  Page,
  Analytics,
  SEO,
  SkipNav,
  AccessibilityFix,
  GlobalCSS,
  //Text,
  //Button,
  //Flytedigita,
} from "../components";
import { Provider as ReduxProvider } from "../store";
import "../styles/global.scss";
import Head from "next/head";
import { useAmp } from "next/amp";

import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import getConfig from "next/config";
// @ts-ignore
import { DFPSlotsProvider } from "react-dfp";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig();
  const distDir = `${config?.serverRuntimeConfig?.rootDir ?? ""}/.next`;
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename?.replace(distDir, "app:///_next");
          return frame;
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

interface CustomAppProps extends AppProps {
  err: any;
}

function App({ Component, pageProps, err }: CustomAppProps) {
  const isAmp = useAmp();
  //const seo = pageProps.seo ?? {};
  const seo = {};

  return (
    <>
      <Head>
        {isAmp ? null : (
          <>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
            />
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `(function Test (w, d, s, p)
 { 
   let f = d.getElementsByTagName(s)[0], j = d.createElement(s);
    j.id = 'flytedigital'; 
    j.async = true; 
    j.src = 'https://digital.flytedesk.com/js/head.js#' + p;
    f.parentNode.insertBefore(j, f); })(window, document, 'script', '8b83117d-b1ed-4002-8206-2a3de6cc5e32')`,
              }}
            />
          </>
        )}
      </Head>
      <ScrollFix />
      <SEO {...seo} />
      <ReduxProvider>
        <Grid.Provider>
          <DFPSlotsProvider dfpNetworkId="13580645">
            <AccessibilityFix />
            <SkipNav.Link />

            <Page>
              <Analytics />
              <Navbar />
              <Component {...pageProps} err={err} />
              <Footer />

              <Video.PersistentPlayer />
            </Page>
          </DFPSlotsProvider>
        </Grid.Provider>
      </ReduxProvider>
      <GlobalCSS />
      <GlobalCSS.Vars />
    </>
  );
}

export default App;
