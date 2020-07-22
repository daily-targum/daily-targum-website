import React from 'react';
import Router from "next/router";
import NextApp from 'next/app';
// @ts-ignore
import withGA from "next-ga";
import { Navbar, Theme, Footer, Grid, PodcastPlayerBar } from '../components';
import { Provider as ReduxProvider } from '../store';
import '../styles.css';
import 'react-activity/dist/react-activity.css';

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ReduxProvider>
        <Grid.Provider>
          <Theme.Provider>
            <Navbar/>
            <Component {...pageProps}/>
            <Footer/>
            <PodcastPlayerBar/>
          </Theme.Provider>
        </Grid.Provider>
      </ReduxProvider>
    );
  }
}

export default withGA(process.env.GOOGLE_ANALYTICS_TRACKING_CODE, Router)(App);