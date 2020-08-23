import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import { formatDateAbriviated } from '../../shared/src/utils';
import { Section, Theme, Grid, ActivityIndicator, Card, Banner, SEOProps } from '../../components';
import { styleHelpers, imgix } from '../../utils';
import { useRouter } from 'next/router';
import { articleMachine, useMachine } from '../../machines';

function Category({ 
  initSection
}: { 
  initSection: GetArticles
}) {
  const [state, send] = useMachine(articleMachine);

  const articles = state.context.articles ?? initSection.items[0].articles;

  React.useEffect(() => {
    if (articles) {
      send({
        type: 'HYDRATE',
        articles
      });
    }
  }, [articles]);

  const router = useRouter();
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  return (
    <Section style={styles.page}>
      <Banner 
        text='Inside'
        accentText='Beat'
      />
      
      <Grid.Row spacing={theme.spacing(2.5)}>
        <Grid.Col xs={24} md={12}>
          <Card.StackedResponsive
            id={articles[0].id}
            tag='Category'
            imageData={imgix(articles[0].media[0].url, {
              xs: imgix.presets.sm('1:1'),
              md: imgix.presets.md('2:1')
            })}
            title={articles[0].title}
            href='/article/[year]/[month]/[slug]'
            as={'/'+articles[0].slug}
            aspectRatioDesktop={2 / 1}
            date={formatDateAbriviated(articles[0].publishDate)}
            author={articles[0].authors.map(a => a.displayName).join(', ')}
          />
        </Grid.Col>

        <Grid.Col xs={24} md={12}>
          <Card.StackedResponsive
            id={articles[1].id}
            tag='Category'
            imageData={imgix(articles[1].media[0].url, {
              xs: imgix.presets.sm('1:1'),
              md: imgix.presets.md('2:1')
            })}
            title={articles[1].title}
            href='/article/[year]/[month]/[slug]'
            as={'/'+articles[1].slug}
            aspectRatioDesktop={2 /1}
            date={formatDateAbriviated(articles[1].publishDate)}
            author={articles[1].authors.map(a => a.displayName).join(', ')}
          />
        </Grid.Col>

        {articles.slice(2).map(item => (
          <Grid.Col 
            key={item.id}
            xs={24}
            md={12}
            lg={8}
          >
            <Card.Compact
              id={item.id}
              tag='Category'
              imageData={imgix(item.media[0].url, {
                xs: imgix.presets.sm('1:1')
              })}
              title={item.title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+item.slug}
              date={formatDateAbriviated(item.publishDate)}
            author={item.authors.map(a => a.displayName).join(', ')}
            />
          </Grid.Col>
        ))}
      </Grid.Row>

      {/* {section.nextToken ? (
        <ActivityIndicator.ProgressiveLoader 
          onVisible={loadMore}
        />
      ) : null} */}

    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    backgroundColor: theme.colors.background,
    flex: 1
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
    ...styleHelpers.hideLink(),
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  cardSmallImage: {
    height: 170,
    ...styleHelpers.lockWidth(170),
    ...styleHelpers.centerBackgroundImage(),
  },
  // medium cards
  cardMedium: {
    ...styleHelpers.hideLink(),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  cardMediumImage: {
    height: 250,
    ...styleHelpers.aspectRatioFullWidth(4 / 1),
    ...styleHelpers.centerBackgroundImage(),
  }
}));

export async function getStaticProps() {
  const initSection = await actions.getArticles({
    category: 'inside-beat',
    limit: 80
  });

  const seo: SEOProps = {
    title: 'Inside Beat'
  };

  const firstArticle = initSection?.items?.[0].articles?.[0];
  if (firstArticle) {
    seo.imageSrc = firstArticle.media?.[0].url;
  }
  
  return {
    props: {
      initSection: initSection ?? null,
      seo
    },
    revalidate: 60 // seconds
  }
};

export default Category;