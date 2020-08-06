import React from 'react';
import { NextPageContext } from 'next';
import { Section, Theme, HTML, ActivityIndicator } from '../../../components';
import { getPage, GetPage } from '../../../shared/src/client';
import NotFound from '../../404.page';
import { useRouter } from 'next/router';

function Page({
  page 
}: {
  page?: GetPage
}) {
  const router = useRouter();
  const classes = Theme.useStyleCreatorClassNames(styleCreator);

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  return page?.content ? (
    <Section className={classes.section}>
      <HTML html={page.content}/>
    </Section>
  ) : (
    <NotFound/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  section: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  }
}));

export async function getStaticProps(ctx: NextPageContext) {
  const page = await getPage({slug: (
    typeof ctx.query.slug === 'object' ? ctx.query.slug[0] : (ctx.query.slug||'')
  )});

  return {
    props: {
      page
    },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every sixty seconds
    revalidate: 60
  }
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export default Page;