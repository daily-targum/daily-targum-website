import React from 'react';
import { actions, GetArticles, CompactArticle } from '../../shared/src/client';
import { Section, Theme, Grid, ActivityIndicator, Card, CardCols, Banner, TagBar, Divider, SEOProps } from '../../components';
import { styleHelpers, imgix } from '../../utils';
import { formatDateAbriviated, chopArray } from '../../shared/src/utils';
import { useRouter } from 'next/router';
import { sportsMachine } from '../../machines';
import { useMachine } from '@xstate/react';



function Category({ 
  initialArticles
}: { 
  initialArticles: GetArticles
}) {
  const router = useRouter();
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  const [state, send] = useMachine(sportsMachine);
  const selectedTag = state.context.selectedTag;

  const subcategories = initialArticles.subcategories;
  const firstFiveArticles = initialArticles.items[0].articles.slice(0, 5);
  const restArticles = initialArticles.items[0].articles.slice(5);


  const articles = restArticles;

  React.useEffect(() => {
    if (articles) {
      send({
        type: 'HYDRATE',
        articles,
        subcategories
      });
    }
  }, [send]);

  // request more content for pagination
  React.useEffect(() => {
    const parentState = typeof state.value === "object" ? Object.keys(state.value)[0] : state.value;
    const cancledRef = { cancled: false };

    if (parentState === 'all' || parentState === 'tagSelected') {

      if (selectedTag) {
        const lastArticle = state.context.subcategories?.[selectedTag]?.slice(-1)[0];

        actions.getArticlesBySubcategory({
          subcategory: selectedTag,
          lastEvaluatedKey: lastArticle?.id,
          lastPublishDate: lastArticle?.publishDate
        })
        .then(newArticles => {
          if (!cancledRef.cancled) {
            if (newArticles && newArticles.length > 0) {
              send({
                type: 'CONTENT_LOADED',
                articles: newArticles
              });
            }
    
            else {
              send({
                type: 'OUT_OF_CONTENT'
              });
            }
          }
        });
      }

      else {
        const lastArticle = state.context.articles?.slice(-1)[0];
        if (!lastArticle) return;

        actions.getArticles({
          category: 'Sports',
          lastEvaluatedKey: lastArticle.id,
          lastPublishDate: lastArticle.publishDate
        })
        .then(res => {
          if (!cancledRef.cancled) {
            const newArticles = res.items?.[0]?.articles ?? [];
    
            if (newArticles && newArticles.length > 0) {
              send({
                type: 'CONTENT_LOADED',
                articles: newArticles
              });
            }
    
            else {
              send({
                type: 'OUT_OF_CONTENT'
              });
            }
          }
        });
      }
      
    }

    return () => {
      cancledRef.cancled = true;
    }
  }, [state.value, send, selectedTag, state.context]);

  const loadMore = React.useCallback(
    () => send({
      type: 'LOAD_MORE_CONTENT'
    }),
    [send]
  );



  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  let selectedArticles: (CompactArticle | undefined)[];
  if (typeof selectedTag === 'string') {
    selectedArticles = state.context.subcategories?.[selectedTag] ?? [];
  } else {
    selectedArticles = state.context.articles ?? restArticles;
  }

  return (
    <Section style={styles.page}>
      <Banner text='Sports'/>

      <Grid.Row 
        spacing={theme.spacing(2)}
        cols={['2fr', '1fr', '1fr']}
      >
        <CardCols 
          items={chopArray(firstFiveArticles, [1, 2, 2])}
        >
          {(article, i) => {
            if (!article) {
              return null;
            }

            return i === 0 ? (
              article[0] ? (
                <Card.ImageResponsive 
                  id={article[0].id}
                  title={article[0].title}
                  imageData={imgix(article[0].media[0]?.url ?? '', {
                    xs: imgix.presets.sm('1:1'),
                    md: imgix.presets.md('4:3')
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={'/'+article[0].slug}
                  date={formatDateAbriviated(article[0].publishDate)}
                  author={article[0].authors.map(a => a.displayName).join(', ')}
                />
              ) : null
            ) : (
              <>
                {article[0] ? (
                    <Card.ImageResponsive
                    id={article[0].id}
                    title={article[0].title}
                    imageData={imgix(article[0].media[0]?.url ?? '', {
                      xs: imgix.presets.sm('1:1'),
                      md: imgix.presets.md('3:2')
                    })}
                    href='/article/[year]/[month]/[slug]'
                    as={'/'+article[0].slug}
                    aspectRatioDesktop={3 / 2}
                    date={formatDateAbriviated(article[0].publishDate)}
                    author={article[0].authors.map(a => a.displayName).join(', ')}
                  />
                ) : null}

                <Card.Spacer/>

                {article[1] ? (
                  <Card.ImageResponsive
                    id={article[1].id}
                    title={article[1].title}
                    imageData={imgix(article[1].media[0]?.url ?? '', {
                      xs: imgix.presets.sm('1:1'),
                      md: imgix.presets.md('3:2')
                    })}
                    href='/article/[year]/[month]/[slug]'
                    as={'/'+article[1].slug}
                    aspectRatioDesktop={3 / 2}
                    date={formatDateAbriviated(article[1].publishDate)}
                    author={article[1].authors.map(a => a.displayName).join(', ')}
                  />
                ) : null}
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
        tags={subcategories}
        value={state.context.selectedTag ?? null}
        onChange={val => {
          if (val !== null) {
            send({
              type: 'SELECT_TAG',
              tag: val
            });
          }

          else {
            send({
              type: 'UNSELECT_TAG',
            });
          }
        }}
      />
      <Card.Spacer/>
      <Card.Spacer/>

      <Grid.Row 
        spacing={theme.spacing(2)}
      >
        
        {selectedArticles.map(item => item ? (
          <Grid.Col 
            key={item.id}
            xs={24}
            md={12}
            lg={8}
          >
            <Card.StackedResponsive
              imageData={imgix(item.media[0]?.url ?? '', {
                xs: imgix.presets.sm('1:1'),
                md: imgix.presets.md('16:9')
              })}
              title={item.title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+item.slug}
              date={formatDateAbriviated(item.publishDate)}
              aspectRatioDesktop={16 / 9}
              author={item.authors.map(a => a.displayName).join(', ')}
            />
          </Grid.Col>
        ) : null)}
      </Grid.Row>
      
      <ActivityIndicator.ProgressiveLoader 
        key={selectedTag}
        onVisible={loadMore}
      />
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    flex: 1
  }
}));

export async function getStaticProps() {
  const initialArticles = await actions.getArticles({
    category: 'Sports',
    limit: 100
  });

  const seo: SEOProps = {
    title: 'Sports'
  };

  const firstArticle = initialArticles?.items?.[0].articles?.[0];
  if (firstArticle?.media?.[0]?.url) {
    seo.imageSrc = firstArticle.media[0].url;
  }

  return {
    props: {
      initialArticles: initialArticles ?? null,
      seo
    },
    revalidate: 60 // seconds
  };
};

export default Category;