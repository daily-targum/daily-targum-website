import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { Head, Main, NextScript } from 'next/document';
import { SEO } from '../components';
import { ReactChildren } from '../types';
import { StyleSheet } from 'react-context-theming/lib/web';
import { dom } from "@fortawesome/fontawesome-svg-core";

export default class MyDocument extends Document<{
  styleTags: ReactChildren
}> {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const seo = this.props.__NEXT_DATA__.props?.pageProps?.seo || {};
    return (
      <html>
        <Head>
          <StyleSheet/>
          {this.props.styleTags}
          <style type="text/css">{dom.css()}</style>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
          {/* <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet"></link> */}
          {/* <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet"></link> */}
          <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet"></link>
          <SEO {...seo} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
