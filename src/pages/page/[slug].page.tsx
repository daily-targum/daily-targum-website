import React from 'react';
import { GetStaticProps } from 'next';
import { Section, ActivityIndicator, HTML, SEOProps } from '../../components';
import { getPage, GetPage } from '../../shared/src/client';
import NotFound from '../404.page';
import { processNextQueryStringParam } from '../../utils';
import { useRouter } from 'next/router';
import styles from './page.module.scss';

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
    <Section className={styles.page}>
      <main>
        <HTML html={page.content}/>
      </main>
    </Section>
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