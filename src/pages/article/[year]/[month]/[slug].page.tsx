import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { actions, GetArticle } from '../../../../shared/src/client';
import { SEOProps, Section, Grid, Text, Newsletter, Divider, Byline, Br, AspectRatioImage, ActivityIndicator, HTML, Ad, Sticky, SkipNav } from '../../../../components';

import NotFound from '../../../404.page';
import { imgix, processNextQueryStringParam } from '../../../../utils';
import { useRouter } from 'next/router';

import styles from './[slug].module.scss';
import { theme } from '../../../../constants';


function Article({
  article 
}: {
  article: GetArticle
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (!article) {
    return <NotFound/>;
  }

  const photoCredit = article.media[0]?.credits;
  const photoDescription = article.media[0]?.description ?? '';
  
  return (
    <>
      <Section.StickyContainer className={styles.page}>
      
        <Grid.Row 
          spacing={theme.spacing(4)}
          cols={[ '1fr', '300px' ]}
        >
          <Grid.Col xs={2} xl={1}>
            <main>
              <article>
                <SkipNav.Content/>
                <Text variant='h1' htmlTag='h1'>{article.title}</Text>
                <Byline.Authors 
                  authors={article.authors}
                  publishDate={article.publishDate}
                />
                <AspectRatioImage
                  aspectRatio={16 / 9}
                  data={imgix(article.media[0]?.url ?? '', {
                    xs: imgix.presets.md('16:9'),
                    md: imgix.presets.xl('16:9')
                  })}
                  altText={article.media[0]?.altText ?? article.media[0]?.description ?? undefined}
                />
                {photoCredit ? (
                  <Text className={styles.photoCredit}>
                    Photo by {photoCredit}
                  </Text>
                ) : null}
                {photoDescription ? (
                  <Text className={styles.photoCredit}>
                    {photoDescription}
                  </Text>
                ) : null}
                <Divider/>

                <Br/>
                <HTML 
                  ads
                  html={article.body} 
                />
              </article>
            </main>
          </Grid.Col>

          <Grid.Col xs={0} xl={1}>
            <Sticky>
              <Ad type='rectange' style={{ marginBottom: '1rem' }} />
              <Ad type='skyscraper' />
            </Sticky>
          </Grid.Col>

        </Grid.Row>

      </Section.StickyContainer>

      {/* <Divider/>
      <Section className={classes.page}>
        <Grid.Row 
          spacing={spacing(4)}
          cols={['165px', '1fr', '165px']}
        >
          <Grid.Col xs={3} md={0} lg={1}></Grid.Col>
          <Grid.Col>
            <Text variant='h2'>Comments</Text>
          </Grid.Col>
        </Grid.Row>
      </Section> */}

      <Divider/>
      <Newsletter.Section/>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const year = processNextQueryStringParam(ctx.params?.year, '');
  const month = processNextQueryStringParam(ctx.params?.month, '');
  const slug = processNextQueryStringParam(ctx.params?.slug, '');

  let article = null;
  try {
    article = await actions.getArticle({
      slug: `article/${year}/${month}/${slug}`
    });
  } catch(e) {}

  if (!article) {
    return {
      props: {},
      revalidate: 60 // seconds
    };
  }

  let seo: SEOProps = {
    pathname: `/article/${year}/${month}/${slug}`,
    title: article?.title,
    type: 'article'
  };

  if (article?.abstract) {
    seo.description = article.abstract;
  }

  if (article?.media[0]) {
    seo.imageSrc = article.media[0].url;
  }

  return {
    props: { 
      article: article ?? null,
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

export default Article;
