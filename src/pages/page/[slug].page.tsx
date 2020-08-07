import React from 'react';
import { NextPageContext } from 'next';
import { Section, Theme, HTML } from '../../components';
import { getPage, GetPage } from '../../shared/src/client';
import NotFound from '../404.page';
import { styleHelpers } from '../../utils';

function Page({
  page 
}: {
  page?: GetPage
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return page?.content ? (
    <Section className={classes.section}>
      <main>
        <HTML html={page.content}/>
      </main>
    </Section>
  ) : (
    <NotFound/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  section: {
    ...styleHelpers.page(theme)
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