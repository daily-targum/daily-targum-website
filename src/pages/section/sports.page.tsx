import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import NotFound from '../404.page';
import { Section, Theme, Grid, ActivityIndicator, Card, CardCols, Banner, TagBar, Divider } from '../../components';
import { styleHelpers, imgix } from '../../utils';
import { formatDateAbriviated, chopArray } from '../../shared/src/utils';
import { useRouter } from 'next/router';



function Category({ 
  initSection
}: { 
  initSection: GetArticles
}) {
  const router = useRouter();
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  const [ section, setSection ] = React.useState(initSection);
  const [ filteredItems, setFilteredItems ] = React.useState(initSection.items.slice(5));
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ tag, setTag ] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (tag) {
      setFilteredItems(section.items.slice(5).filter(item => item.title.indexOf('Rutgers') > -1));
    } else {
      setFilteredItems(section.items.slice(5));
    }
  }, [tag]);

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
    <Section style={styles.page}>
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
                id={article[0].id}
                title={article[0].title}
                imageData={imgix(article[0].media[0], {
                  xs: imgix.presets.sm('1:1'),
                  md: imgix.presets.md('4:3')
                })}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article[0].slug}
                date={formatDateAbriviated(article[0].publishDate)}
                author={article[0].authors.join(', ')}
              />
            ) : (
              <>
                <Card.ImageResponsive
                  id={article[0].id}
                  title={article[0].title}
                  imageData={imgix(article[0].media[0], {
                    xs: imgix.presets.sm('1:1'),
                    md: imgix.presets.md('3:2')
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={'/'+article[0].slug}
                  aspectRatioDesktop={3 / 2}
                  date={formatDateAbriviated(article[0].publishDate)}
                  author={article[0].authors.join(', ')}
                />
                <Card.Spacer/>
                <Card.ImageResponsive
                  id={article[1].id}
                  title={article[1].title}
                  imageData={imgix(article[1].media[0], {
                    xs: imgix.presets.sm('1:1'),
                    md: imgix.presets.md('3:2')
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={'/'+article[1].slug}
                  aspectRatioDesktop={3 / 2}
                  date={formatDateAbriviated(article[1].publishDate)}
                  author={article[1].authors.join(', ')}
                />
              </>
            );
          }}
        </CardCols>
      </Grid.Row>
      
      <Card.Spacer/>
      <Card.Spacer/>
      <Divider/>
      <Card.Spacer/>
      <Card.Spacer/>
      <TagBar
        tags={['All', 'Football', 'Basketball', 'Soccer']}
        value={tag}
        onChange={val => setTag(val)}
      />
      <Card.Spacer/>
      <Card.Spacer/>

      <Grid.Row 
        spacing={theme.spacing(2)}
      >
        
        {filteredItems.map(item => (
          <Grid.Col 
            key={item.id}
            xs={24}
            md={12}
            lg={8}
          >
            <Card.StackedResponsive
              imageData={imgix(item.media[0], {
                xs: imgix.presets.sm('1:1'),
                md: imgix.presets.md('16:9')
              })}
              title={item.title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+item.slug}
              date={formatDateAbriviated(item.publishDate)}
              aspectRatioDesktop={16 / 9}
              author={item.authors.join(' ')}
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
    backgroundColor: theme.colors.background,
    flex: 1
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