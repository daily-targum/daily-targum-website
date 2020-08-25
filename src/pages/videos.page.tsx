import React from 'react';
import { Video, Section, Theme, CardCols, Card, Grid, Divider, Text, Navbar } from '../components';
import { useSelector, useDispatch } from '../store';
import { videoActions } from '../store/ducks/video';
import { podcastActions } from '../store/ducks/podcast';
import { styleHelpers, imgix } from '../utils';
import { InferGetStaticPropsType } from 'next';
import { actions } from '../shared/src/client';
import { formatDateAbriviated, secondsToTimeCode } from '../shared/src/utils';
import { IoMdPause, IoMdPlay } from 'react-icons/io';

function Overlay({
  duration,
  playing,
  selected
}: {
  duration: number
  playing: boolean
  selected: boolean
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();

  return (
    <div style={styles.overlay}>
      {selected ? (
        playing ? (
          <IoMdPause size={45} color='#fff'/>
        ) : (
          <IoMdPlay size={45} color='#fff'/>
        )
      ) : (
        <div 
          style={styles.overlay} 
          className={cng(styles.showOnHover)}
        >
          <IoMdPlay size={45} color='#fff'/>
        </div>
      )}
      <Text style={styles.timeCode}>{secondsToTimeCode(duration)}</Text>
    </div>
  );
}

function Videos({
  playlists
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const dispatch = useDispatch();
  const playState = useSelector(s => s.video.playState);
  const persist = useSelector(s => s.video.persist);
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  const src = useSelector(s => s.video.src);

  Navbar.useDynamicHeader();

  React.useEffect(() => {
    dispatch(podcastActions.pause());
    dispatch(podcastActions.setPersist(false));
  }, []);

  React.useEffect(() => {
    dispatch(videoActions.setPersist(false));

    if (!src) {
      const media = playlists.items[0].media[0];
      dispatch(videoActions.loadVideo({
        ...media,
        src: media.url
      }));
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
            <Video.Player slave={persist}/>

            <Video.Description/>

            <div style={styles.spacer}/>
            <Divider style={styles.divider}/>
            <div style={styles.spacer}/>
          </Section>

          {playlists.items.map(playlist => (
            <Section key={playlist.id}>
              <Text variant='h2' style={styles.text} noPadding>{playlist.title}</Text>
              <div style={styles.spacer}/>

              <Grid.Row spacing={theme.spacing(2)}>

                <CardCols items={playlist.media}>
                  {video => video ? (
                    <Card.Stacked
                      imageData={imgix(video.thumbnail, {
                        xs: imgix.presets.md('16:9')
                      })}
                      dark={true}
                      aspectRatio={16/9}
                      title={video.title}
                      date={formatDateAbriviated(video.createdAt)}
                      onClick={() => {
                        if (src === video.url) {
                          if (playState === 'play') {
                            dispatch(videoActions.setPlayState('pause'));
                          } else {
                            dispatch(videoActions.setPlayState('play'));
                          }
                        }

                        else {
                          dispatch(videoActions.loadVideo({
                            ...video,
                            src: video.url
                          }));
                          dispatch(videoActions.setPlayState('play'));
                        }
                      }}
                      Overlay={
                        <Overlay
                          duration={video.duration}
                          playing={playState === 'play'}
                          selected={src === video.url}
                        />
                      }
                    />
                  ) : null}
                </CardCols>

              </Grid.Row>
            </Section>
          ))}
        </main>

      </div>
      <Divider style={styles.divider}/>
    </div>
  );
}

export const getStaticProps = async () => {
  const playlists = await actions.getPlaylists();

  return {
    props: {
      playlists
    },
    revalidate: 60 // seconds
  }
};

const styleCreator = Theme.makeStyleCreator(theme => ({
  backdrop: {
    backgroundColor: theme.colors.primary.main,
    flex: 1
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
  },
  timeCode: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.colors.primary.contrastText,
    padding: theme.spacing(1),
    backgroundColor: theme.colors.primary.main,
    borderRadius: theme.roundness(1),
    fontSize: '0.8rem',
    opacity: 0.8
  },
  overlay: {
    ...styleHelpers.absoluteFill(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  showOnHover: {
    opacity: 0,
    transition: `opacity ${theme.timing(0.5)}`,
    ':hover': {
      opacity: 1
    }
  }
}));

export default Videos;