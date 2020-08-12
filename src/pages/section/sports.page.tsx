import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import NotFound from '../404.page';
import { Section, Theme, Grid, ActivityIndicator, Card, CardCols, Banner } from '../../components';
import { styleHelpers, imgix } from '../../utils';
import { formatDateAbriviated, chopArray } from '../../shared/src/utils';
import { useRouter } from 'next/router';

function Category({ 
  initSection
}: { 
  initSection: GetArticles
}) {
  const router = useRouter();
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const theme = Theme.useTheme();

  const [ section, setSection ] = React.useState(initSection);
  const [ isLoading, setIsLoading ] = React.useState(false);

  async function loadMore() {
    if(!section.nextToken || isLoading) return;
    setIsLoading(true);

    const { actions: clientActions } = await import('../../shared/src/client');

    const res = await clientActions.getArticles({
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

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  if(!section) {
    return <NotFound/>;
  }

  return (
    <Section className={classes.page}>
      <Banner text='Sports'/>

      <Grid.Row 
        spacing={theme.spacing(2)}
        cols={['2fr', '1fr', '1fr']}
      >
        <CardCols 
          items={chopArray(section.items, [1, 2, 2])}
        >
          {(article, i) => {
            if (!article) {
              return null;
            }

            return i === 0 ? (
              <Card.ImageResponsive 
                title={article[0].title}
                imageData={imgix(article[0].media[0], {
                  xs: imgix.presets.square.sm,
                  md: imgix.presets.fourByThree.md
                })}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article[0].slug}
                date={formatDateAbriviated(article[0].publishDate)}
              />
            ) : (
              <>
                <Card.ImageResponsive
                  title={article[0].title}
                  imageData={imgix(article[0].media[0], {
                    xs: imgix.presets.square.sm,
                    md: imgix.presets.fourByThree.md
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={'/'+article[0].slug}
                  aspectRatioImage={3 / 2}
                  date={formatDateAbriviated(article[0].publishDate)}
                />
                <Card.Spacer/>
                <Card.ImageResponsive
                  title={article[1].title}
                  imageData={imgix(article[0].media[0], {
                    xs: imgix.presets.square.sm,
                    md: imgix.presets.fourByThree.md
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={'/'+article[1].slug}
                  aspectRatioImage={3 / 2}
                  date={formatDateAbriviated(article[1].publishDate)}
                />
              </>
            );
          }}
        </CardCols>
      </Grid.Row>
      
      <Card.Spacer/>

      <Grid.Row 
        spacing={theme.spacing(2)}
      >
        
        {section.items.slice(3).map(item => (
          <Grid.Col 
            key={item.id}
            xs={24}
            md={12}
            lg={8}
          >
            <Card.StackedResponsive
              imageData={imgix(item.media[0], {
                xs: imgix.presets.square.sm,
                md: imgix.presets.fourByThree.md
              })}
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
    category: 'Sports',
    limit: 20
  });

  return {
    props: {
      initSection
    },
    revalidate: 60 // seconds
  };
};

export default Category;