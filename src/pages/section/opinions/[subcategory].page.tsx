import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Section, Text, Grid, Theme, Card, ActivityIndicator, FlatList, SEOProps } from '../../../components';
import { actions, GetArticlesBySubcategory } from '../../../shared/src/client';
import { formatDateAbriviated, hyphenatedToCapitalized } from '../../../shared/src/utils';
import { processNextQueryStringParam, styleHelpers, imgix } from '../../../utils';
import NotFound from '../../404.page';
import { useRouter } from 'next/router';
import { useArticles } from '../../../machines';

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
  const theme = Theme.useTheme();
  const styles = Theme.useStyleCreator(styleCreator);

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (!articles) {
    return <NotFound/>;
  }

  return (
    <Section style={styles.page}>
      <Grid.Row 
        spacing={theme.spacing(2)}
      >
        <Grid.Col xs={24} md={6} lg={5}>
          <Text variant='h3'>Optinions / Subsection</Text>
        </Grid.Col>

        <Grid.Col xs={24} md={18} lg={14}>
          <FlatList
            data={articles}
            keyExtractor={article => article.id}
            renderItem={article => (
              <Card.Compact
                style={styles.articleCard}
                title={article.title}
                imageData={imgix(article.media[0]?.url ?? '', {
                  xs: imgix.presets.md('1:1')
                })}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article.slug}
                aspectRatio={3 / 2}
                date={formatDateAbriviated(article.publishDate)}
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

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    backgroundColor: theme.colors.background,
    flex: 1
  },
  authorCard: {
    ...styleHelpers.flex('column'),
    alignItems: 'center',
    ...styleHelpers.card(theme),
    padding: theme.spacing(1)
  },
  authorCardMobile: {
    ...styleHelpers.flex('row'),
    alignItems: 'center',
    ...styleHelpers.card(theme),
    marginBottom: theme.spacing(2)
  },
  avatar: {
    ...styleHelpers.lockWidth('50%'),
    marginBottom: theme.spacing(2),
    borderRadius: '100%'
  },
  avatarMobile: {
    ...styleHelpers.lockWidth('30%'),
    marginBottom: theme.spacing(2)
  },
  articleCard: {
    ...styleHelpers.card(theme),
    padding: 0
  },
  authorCardMobileBody: {
    ...styleHelpers.flex('column'),
    flex: 1,
    alignItems: 'center'
  }
}));

export const getStaticProps: GetStaticProps = async (ctx) => {
  const subcategory = processNextQueryStringParam(ctx.params?.subcategory, '');

  const initialArticles = await actions.getArticlesBySubcategory({
    subcategory,
    limit: 50
  });

  const seo: SEOProps = {
    title: `Opinions / ${hyphenatedToCapitalized(subcategory)}`
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