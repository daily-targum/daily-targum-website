import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Section, Text, Grid, Theme, AspectRatioImage, Card, ActivityIndicator, Divider, FlatList } from '../../components';
import { getAuthorPage, GetAuthorPage } from '../../shared/src/client';
import { hyphenatedToCapitalized, formatDateAbriviated } from '../../shared/src/utils';
import { processNextQueryStringParam, styleHelpers, imgix } from '../../utils';
import NotFound from '../404.page';
import { useRouter } from 'next/router';

const img = 'https://www.w3schools.com/howto/img_avatar.png';

function Author({
  page
}: {
  page: GetAuthorPage
}) {
  const router = useRouter();
  const theme = Theme.useTheme();
  const styles = Theme.useStyleCreator(styleCreator);

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if(page.author.length === 0) {
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
            <AspectRatioImage
              data={imgix(img, {
                xs: imgix.presets.square.sm
              })}
              aspectRatio={1}
              style={styles.avatar}
            />
            <Text variant='h3'>{page.author[0].displayName}</Text>
            <Text variant='p'>Bio goes here.</Text>
          </div>
        </Grid.Col>

        <Grid.Col xs={24} md={0}>
          <Card.Compact
            style={styles.articleCard}
            title={page.author[0].displayName}
            subtitle='Bio goes here.'
            imageData={imgix(img, {
              xs: imgix.presets.square.sm
            })}
            aspectRatio={3 /2}
          />

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
                imageData={imgix(article.media[0], {
                  xs: imgix.presets.square.md
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
            onVisible={() => console.log('implement progressive load')}
          />
        </Grid.Col>

      </Grid.Row>
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    backgroundColor: theme.colors.background
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
  const page = await getAuthorPage({
    // FIX THIS: should be able to look up author by slug
    author: hyphenatedToCapitalized(processNextQueryStringParam(ctx.params?.slug, ''))
  });

  return {
    props: { 
      page
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