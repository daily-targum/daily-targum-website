import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import NotFound from '../404';
import { Section, Theme, Grid, Text, ActivityIndicator, Card, CardRow } from '../../components';
import { styleHelpers } from '../../utils';
import { formatDateAbriviated } from '../../shared/src/utils';

function News({ 
  initSection
}: { 
  initSection: GetArticles
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const { spacing } = Theme.useTheme();

  const [ section, setSection ] = React.useState(initSection);
  const [ isLoading, setIsLoading ] = React.useState(false);

  async function loadMore() {
    if(!section.nextToken || isLoading) return;
    setIsLoading(true);
    const res = await actions.getArticles({
      category: 'News',
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
        <Text className={classes.logo}>News</Text>
      </div>

      <CardRow items={section.items.slice(0,2)}>
        {(article, i) => {
          if (!article) {
            return null;
          }

          return i === 0 ? (
            <Card.ImageResponsive
              title={article.title}
              image={article.media[0]}
              href='/article/[year]/[month]/[slug]'
              as={'/'+article.slug}
              date={formatDateAbriviated(article.publishDate)}
              aspectRatioImage={[16, 9]}
            />
          ) : (
            <Card.ImageResponsive
              title={article.title}
              image={article.media[0]}
              href='/article/[year]/[month]/[slug]'
              as={'/'+article.slug}
              date={formatDateAbriviated(article.publishDate)}
              aspectRatioImage={[16, 9]}
            />
          );
        }}
      </CardRow>

      <Grid.Row spacing={spacing(2)}>
        {section.items.slice(2).map(item => (
          <Grid.Col 
            key={item.id}
            xs={24}
            md={12}
            lg={8}
          >
            <Card.StackedResponsive
              image={item.media[0]}
              title={item.title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+item.slug}
              date={formatDateAbriviated(item.publishDate)}
              aspectRatioStacked={[16, 9]}
            />
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
    ...styleHelpers.page(theme, 'compact'),
    backgroundColor: theme.colors.background
  },
  logoWrap: {
    ...styleHelpers.card(theme),
    backgroundColor: theme.colors.primary,
    padding: theme.spacing(2),
    margin: theme.spacing(0, 0, 2),
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
  grow: {
    display: 'flex',
    flex: 1,
  }
}));

News.getInitialProps = async () => {
  const section = await actions.getArticles({
    category: 'News',
    limit: 20
  });
  return { 
    initSection: section
  };
};

export default News;