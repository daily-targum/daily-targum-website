import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import NotFound from '../404';
import { Section, Theme, Grid, ActivityIndicator, Card, CardRow } from '../../components';
import { styles } from '../../utils';
import { formatDateAbriviated } from '../../shared/src/utils';


function chopArray<I>(arr: I[]) {
  return [[arr[0]], [arr[1], arr[2]]];
}

function Category({ 
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
      category: 'Sports',
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
      <CardRow items={chopArray(section.items)}>
        {(article, i) => {
          if (!article) {
            return null;
          }

          return i === 0 ? (
            <Card.ImageResponsive 
              title={article[0].title}
              image={article[0].media[0]}
              href='/article/[year]/[month]/[slug]'
              as={'/'+article[0].slug}
              date={formatDateAbriviated(article[0].publishDate)}
            />
          ) : (
            <>
              <Card.ImageResponsive
                title={article[0].title}
                image={article[0].media[0]}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article[0].slug}
                aspectRatioImage={[16, 7]}
                date={formatDateAbriviated(article[0].publishDate)}
              />
              <Card.ImageResponsive
                title={article[1].title}
                image={article[1].media[0]}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article[1].slug}
                aspectRatioImage={[16, 7]}
                date={formatDateAbriviated(article[1].publishDate)}
              />
            </>
          );
        }}
      </CardRow>

      <Grid.Row spacing={spacing(2)}>
        {section.items.slice(3).map(item => (
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
  }
}));

Category.getInitialProps = async () => {
  const section = await actions.getArticles({
    category: 'Sports',
    limit: 20
  });
  return { 
    initSection: section
  };
};

export default Category;