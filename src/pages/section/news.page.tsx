import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import NotFound from '../404.page';
import { Section, Theme, Grid, ActivityIndicator, Card, CardCols, Banner } from '../../components';
import { styleHelpers, imgix } from '../../utils';
import { formatDateAbriviated } from '../../shared/src/utils';
import { useRouter } from 'next/router';

function News({ 
  initSection
}: { 
  initSection: GetArticles
}) {
  const router = useRouter();
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  const [ section, setSection ] = React.useState(initSection);
  const [ isLoading, setIsLoading ] = React.useState(false);

  async function loadMore() {
    if (!section.nextToken || isLoading) return;
    setIsLoading(true);

    const { actions: clientActions } = await import('../../shared/src/client');

    const res = await clientActions.getArticles({
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

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  if (!section) {
    return <NotFound/>;
  }

  return (
    <Section style={styles.page}>
      <Banner text='News'/>

      <Grid.Row spacing={theme.spacing(2)}>
        
        <CardCols 
          items={section.items.slice(0,2)}
        >
          {(article, i) => {
            if (!article) {
              return null;
            }

            return i === 0 ? (
              <Card.ImageResponsive
                title={article.title}
                image={imgix(article.media[0], imgix.presets.fourByThree.medium)}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article.slug}
                date={formatDateAbriviated(article.publishDate)}
                aspectRatioImage={16 / 9}
              />
            ) : (
              <Card.ImageResponsive
                title={article.title}
                image={imgix(article.media[0], imgix.presets.fourByThree.medium)}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article.slug}
                date={formatDateAbriviated(article.publishDate)}
                aspectRatioImage={16 / 9}
              />
            );
          }}
        </CardCols>

        {section.items.slice(2).map(item => (
          <Grid.Col 
            key={item.title}
            xs={24}
            md={12}
            lg={8}
          >
            <Card.StackedResponsive
              image={imgix(item.media[0], imgix.presets.fourByThree.medium)}
              title={item.title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+item.slug}
              date={formatDateAbriviated(item.publishDate)}
              aspectRatioStacked={16 / 9}
            />
          </Grid.Col>
        ))}
      </Grid.Row>
      
      {section.nextToken ? (
        <ActivityIndicator.ProgressiveLoader 
          onVisible={loadMore}
        />
      ) : null}
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    backgroundColor: theme.colors.background
  }
}));

export async function getStaticProps() {
  const initSection = await actions.getArticles({
    category: 'News',
    limit: 20
  });

  return {
    props: {
      initSection
    },
    revalidate: 60 // seconds
  }
};

export default News;