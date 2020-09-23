import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Section, Text, Grid, Card, ActivityIndicator, FlatList, SEOProps, Navbar } from '../../components';
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
        spacing={theme.spacing(2)}
      >
        <Grid.Col xs={24} md={6} lg={5}>
          <Text variant='h3'>Videos / {initialVideos.title}</Text>
        </Grid.Col>

        <Grid.Col xs={24} md={18} lg={14}>
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