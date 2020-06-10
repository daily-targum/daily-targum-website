import React from 'react';
import Router from "next/router";
import NextApp from 'next/app';
// @ts-ignore
import withGA from "next-ga";
import { Navbar, Theme, Footer, Grid } from '../components';
import '../styles.css';

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Grid.Provider>
        <Theme.Provider>
          <Navbar/>
          <Component {...pageProps}/>
          <Footer/>
        </Theme.Provider>
      </Grid.Provider>
    );
  }
}

export default withGA(process.env.GOOGLE_ANALYTICS_TRACKING_CODE, Router)(App);