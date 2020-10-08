import React from 'react';
import { Video, Section, CardCols, Card, Grid, Divider, Text, Navbar, SEOProps, Semantic } from '../../components';
import { useSelector, useDispatch } from '../../store';
import { videoActions } from '../../store/ducks/video';
import { podcastActions } from '../../store/ducks/podcast';
import { imgix } from '../../utils';
import { InferGetStaticPropsType } from 'next';
import { actions } from '../../shared/src/client';
import { formatDateAbriviated, secondsToTimeCode } from '../../shared/src/utils';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import styles from './index.module.scss';
import { theme } from '../../constants';
import cn from 'classnames';

function Overlay({
  duration,
  playState,
  selected
}: {
  duration: number
  playState: string
  selected: boolean
}) {
  return (
    <div className={cn(styles.overlay, styles.showOnHover, 'showOnFocus')}>
      {(selected && playState !== 'stop') ? (
        playState === 'play' ? (
          <IoMdPause size={80} color='#fff'/>
        ) : (
          <IoMdPlay size={80} color='#fff'/>
        )
      ) : (
        <div className={styles.overlay}>
          <IoMdPlay size={80} color='#fff'/>
        </div>
      )}
      <Text className={styles.timeCode}>{secondsToTimeCode(duration)}</Text>
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
      className={cn(
        styles.backdrop,
        {
          ['dark-mode']: darkNavbar
        }
      )}
    >
      <div className={styles.page}>

        <Semantic role='main' pritable skipNavContent>
          <Section>
            <Video.Player slave={persist}/>

            <Video.Description/>

            <div className={styles.spacer}/>
            <Divider className={styles.divider}/>
            <div className={styles.spacer}/>
          </Section>

          {playlists.items.map(playlist => (
            <Section key={playlist.id}>
              
              <CardCols.Header
                title={playlist.title}
                href={`/videos/${playlist.slug}`}
              />

              <div className={styles.spacer}/>

              <Grid.Row spacing={theme.spacing(2)}>

                <CardCols items={playlist.media}>
                  {video => video ? (
                    <Card.Stacked
                      className={styles.videoCard}
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
        </Semantic>

      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const playlists = await actions.getPlaylists();

  const seo: SEOProps = {
    title: 'Videos'
  };

  return {
    props: {
      playlists,
      seo
    },
    revalidate: 60 // seconds
  }
};

export default Videos;