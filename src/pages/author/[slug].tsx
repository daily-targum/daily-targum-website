import React from 'react';
import { NextPageContext } from 'next';
import { Section, Text, Grid, Theme, AspectRatioImage, Card, ActivityIndicator, Divider } from '../../components';
import { getAuthorPage, GetAuthorPage } from '../../shared/src/client';
import { hyphenatedToCapitalized, formatDateAbriviated } from '../../shared/src/utils';
import { processNextQueryStringParam, styles } from '../../utils';
import NotFound from '../404';

const img = 'https://www.w3schools.com/howto/img_avatar.png';

function Author({
  page
}: {
  page: GetAuthorPage
}) {
  const theme = Theme.useTheme();
  const classes = Theme.useStyleCreatorClassNames(styleCreator);

  if(page.author.length === 0) {
    return <NotFound/>;
  }

  return (
    <Section className={classes.page}>
      <Grid.Row spacing={theme.spacing(4)}>

        <Grid.Col xs={0} md='250px'>
          <div className={classes.authorCard}>
            <Text.Br/>
            <AspectRatioImage
              src={img}
              aspectRatio={[1,1]}
              className={classes.avatar}
            />
            <Text variant='h3'>{page.author[0].display_name}</Text>
            <Text variant='p'>Bio goes here.</Text>
          </div>
        </Grid.Col>

        <Grid.Col xs={24} md={0}>
          <Card.Compact
            className={classes.articleCard}
            title={page.author[0].display_name}
            subtitle='Bio goes here.'
            image={img}
            aspectRatio={[3,2]}
          />
          <Divider className={classes.divider}/>
        </Grid.Col>

        <Grid.Col xs={24} md='auto'>
          {page.articles.map(article => (
            <Card.Compact
              className={classes.articleCard}
              key={article.id}
              title={article.title}
              image={article.media[0]}
              href='/article/[year]/[month]/[slug]'
              as={'/'+article.slug}
              aspectRatio={[3,2]}
              date={formatDateAbriviated(article.publishDate)}
            />
          ))}
          <ActivityIndicator.ProgressiveLoader
            onVisible={() => console.log('implement progressive load')}
          />
        </Grid.Col>

        <Grid.Col xs={0} xl='250px'></Grid.Col>
      </Grid.Row>
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styles.page(theme, 'compact'),
    backgroundColor: theme.colors.background
  },
  authorCard: {
    ...styles.flex('column'),
    alignItems: 'center',
    ...styles.card(theme),
    ...styles.lockWidth(250 - theme.spacing(2)),
    position: 'fixed'
  },
  authorCardMobile: {
    ...styles.flex('row'),
    alignItems: 'center',
    ...styles.card(theme),
    marginBottom: theme.spacing(2)
  },
  avatar: {
    ...styles.lockWidth('50%'),
    marginBottom: theme.spacing(2),
    borderRadius: '100%'
  },
  avatarMobile: {
    ...styles.lockWidth('30%'),
    marginBottom: theme.spacing(2)
  },
  articleCard: {
    ...styles.card(theme),
    padding: 0
  },
  authorCardMobileBody: {
    ...styles.flex('column'),
    flex: 1,
    alignItems: 'center'
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}));

Author.getInitialProps = async (ctx: NextPageContext) => {
  const page = await getAuthorPage({
    // FIX THIS: should be able to look up author by slug
    author: hyphenatedToCapitalized(processNextQueryStringParam(ctx.query.slug))
  });
  return { 
    page
  };
};

export default Author;