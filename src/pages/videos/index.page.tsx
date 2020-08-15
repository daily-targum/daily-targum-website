import React from 'react';
import { VideoPlayer, Section, Theme, CardCols, Grid, Divider, Text, Navbar } from '../../components';
import { useSelector, useDispatch } from '../../store';
import { videoActions } from '../../store/ducks/video';
import { styleHelpers } from '../../utils';
import { GetStaticProps } from 'next';

function Videos() {
  const dispatch = useDispatch();
  const src = useSelector(s => s.video.src);
  const playState = useSelector(s => s.video.playState);
  const persist = useSelector(s => s.video.persist);
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  Navbar.useDynamicHeader();

  React.useEffect(() => {
    dispatch(videoActions.setPersist(false));

    if (!src) {
      dispatch(videoActions.loadVideo('https://www.w3schools.com/html/mov_bbb.mp4'));
    }
    
    return () => {
      if (playState === 'play') {
        dispatch(videoActions.setPersist(true));
      }
    };
  }, [src, playState]);

  return (
    <div style={styles.backdrop}>
      <div style={styles.page}>

        <main>
          <Section>
            <VideoPlayer slave={persist}/>

            <div style={styles.spacer}/>
            <Divider style={styles.divider}/>
            <div style={styles.spacer}/>
          </Section>

          <Section>
            <Text variant='h2' style={styles.text} noPadding>Title</Text>
            <div style={styles.spacer}/>

            <Grid.Row spacing={theme.spacing(2)}>

              <CardCols items={[1,2,3,4]}>
                {() => (
                  <div 
                    style={{
                      backgroundColor: '#f00',
                      ...styleHelpers.aspectRatioFullWidth(16/9),
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      dispatch(videoActions.loadVideo('https://www.w3schools.com/tags/movie.mp4'));
                      dispatch(videoActions.setPlayState('play'))
                    }}
                  />
                )}
              </CardCols>

            </Grid.Row>
          </Section>
        </main>

      </div>
      <Divider style={styles.divider}/>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 // seconds
  }
};

const styleCreator = Theme.makeStyleCreator(theme => ({
  backdrop: {
    backgroundColor: theme.colors.primary.main
  },
  page: {
    ...styleHelpers.page(theme),
    backgroundColor: theme.colors.primary.main
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    // margin: theme.spacing(4, 0)
  },
  spacer: {
    height: theme.spacing(4)
  },
  text: {
    color: theme.colors.primary.contrastText
  }
}));

export default Videos;