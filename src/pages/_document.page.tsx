import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { SEO } from '../components';
import { ReactChildren } from '../types';

export default class MyDocument extends Document<{
  styleTags: ReactChildren
}> {
  render() {
    const seo = this.props.__NEXT_DATA__.props?.pageProps?.seo || {};
    return (
      <html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
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