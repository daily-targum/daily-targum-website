import * as React from 'react';
import { actions, GetArticles } from '../../aws';
import { Section, Grid, ActivityIndicator, Card, Banner, SEOProps, Ad, Semantic, LoadMoreButton } from '../../components';
import { imgix, formatDateAbriviated } from '../../utils';
import { useRouter } from 'next/router';
import { useArticles } from '../../machines';
import styles from './inside-beat.module.scss';
import { theme, next } from '../../constants';

function Category({ 
  initialArticles
}: { 
  initialArticles: GetArticles
}) {
  const { articles, loadMore, loading } = useArticles({ 
    initialArticles,
    category: 'inside-beat'
  });

  const router = useRouter();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  return (
    <Section className={styles.page}>
      <Semantic role='main' pritable skipNavContent>
        <Banner 
          text='Inside'
          accentText='Beat'
          legacy
        />
      
        <Grid.Row spacing={theme.spacing(2.5)}>
          <Grid.Col xs={24} md={12}>
            <Card.StackedResponsive
              id={articles[0].id}
              // tag='Category'
              imageData={imgix(articles[0].media[0]?.url ?? '', {
                xs: imgix.presets.sm('1:1'),
                md: imgix.presets.md('2:1')
              })}
              title={articles[0].title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+articles[0].slug}
              aspectRatioDesktop={2 / 1}
              date={formatDateAbriviated(articles[0].publishDate)}
              author={articles[0].authors.map(a => a.displayName).join(', ')}
              altText={articles[0].media[0]?.altText ?? articles[0].media[0]?.description ?? undefined}
            />
          </Grid.Col>

          <Grid.Col xs={24} md={12}>
            <Card.StackedResponsive
              id={articles[1].id}
              // tag='Category'
              imageData={imgix(articles[1].media[0]?.url ?? '', {
                xs: imgix.presets.sm('1:1'),
                md: imgix.presets.md('2:1')
              })}
              title={articles[1].title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+articles[1].slug}
              aspectRatioDesktop={2 /1}
              date={formatDateAbriviated(articles[1].publishDate)}
              author={articles[1].authors.map(a => a.displayName).join(', ')}
              altText={articles[1].media[0]?.altText ?? articles[1].media[0]?.description ?? undefined}
            />
          </Grid.Col>

          <Grid.Col xs={24}>
            <Ad type='banner'/>
          </Grid.Col>

          {articles.slice(2).map(item => (
            <Grid.Col 
              key={item.id}
              xs={24}
              md={12}
              lg={8}
            >
              <Card.Compact
                id={item.id}
                // tag='Category'
                imageData={imgix(item.media[0]?.url ?? '', {
                  xs: imgix.presets.sm('1:1')
                })}
                title={item.title}
                href='/article/[year]/[month]/[slug]'
                as={'/'+item.slug}
                date={formatDateAbriviated(item.publishDate)}
                author={item.authors.map(a => a.displayName).join(', ')}
                altText={item.media[0]?.altText ?? item.media[0]?.description ?? undefined}
              />
            </Grid.Col>
          ))}
        </Grid.Row>
      </Semantic>

      <LoadMoreButton
        handleLoad={loadMore}
        loading={loading}
      />
    </Section>
  );
}

export async function getStaticProps() {
  const initialArticles = await actions.getArticles({
    category: 'inside-beat',
    limit: 50
  });

  const seo: SEOProps = {
    title: 'Inside Beat'
  };

  const firstArticle = initialArticles?.items?.[0].articles?.[0];
  if (firstArticle?.media?.[0]?.url) {
    seo.imageSrc = firstArticle.media[0].url;
  }
  
  return {
    props: {
      initialArticles: initialArticles ?? null,
      seo
    },
    revalidate: next.staticPropsRevalidateSeconds
  }
};

export default Category;