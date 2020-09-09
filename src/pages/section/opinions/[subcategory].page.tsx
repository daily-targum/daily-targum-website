import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Section, Text, Grid, Card, ActivityIndicator, FlatList, SEOProps } from '../../../components';
import { actions, GetArticlesBySubcategory } from '../../../shared/src/client';
import { formatDateAbriviated, hyphenatedToCapitalized } from '../../../shared/src/utils';
import { processNextQueryStringParam, imgix } from '../../../utils';
import NotFound from '../../404.page';
import { useRouter } from 'next/router';
import { useArticles } from '../../../machines';
import { theme } from '../../../constants';
import styles from './[subcategory].module.scss';

function Author({
  initialArticles,
  subcategory
}: {
  initialArticles: GetArticlesBySubcategory | null
  subcategory: string
}) {
  const { articles, loadMore } = useArticles({
    initialArticles,
    subcategory
  });

  const router = useRouter();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (!articles) {
    return <NotFound/>;
  }

  return (
    <Section className={styles.page}>
      <Grid.Row 
        spacing={theme.spacing(2)}
      >
        <Grid.Col xs={24} md={6} lg={5}>
          <Text variant='h3'>Opinions / {hyphenatedToCapitalized(subcategory)}</Text>
        </Grid.Col>

        <Grid.Col xs={24} md={18} lg={14}>
          <FlatList
            data={articles}
            keyExtractor={article => article.id}
            renderItem={article => (
              <Card.Compact
                className={styles.articleCard}
                title={article.title}
                imageData={imgix(article.media[0]?.url ?? '', {
                  xs: imgix.presets.md('1:1')
                })}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article.slug}
                aspectRatio={3 / 2}
                date={formatDateAbriviated(article.publishDate)}
                altText={article.media[0]?.altText ?? article.media[0]?.description ?? undefined}
              />
            )}
            ItemSeparatorComponent={<Card.Spacer/>}
          />
          <ActivityIndicator.ProgressiveLoader
            onVisible={loadMore}
          />
        </Grid.Col>

      </Grid.Row>
    </Section>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const subcategory = processNextQueryStringParam(ctx.params?.subcategory, '');

  const initialArticles = await actions.getArticlesBySubcategory({
    subcategory,
    limit: 50
  });

  const seo: SEOProps = {
    title: hyphenatedToCapitalized(subcategory)
  };

  const firstArticle = initialArticles?.[0];
  if (firstArticle?.media?.[0]?.url) {
    seo.imageSrc = firstArticle.media[0].url;
  }

  return {
    props: { 
      initialArticles: initialArticles ?? null,
      subcategory,
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

export default Author;