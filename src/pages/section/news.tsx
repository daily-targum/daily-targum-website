import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import NotFound from '../404';
import { Section, Theme, Grid, ActivityIndicator, Card, CardRow, Divider } from '../../components';
import { styles } from '../../utils';
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
            <Card.StackedResponsive
              title={article.title}
              image={article.media[0]}
              href='/article/[year]/[month]/[slug]'
              as={'/'+article.slug}
              date={formatDateAbriviated(article.publishDate)}
            />
          );
        }}
      </CardRow>

      <CardRow items={section.items.slice(2,4)}>
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

      <Divider className={classes.divier}/>

      <Grid.Row spacing={spacing(2)}>
        {section.items.slice(4).map(item => (
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
    ...styles.page(theme, 'compact'),
    backgroundColor: theme.colors.background
  },
  grow: {
    display: 'flex',
    flex: 1,
  },
  divier: {
    margin: theme.spacing(2, 0, 4)
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