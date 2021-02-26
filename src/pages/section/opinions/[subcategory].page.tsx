import * as React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Section, Text, Grid, Card2, LoadMoreButton, ActivityIndicator, SEOProps, Divider, Ad, Sticky, Semantic, Donate } from '../../../components';
import { actions, GetArticlesBySubcategory } from '../../../aws';
import { processNextQueryStringParam, imgix, styleHelpers, formatDateAbriviated, hyphenatedToCapitalized, extractTextFromHTML } from '../../../utils';
import NotFound from '../../404.page';
import { useRouter } from 'next/router';
import { useArticles } from '../../../machines';
import { theme, next } from '../../../constants';
import styles from './[subcategory].module.scss';

function Author({
  initialArticles,
  subcategory
}: {
  initialArticles: GetArticlesBySubcategory | null
  subcategory: string
}) {
  const { articles, loadMore, loading } = useArticles({
    initialArticles,
    subcategory
  });

  const router = useRouter();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (!articles) {
    return <NotFound/>;
  }

  return (
    <Section className={styles.page}>
      <Grid.Row
        spacing={theme.spacing(4)}
        cols={[ '1fr', '1px', 'minmax(auto, 300px)' ]}
        disableGridOnPrit
      >
        <Grid.Col xs={3} md={1}>
          <Semantic role='main' pritable skipNavContent>
            <Text variant='h4'>Opinions</Text>
            <Text variant='h1' htmlTag='h1'>{hyphenatedToCapitalized(subcategory)}</Text>

            <Divider className={styles.divider}/>
          
            <Grid.Row 
              cols={['1fr', '1fr']}
              spacing={styleHelpers.spacing(3)}
            >

              {articles.map(article => (
                <Grid.Col 
                  key={article.id}
                  xs={2} 
                  lg={1}
                  style={{height: '100%'}}
                >
                  <Card2.Stacked
                    className={styles.articleCard}
                    title={article.title}
                    imageData={imgix(article.media[0]?.url ?? '', {
                      xs: imgix.presets.md('16:9')
                    })}
                    href='/article/[year]/[month]/[slug]'
                    as={'/'+article.slug}
                    date={formatDateAbriviated(article.publishDate)}
                    aspectRatio={16/9}
                    description={extractTextFromHTML(article.abstract ?? '')}
                  />
                </Grid.Col>
              ))}
            
              {/* <ActivityIndicator.ProgressiveLoader
                onVisible={() => console.log('implement progressive load')}
              /> */}
            </Grid.Row>
          </Semantic>
          
          <LoadMoreButton
            handleLoad={loadMore}
            loading={loading}
          />
        </Grid.Col>

        <Grid.Col xs={0} md={1} style={{height: '100%', overflow: 'hidden'}}>
          <Divider.Vertical/>
        </Grid.Col>

        <Grid.Col xs={0} xl={1} style={{height: '100%'}}>
          <Sticky>
            <Semantic role='aside'>
              <Ad   
                type='rectange' 
                style={{ marginBottom: '1rem' }} 
              />
              <Ad 
                type='skyscraper' 
                fallback={(
                  <Donate.SidebarCard/>
                )}
              />
            </Semantic>
          </Sticky>
        </Grid.Col>

      </Grid.Row>
    </Section>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const subcategory = processNextQueryStringParam(ctx.params?.subcategory, '');

  const initialArticles = await actions.getArticlesBySubcategory({
    subcategory,
    limit: 50
  });

  const seo: SEOProps = {
    title: hyphenatedToCapitalized(subcategory)
  };

  const firstArticle = initialArticles?.[0];
  if (firstArticle?.media?.[0]?.url) {
    seo.imageSrc = firstArticle.media[0].url;
  }

  return {
    props: { 
      initialArticles: initialArticles ?? null,
      subcategory,
      seo
    },
    revalidate: next.staticPropsRevalidateSeconds
  };
};

export const getStaticPaths: GetStaticPaths = async () =>  {
  return {
    paths: [],
    fallback: true
  };
}

export default Author;