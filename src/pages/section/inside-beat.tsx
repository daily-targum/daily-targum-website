import React from 'react';
import Link from 'next/link';
import { actions, GetArticles, Article } from '../../shared/src/client';
import NotFound from '../404';
import { Section, Theme, Text, Grid, ActivityIndicator } from '../../components';
import { styles } from '../../utils';

function LargeCard({
  article
}: {
  article: Article
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href='/article/[year]/[month]/[slug]'
      as={`/${article.slug}`}
    >
      <a className={classes.cardMedium}>
        <div 
          className={classes.cardMediumImage}
          style={{
            backgroundImage: `url(${article.media})`
          }}
        />
        <div className={classes.cardBody}>
          <Text className={classes.tag}>News</Text>
          <Text variant='h4' numberOfLines={3}>{article.title}</Text>
          <div className={classes.grow}/>
          <Text variant='p' numberOfLines={3} noPadding>
            by {article.authors[0]}
          </Text>
        </div>
      </a>
    </Link>
  )
}

function SmallCard({
  article
}: {
  article: Article
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href='/article/[year]/[month]/[slug]'
      as={`/${article.slug}`}
    >
      <a className={classes.cardSmall}>
        <div 
          className={classes.cardSmallImage}
          style={{
            backgroundImage: `url(${article.media})`
          }}
        />
        <div className={classes.cardBody}>
          <Text className={classes.tag}>News</Text>
          <Text variant='h4' numberOfLines={3}>{article.title}</Text>
          <div className={classes.grow}/>
          <Text variant='p' numberOfLines={3} noPadding>
            by {article.authors[0]}
          </Text>
        </div>
      </a>
    </Link>
  )
}

function Category({ 
  initSection
}: { 
  initSection: GetArticles
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const { spacing } = Theme.useTheme();

  const [section, setSection] = React.useState(initSection);
  const [isLoading, setIsLoading] = React.useState(false);

  async function loadMore() {
    if(!section.nextToken || isLoading) return;
    setIsLoading(true);
    const res = await actions.getArticles({
      category: 'inside-beat',
      limit: 20,
      nextToken: section.nextToken
    });
    setSection({
      ...res,
      items: section.items.concat(res.items)
    });
    setIsLoading(false);
  }

  if(!section) return <NotFound/>;
  return (
    <Section className={classes.page}>
      <div className={classes.logoWrap}>
        <Text className={classes.logo}>Inside <Text className={classes.logoAccent}>Beat</Text></Text>
      </div>
      <Grid.Row spacing={spacing(2)}>
        <Grid.Col xs={24}>
          <LargeCard
            article={section.items[0]}
          />
        </Grid.Col>

        <Grid.Col xs={24} md={12}>
          <LargeCard
            article={section.items[1]}
          />
        </Grid.Col>

        <Grid.Col xs={24} md={12}>
          <LargeCard
            article={section.items[2]}
          />
        </Grid.Col>

        {section.items.slice(3).map(item => (
          <Grid.Col 
            key={item.id}
            xs={24}
            md={12}
            lg={8}
          >
            <SmallCard article={item}/>
          </Grid.Col>
        ))}
      </Grid.Row>
      {section.nextToken ? (
        <ActivityIndicator.ProgressiveLoader onVisible={loadMore}/>
      ) : null}
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    backgroundColor: theme.colors.background,
  },
  grow: {
    display: 'flex',
    flex: 1,
  },
  logoWrap: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    textTransform: 'uppercase',
    fontWeight: 900,
    fontSize: 'calc(38px + 2vw)',
    textAlign: 'center',
    color: '#fff'
  },
  logoAccent: {
    color: theme.colors.accent
  },
  tag: {
    color: '#fff',
    backgroundColor: theme.colors.accent,
    padding: theme.spacing(0.5, 1),
    marginBottom: theme.spacing(1),
  },
  // all cards
  cardBody: {
    padding: theme.spacing(2),
    backgroundColor: theme.colors.surface,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  // cmall cards
  cardSmall: {
    ...styles.hideLink(),
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  cardSmallImage: {
    height: 170,
    ...styles.lockWidth(170),
    ...styles.centerBackgroundImage(),
  },
  // medium cards
  cardMedium: {
    ...styles.hideLink(),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  cardMediumImage: {
    height: 250,
    ...styles.aspectRatioFullWidth(4, 1),
    ...styles.centerBackgroundImage(),
  }
}));

Category.getInitialProps = async () => {
  const section = await actions.getArticles({
    category: 'inside-beat',
    limit: 20
  });
  return { 
    initSection: section
  };
};

export default Category;