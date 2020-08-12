import React from 'react';
import NextApp from 'next/app';
import { Navbar, Theme, Footer, Grid, PodcastPlayerBar, PersistentVideoPlayer, Page, Analytics } from '../components';
import { Provider as ReduxProvider } from '../store';
import '../styles.css';

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ReduxProvider>
        <Grid.Provider>
          <Theme.Provider>
            <Page>
              <Analytics/>

              <Navbar/>
              <Component {...pageProps}/>
              <Footer/>

              <PodcastPlayerBar/>
              <PersistentVideoPlayer/>
            </Page>
          </Theme.Provider>
        </Grid.Provider>
      </ReduxProvider>
    );
  }
}


export default App;