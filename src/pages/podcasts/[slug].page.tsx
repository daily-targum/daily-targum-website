import * as React from 'react';
import { hyphenatedToCapitalized } from '../../shared/src/utils';
import { actions, GetPodcast } from '../../shared/src/client';
import { processNextQueryStringParam, imgix } from '../../utils';
import { GetStaticProps, GetStaticPaths } from 'next';
import { SEOProps } from '../../components/SEO';
import { Grid, AspectRatioImage, Section, Text, Button, Table, ActivityIndicator, Navbar } from '../../components';
import { useDispatch, useSelector } from '../../store';
import { podcastActions } from '../../store/ducks/podcast';
import { videoActions } from '../../store/ducks/video';
import dayjs from 'dayjs';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { useRouter } from 'next/router';
import NotFound from '../404.page';
import styles from './[slug].module.scss';
import { theme } from '../../constants';

function Podcast({
  podcast
} : {
  podcast: GetPodcast | undefined
}) {
  Navbar.useDynamicHeader();
  
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
      await dispatch(podcastActions.loadPodcast(id));
    } else if (!playingThisShow && firstEpisode !== undefined) {
      await dispatch(podcastActions.loadPodcast(firstEpisode.id));
    }

    if (playing) {
      dispatch(podcastActions.pause());
    } else {
      dispatch(podcastActions.play());
    }
  }

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (podcast === undefined || podcast.items.length === 0) {
    return <NotFound/>;
  }
  
  return (
    <div className={styles.page}>
      <Section className={styles.section}>
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
              className={styles.coverImage}
            />
          </Grid.Col>

          <Grid.Col 
            xs={2}
            md={1}
            style={{height: '100%'}}
          >
            <div className={styles.description}>
              <Text variant='h1'>{firstEpisode?.show ?? ''}</Text>
              <Text.Truncate 
                variant='p'
                numberOfLines={5}
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

      </Section>

      <Section className={styles.section}>

        <Table
          data={[
            ['', 'Title', 'Date', 'Duration'],
            ...(podcast?.items.map(item => (
              [item.id, item.title, dayjs(item.pubDate).format('MMM D, YYYY'), '30:00']
            )) ?? [])
          ]}
          widths={['50px']}
          keyExtractor={item => item}
          style={{width: '100%'}}
          colDisplay={[,,{xs: false, md: true}]}
          renderItem={(item, i, j) => {
            if(j === 0 && i !== 0) {
              return (
                <div className={styles.centerHorizontally}>
                  {(episodePlayingId === item && playing) ? (
                    <IoIosPause
                      onClick={() => dispatch(podcastActions.pause())}
                      size={24}
                    />
                  ) : (
                    <IoIosPlay
                      onClick={() => play(item)}
                      size={24}
                    />
                  )}
                </div>
              )
            }

            return (
              <span>{item}</span>
            );
          }}
        />

      </Section>
    </div>
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