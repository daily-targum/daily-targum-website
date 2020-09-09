import React from 'react';
import { NextPageContext } from 'next';
import { Section, ActivityIndicator, HTML, SEOProps } from '../../../components';
import { getPagePreview, GetPage } from '../../../shared/src/client';
import NotFound from '../../404.page';
import { useRouter } from 'next/router';
import { processNextQueryStringParam } from '../../../utils';
import styles from './[id].module.scss';

function Page({
  initialPage,
  pageId
}: {
  initialPage?: GetPage
  pageId: string
}) {
  const router = useRouter();
  const [ page, setPage ] = React.useState<GetPage | undefined>(initialPage);

  React.useEffect(() => {
    async function refresh() {
      setPage(
        await getPagePreview({ id: pageId })
      );
    }
    window.addEventListener("focus", refresh); 
    return () => window.removeEventListener("focus", refresh);
  }, [ pageId ]);

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  return page?.content ? (
    <Section className={styles.section}>
      <HTML html={page.content}/>
    </Section>
  ) : (
    <NotFound/>
  );
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const id = processNextQueryStringParam(ctx.query.id);

  const initialPage = await getPagePreview({ id });

  const seo: SEOProps = {
    title: initialPage?.title,
    type: 'website'
  };
  
  return { 
    initialPage,
    pageId: id,
    seo
  };
};

export default Page;