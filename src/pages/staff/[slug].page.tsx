import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Section, Text, Grid, Theme, AspectRatioImage, Card, ActivityIndicator, Divider, FlatList } from '../../components';
import { actions, GetAuthorPage } from '../../shared/src/client';
import { formatDateAbriviated } from '../../shared/src/utils';
import { processNextQueryStringParam, styleHelpers, imgix } from '../../utils';
import NotFound from '../404.page';
import { useRouter } from 'next/router';

function Author({
  page
}: {
  page: GetAuthorPage | null
}) {
  const router = useRouter();
  const theme = Theme.useTheme();
  const styles = Theme.useStyleCreator(styleCreator);

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (!page) {
    return <NotFound/>;
  }

  return (
    <Section style={styles.page}>
      <Grid.Row 
        spacing={theme.spacing(2)}
      >

        <Grid.Col xs={0} md={6} lg={5}>
          <div style={styles.authorCard}>
            <Text.Br/>
            {page.author.headshot ? (
              <AspectRatioImage
                data={imgix(page.author.headshot, {
                  xs: imgix.presets.sm('1:1')
                })}
                aspectRatio={1}
                style={styles.avatar}
              />
            ) : null}
            <Text variant='h3'>{page.author.displayName}</Text>
            <Text variant='p'>Bio goes here.</Text>
          </div>
        </Grid.Col>

        <Grid.Col xs={24} md={0}>
          {page.author.headshot ? (
            <Card.Compact
              href='#'
              style={styles.articleCard}
              title={page.author.displayName}
              imageData={imgix(page.author.headshot ?? '', {
                xs: imgix.presets.sm('1:1')
              })}
              aspectRatio={3 /2}
            />
          ) : (
            <Text variant='h3'>{page.author.displayName}</Text>
          )}

          <Card.Spacer/>
          <Divider/>
        </Grid.Col>

        <Grid.Col xs={24} md={18} lg={14}>
          <FlatList
            data={page.articles}
            keyExtractor={article => article.id}
            renderItem={article => (
              <Card.Compact
                style={styles.articleCard}
                title={article.title}
                imageData={imgix(article.media[0].url, {
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
          {/* <ActivityIndicator.ProgressiveLoader
            onVisible={() => console.log('implement progressive load')}
          /> */}
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
    borderRadius: '100%',
    overflow: 'hidden'
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
  const page = await actions.getAuthorBySlug({
    slug: processNextQueryStringParam(ctx.params?.slug, '')
  });

  // TODO: add seo

  return {
    props: { 
      page: page ?? null
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