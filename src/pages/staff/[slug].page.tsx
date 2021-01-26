import * as React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Section, Text, Grid, AspectRatioImage, Card2, ActivityIndicator, Divider, Ad, Sticky, Semantic, Donate } from '../../components';
import { actions, GetAuthorPage } from '../../shared/src/client';
import { formatDateAbriviated, extractTextFromHTML, hyphenatedToCapitalized } from '../../shared/src/utils';
import { processNextQueryStringParam, imgix, styleHelpers } from '../../utils';
import NotFound from '../404.page';
import { useRouter } from 'next/router';
import styles from './[slug].module.scss';
import { theme, next } from '../../constants';

function Author({
  page
}: {
  page: GetAuthorPage | null
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (!page) {
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
            <Grid.Row spacing={theme.spacing(2)} dangerouslyReverse>

              {page.author.headshot ? (
                <Grid.Col xs={24} md={6}>
                  <AspectRatioImage
                    data={imgix(page.author.headshot, {
                      xs: imgix.presets.sm('1:1')
                    })}
                    aspectRatio={1}
                    className={styles.avatar}
                  />
                </Grid.Col>
              ) : null}

              <Grid.Col xs={24} md={page.author.headshot ? 18 : 24}>
                <Text variant='h1' htmlTag='h1'>{page.author.displayName}</Text>
                {page.author.bio ? (
                  <Text variant='p' htmlTag='h2'>{page.author.bio}</Text>
                ) : null}
              </Grid.Col>
              
              <Grid.Col xs={24}>
                <Divider className={styles.divider}/>
              </Grid.Col>

              <Grid.Col xs={24}>
                <Grid.Row 
                  cols={['1fr', '1fr']}
                  spacing={styleHelpers.spacing(3)}
                >

                  {page.articles.map(article => (
                    <Grid.Col 
                      key={article.id}
                      xs={2} 
                      lg={1}
                      style={{height: '100%'}}
                    >
                      <Card2.Stacked
                        tag={article.category ? hyphenatedToCapitalized(article.category) : undefined}
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
              </Grid.Col>

            </Grid.Row>
          </Semantic>
        </Grid.Col>

        <Grid.Col xs={0} md={1} style={{height: '100%', overflow: 'hidden'}}>
          <Divider.Vertical/>
        </Grid.Col>

        <Grid.Col xs={0} md={1} style={{height: '100%'}}>
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
  const page = await actions.getAuthorBySlug({
    slug: processNextQueryStringParam(ctx.params?.slug, '')
  });

  // TODO: add seo

  return {
    props: { 
      page: page ?? null
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