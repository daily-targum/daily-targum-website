import * as React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Section, Text, Grid, Card, ActivityIndicator, FlatList, SEOProps, Navbar, Semantic, Sticky, Ad, Divider, Donate } from '../../components';
import { actions, GetPlaylist } from '../../shared/src/client';
import { formatDateAbriviated } from '../../shared/src/utils';
import { processNextQueryStringParam, imgix } from '../../utils';
import NotFound from '../404.page';
import { useRouter } from 'next/router';
import { videoActions } from '../../store/ducks/video';
import { useDispatch } from '../../store';
import styles from './[playlist].module.scss';
import { theme } from '../../constants';

function Author({
  initialVideos
}: {
  initialVideos: GetPlaylist | null
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  Navbar.useDynamicHeader();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (!initialVideos) {
    return <NotFound/>;
  }

  return (
    <Section className={styles.page}>
      <Grid.Row 
        spacing={theme.spacing(4)}
        cols={[ '1fr', '1px', 'minmax(auto, 300px)' ]}
        disableGridOnPrit
      >
        <Grid.Col xs={3} md={1}>
          <Semantic role='main' pritable skipNavContent>
            <Text variant='h4'>Videos</Text>
            <Text variant='h1' htmlTag='h1'>{initialVideos.title}</Text>
            <Divider className={styles.divider}/>

            <FlatList
              data={initialVideos.media}
              keyExtractor={article => article.id}
              renderItem={video => (
                <Card.Compact
                  className={styles.articleCard}
                  title={video.title}
                  imageData={imgix(video.thumbnail ?? '', {
                    xs: imgix.presets.md('16:9')
                  })}
                  aspectRatio={16/9}
                  date={formatDateAbriviated(video.createdAt)}
                  onClick={() => {
                    dispatch(videoActions.loadVideo({
                      ...video,
                      src: video.url
                    }));
                    dispatch(videoActions.setPlayState('play'));
                    router.push('/videos');
                  }}
                />
              )}
              ItemSeparatorComponent={<Card.Spacer/>}
            />
            {/* <ActivityIndicator.ProgressiveLoader
              onVisible={loadMore}
            /> */}

          </Semantic>
        </Grid.Col>

        <Grid.Col xs={0} md={1} style={{height: '100%', overflow: 'hidden'}}>
          <Divider.Vertical/>
        </Grid.Col>

        <Grid.Col xs={0} md={1} style={{height: '100%'}}>
          <Sticky>
            <Ad   
              type='rectange' 
              style={{ marginBottom: '1rem' }} 
            />
            <Ad 
              type='skyscraper' 
              fallback={(
                <Donate.SidebarCard/>
              )}
            />
          </Sticky>
        </Grid.Col>

      </Grid.Row>
    </Section>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = processNextQueryStringParam(ctx.params?.playlist, '');

  const initialVideos = await actions.getPlaylist({
    slug
  });

  const seo: SEOProps = {
    title: initialVideos.title
  };

  const firstVideo = initialVideos?.media[0];
  if (firstVideo.thumbnail) {
    seo.imageSrc = firstVideo.thumbnail;
  }

  return {
    props: { 
      initialVideos: initialVideos ?? null,
      slug,
      seo
    },
    revalidate: 60 // seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () =>  {
  return {
    paths: [],
    fallback: true
  };
}

export default Author;