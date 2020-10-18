import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { actions, GetArticle } from '../../../../shared/src/client';
import { hyphenatedToCapitalized, extractTextFromHTML } from '../../../../shared/src/utils';
import { SEOProps, Section, Grid, Text, Newsletter, Divider, Byline, AspectRatioImage, ActivityIndicator, HTML, Ad, Sticky, Semantic, AdBlockDector, Donate, Link } from '../../../../components';

import NotFound from '../../../404.page';
import { imgix, processNextQueryStringParam } from '../../../../utils';
import { useRouter } from 'next/router';

import { theme } from '../../../../constants';
import Styles from './[slug].styles';
const { classNames, StyleSheet } = Styles;


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
  const photoDescription = extractTextFromHTML(article.media[0]?.description ?? '');
  
  return (
    <>
      <Section.StickyContainer className={classNames.page}>
      
        <Grid.Row 
          spacing={theme.spacing(4)}
          cols={[ '1fr', '1px', 'minmax(auto, 300px)' ]}
          disableGridOnPrit
        >
          <Grid.Col xs={3} xl={1}>
            <Semantic role='main' skipNavContent pritable>
              <Link 
                className={classNames.category}
                href={`/section/${article.category.toLowerCase()}`}
              >
                {hyphenatedToCapitalized(article.category)}
              </Link>
              <Semantic role='article'>
                <header>
                  <Text 
                    variant='h1' 
                    htmlTag='h1'
                    className={classNames.title}
                  >
                    {article.title}
                  </Text>
                  
                  <Byline.Authors 
                    authors={article.authors}
                    publishDate={article.publishDate}
                  />

                  {article.media[0]?.url ? (
                     <figure className={classNames.fullWidth}>
                      <Section.OffsetPadding className={classNames.photoWrap}>
                        <AspectRatioImage
                          aspectRatio={16 / 9}
                          data={imgix(article.media[0].url, {
                            xs: imgix.presets.md('16:9'),
                            md: imgix.presets.xl('16:9')
                          })}
                          altText={`${photoDescription} – Photo by ${photoCredit}`}
                        />
                      </Section.OffsetPadding>
                      <figcaption className={classNames.figcaption} aria-hidden={true}>
                        Photo by {photoCredit}
                        <div className={classNames.captionSpacer}/>
                        {photoDescription}
                      </figcaption>
                    </figure>
                  ) : null}
                </header>

                <Divider className={classNames.divider}/>

                <HTML html={article.body} />
              </Semantic>
            </Semantic>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{height: '100%', overflow: 'hidden'}}>
            <Divider.Vertical/>
          </Grid.Col>

          <Grid.Col xs={0} xl={1}>
            <Sticky>
              <Semantic role='aside'>
                <Ad type='rectange' style={{ marginBottom: '1rem' }} />
                <Ad type='skyscraper' />
                <AdBlockDector>
                  <Donate.SidebarCard/>
                </AdBlockDector>
              </Semantic>
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

      {StyleSheet}
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

  const pathname = `/article/${year}/${month}/${slug}`;
  const preferedSlug = `/${article.slug}`;

  const keywords = [
    ...(article.tags ?? []),
    article.category
  ].join(', ');

  let seo: SEOProps = {
    pathname: preferedSlug,
    title: article?.title,
    type: 'article',
    author: article?.authors.map(author => author.displayName).join(', '),
    keywords
  };

  if (article?.abstract) {
    seo.description = article.abstract;
  }

  if (article?.media[0]) {
    seo.imageSrc = article.media[0].url;
  }

  if (pathname !== preferedSlug) {
    seo.canonical = preferedSlug;
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
    // fallback: true
    fallback: 'unstable_blocking'
  };
}

export const config = { amp: 'hybrid' }

export default Article;
