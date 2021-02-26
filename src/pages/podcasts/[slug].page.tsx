import * as React from 'react';
import { hyphenatedToCapitalized } from '../../utils';
import { actions, GetPodcast } from '../../aws';
import { processNextQueryStringParam, imgix } from '../../utils';
import { GetStaticProps, GetStaticPaths } from 'next';
import { SEOProps } from '../../components/SEO';
import { Grid, AspectRatioImage, Section, Text, Button, Table, ActivityIndicator, Semantic } from '../../components';
import { useDispatch, useSelector } from '../../store';
import { podcastActions } from '../../store/ducks/podcast';
import { videoActions } from '../../store/ducks/video';
import dayjs from 'dayjs';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { useRouter } from 'next/router';
import NotFound from '../404.page';
import { theme } from '../../constants';
import Styles from './[slug].styles';
const { classNames, StyleSheet } = Styles;

function Podcast({
  podcast,
  show
} : {
  podcast: GetPodcast | undefined
  show: string
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const firstEpisode = podcast?.items[0];

  const playing = useSelector(s => s.podcast.playState === 'play');
  const playingThisShow = useSelector(s => s.podcast.episode?.show === podcast?.items[0]?.show);
  const episodePlayingId = useSelector(s => s.podcast.episode?.id);

  React.useEffect(() => {
    dispatch(videoActions.setPlayState('pause'));
    dispatch(videoActions.setPersist(false));
    
    dispatch(podcastActions.setPersist(true));
  }, []);

  async function play(id?: string) {
    if (id && id !== episodePlayingId) {
      await dispatch(podcastActions.loadPodcast(show, id));
    } else if (!playingThisShow && firstEpisode !== undefined) {
      await dispatch(podcastActions.loadPodcast(show, firstEpisode.id));
    }
    dispatch(podcastActions.play());
  }

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (podcast === undefined || podcast.items.length === 0) {
    return <NotFound/>;
  }
  
  return (
    <>
      <div className={classNames.page}>
        <Semantic role='main' skipNavContent pritable>
          <Section className={classNames.section}>
            <Section.OffsetPadding>
              <Grid.Row
                cols={['250px', '1fr']}
                spacing={theme.spacing(2)}
              >

                <Grid.Col 
                  xs={2}
                  md={1}
                >
                  <AspectRatioImage
                    data={firstEpisode?.coverArt ? (
                      imgix(firstEpisode.coverArt, {
                        xs: imgix.presets.md('1:1'),
                        md: imgix.presets.sm('1:1')
                      })
                    ) : []}
                    aspectRatio={1}
                  />
                </Grid.Col>

                <Grid.Col 
                  xs={2}
                  md={1}
                  style={{height: '100%'}}
                >
                  <div className={classNames.description}>
                    <Text variant='h1'>{firstEpisode?.show ?? ''}</Text>
                    <Text.Truncate 
                      variant='p'
                      numberOfLines={4}
                    >
                      {firstEpisode?.description ?? ''}
                    </Text.Truncate>
                    <Button
                      onClick={() => play()}
                    >
                      {(playing && playingThisShow) ? 'Pause' : 'Play'}
                    </Button>
                  </div>
                </Grid.Col>

              </Grid.Row>
              </Section.OffsetPadding>         
            </Section>

            <Section className={classNames.section}>
              <Section.OffsetPadding>
                <Table
                  data={[
                    ['', 'Title', 'Date'],
                    ...(podcast?.items.map(item => (
                      [item.id, item.title, dayjs(item.pubDate).format('MMM D, YYYY')]
                    )) ?? [])
                  ]}
                  widths={['50px']}
                  keyExtractor={item => item}
                  style={{width: '100%'}}
                  colDisplay={[,,{xs: false, md: true}]}
                  renderItem={(item, i, j) => {
                    if(j === 0 && i !== 0) {
                      return (
                        <div className={classNames.centerHorizontally}>
                          <button
                            className={classNames.hideButton}
                            onClick={() => {
                              if (episodePlayingId === item && playing) {
                                dispatch(podcastActions.pause());
                              } else {
                                play(item);
                              }
                            }}
                          >
                            {(episodePlayingId === item && playing) ? (
                              <IoIosPause size={24}/>
                            ) : (
                              <IoIosPlay size={24}/>
                            )}
                          </button>
                        </div>
                      )
                    }

                    return (
                      <span>{item}</span>
                    );
                  }}
                />
              </Section.OffsetPadding>
          </Section>
        </Semantic>
      </div>
      {StyleSheet}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = processNextQueryStringParam(ctx.params?.slug, '');
  const show = hyphenatedToCapitalized(slug);

  const podcast = await actions.getPodcast({
    show 
  });

  const episode = podcast?.items[0];

  let seo: SEOProps = {
    pathname: `/podcast/${slug}`,
    title: show,
    type: 'podcast'
    // audioFile: episode.audioFile
  };

  if (episode?.description) {
    seo.description = episode.description;
  }

  return {
    props: { 
      podcast,
      show,
      seo
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () =>  {
  return {
    paths: [],
    fallback: true
  };
}

export default Podcast;