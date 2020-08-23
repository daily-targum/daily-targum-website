import React from 'react';
import { NextPageContext } from 'next';
import { Section, Theme, ActivityIndicator, HTML, SEOProps } from '../../../components';
import { getPagePreview, GetPage } from '../../../shared/src/client';
import NotFound from '../../404.page';
import { useRouter } from 'next/router';
import { processNextQueryStringParam, styleHelpers } from '../../../utils';

function Page({
  initialPage,
  pageId
}: {
  initialPage?: GetPage
  pageId: string
}) {
  const router = useRouter();
  const styles = Theme.useStyleCreator(styleCreator);
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
    <Section style={styles.section}>
      <HTML html={page.content}/>
    </Section>
  ) : (
    <NotFound/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  section: {
    ...styleHelpers.page(theme),
    flex: 1
  }
}));

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