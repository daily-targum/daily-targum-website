import React from 'react';
import { GetStaticProps } from 'next';
import { Section, Theme, ActivityIndicator, HTML } from '../../components';
import { getPage, GetPage } from '../../shared/src/client';
import NotFound from '../404.page';
import { styleHelpers, processNextQueryStringParam } from '../../utils';
import { useRouter } from 'next/router';

function Page({
  page 
}: {
  page?: GetPage
}) {
  const router = useRouter();
  const classes = Theme.useStyleCreatorClassNames(styleCreator);

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const page = await getPage({
    slug: processNextQueryStringParam(ctx.params?.slug)
  });

  return {
    props: {
      page
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