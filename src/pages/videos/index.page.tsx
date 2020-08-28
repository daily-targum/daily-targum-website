import React from 'react';
import { Video, Section, Theme, CardCols, Card, Grid, Divider, Text, Navbar } from '../../components';
import { useSelector, useDispatch } from '../../store';
import { videoActions } from '../../store/ducks/video';
import { podcastActions } from '../../store/ducks/podcast';
import { styleHelpers, imgix } from '../../utils';
import { InferGetStaticPropsType } from 'next';
import { actions } from '../../shared/src/client';
import { formatDateAbriviated, secondsToTimeCode } from '../../shared/src/utils';
import { IoMdPause, IoMdPlay } from 'react-icons/io';

function Overlay({
  duration,
  playState,
  selected
}: {
  duration: number
  playState: string
  selected: boolean
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();

  return (
    <div style={styles.overlay}>
      {(selected && playState !== 'stop') ? (
        playState === 'play' ? (
          <IoMdPause size={80} color='#fff'/>
        ) : (
          <IoMdPlay size={80} color='#fff'/>
        )
      ) : (
        <div 
          style={styles.overlay} 
          className={cng(styles.showOnHover)}
        >
          <IoMdPlay size={80} color='#fff'/>
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
  const darkNavbar = useSelector(s => s.navigation.darkNavbar);
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

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }, [src])

  return (
    <div 
      style={styles.backdrop}
      className={darkNavbar ? 'dark-mode' : undefined}
    >
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
              
              <CardCols.Header
                title={playlist.title}
                href={`/videos/${playlist.slug}`}
              />

              <div style={styles.spacer}/>

              <Grid.Row spacing={theme.spacing(2)}>

                <CardCols items={playlist.media}>
                  {video => video ? (
                    <Card.Stacked
                      imageData={imgix(video.thumbnail, {
                        xs: imgix.presets.md('16:9')
                      })}
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
                          playState={playState}
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
    flex: 1
  },
  page: {
    ...styleHelpers.page(theme)
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    // margin: theme.spacing(4, 0)
  },
  spacer: {
    height: theme.spacing(4)
  },
  text: {
    color: theme.colors.text
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