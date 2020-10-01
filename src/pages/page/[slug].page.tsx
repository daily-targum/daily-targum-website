import React from 'react';
import { GetStaticProps } from 'next';
import { Section, ActivityIndicator, HTML, SEOProps, Grid, Ad, Sticky, SkipNav, AdBlockDector } from '../../components';
import { getPage, GetPage } from '../../shared/src/client';
import NotFound from '../404.page';
import { processNextQueryStringParam } from '../../utils';
import { useRouter } from 'next/router';
import styles from './page.module.scss';
import { theme } from '../../constants';

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
    <Section.StickyContainer className={styles.page}>
      <Grid.Row
        spacing={theme.spacing(4)}
        cols={[ '1fr', 'minmax(auto, 300px)' ]}
      >
        <Grid.Col xs={2} md={1}>
          <main>
            <SkipNav.Content/>
            <HTML html={page.content}/>
          </main>
        </Grid.Col>
        
        <Grid.Col xs={0} md={1}>
          <Sticky>
            <Ad type='rectange' style={{ marginBottom: '1rem' }} />
            <Ad type='skyscraper' />
            <AdBlockDector>
              <span>AD BLOCK!!!</span>
            </AdBlockDector>
          </Sticky>
        </Grid.Col>

      </Grid.Row>
    </Section.StickyContainer>
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
    paths: [],
    fallback: true
  };
}

export default Page;