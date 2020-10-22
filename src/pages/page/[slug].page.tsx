import * as React from 'react';
import { GetStaticProps } from 'next';
import { Section, ActivityIndicator, HTML, SEOProps, Grid, Ad, Sticky, Semantic, Divider, Donate } from '../../components';
import { getPage, GetPage } from '../../shared/src/client';
import NotFound from '../404.page';
import { processNextQueryStringParam, styleHelpers } from '../../utils';
import { useRouter } from 'next/router';
import Styles from './page.style';
const { classNames, StyleSheet } = Styles;

function Page({
  page 
}: {
  page: GetPage | null
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  return page?.content ? (
    <>
      <Section className={classNames.page}>
        <Grid.Row
          spacing={styleHelpers.spacing(4)}
          cols={[ '1fr', '1px', 'minmax(auto, 300px)' ]}
          disableGridOnPrit
        >
          <Grid.Col xs={3} md={1}>
            <Semantic role='main' skipNavContent pritable>
              <Semantic role='article'>
                <HTML html={page.content}/>
              </Semantic>
            </Semantic>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{height: '100%'}}>
            <Divider.Vertical/>
          </Grid.Col>
          
          <Grid.Col xs={0} md={1} style={{height: '100%'}}>
            <Sticky>
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
            </Sticky>
          </Grid.Col>

        </Grid.Row>
      </Section>
      {StyleSheet}
    </>
  ) : (
    <NotFound/>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {  
  const slug = processNextQueryStringParam(ctx.params?.slug);

  const page = await getPage({
    slug
  });

  const seo: SEOProps = {
    pathname: `/page/${slug}`,
    title: page?.title,
    type: 'website'
  };

  return {
    props: {
      page: page ?? null,
      seo
    },
    revalidate: 60 // seconds
  }
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'about' } }
    ],
    fallback: 'unstable_blocking'
  };
}

export const config = { amp: 'hybrid' }

export default Page;