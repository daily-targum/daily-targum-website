import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import { Section, Theme, Grid, ActivityIndicator, Card, CardCols, Banner, SEOProps } from '../../components';
import { styleHelpers, imgix } from '../../utils';
import { formatDateAbriviated } from '../../shared/src/utils';
import { useRouter } from 'next/router';
import { useArticles } from '../../machines';

function News({ 
  initialArticles
}: { 
  initialArticles: GetArticles
}) {
  const { articles, loadMore } = useArticles({ 
    initialArticles,
    category: 'inside-beat'
  });

  const router = useRouter();
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  return (
    <Section style={styles.page}>
      <Banner text='News'/>

      <Grid.Row spacing={theme.spacing(2.5)}>
        
        <CardCols 
          items={articles.slice(0,2)}
        >
          {article => {
            if (!article) {
              return null;
            }

            return (
              <Card.ImageResponsive
                id={article.id}
                title={article.title}
                imageData={imgix(article.media[0].url, {
                  xs: imgix.presets.sm('1:1'),
                  md: imgix.presets.lg('4:3')
                })}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article.slug}
                date={formatDateAbriviated(article.publishDate)}
                aspectRatioDesktop={16 / 9}
                author={article.authors.map(a => a.displayName).join(', ')}
              />
            );
          }}
        </CardCols>

        {articles.slice(2).map(item => (
          <Grid.Col 
            key={item.id}
            xs={24}
            md={12}
            lg={8}
          >
            <Card.StackedResponsive
              id={item.id}
              imageData={imgix(item.media[0].url, {
                xs: imgix.presets.sm('1:1'),
                md: imgix.presets.md('4:3')
              })}
              title={item.title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+item.slug}
              date={formatDateAbriviated(item.publishDate)}
              aspectRatioDesktop={16 / 9}
              author={item.authors.map(a => a.displayName).join(', ')}
            />
          </Grid.Col>
        ))}
      </Grid.Row>

      <ActivityIndicator.ProgressiveLoader 
        onVisible={loadMore}
      />
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    backgroundColor: theme.colors.surface,
    flex: 1
  }
}));

export async function getStaticProps() {
  const initialArticles = await actions.getArticles({
    category: 'News',
    limit: 20
  });

  const seo: SEOProps = {
    title: 'News'
  };

  const firstArticle = initialArticles?.items?.[0].articles?.[0];
  if (firstArticle) {
    seo.imageSrc = firstArticle.media?.[0].url;
  }

  return {
    props: {
      initialArticles: initialArticles ?? null,
      seo
    },
    revalidate: 60 // seconds
  }
};

export default News;