import React from 'react';
import { NextPageContext } from 'next';
import { Section, Theme, ActivityIndicator } from '../../../components';
import HTML from '../../../components/HTML';
import { getPagePreview, GetPage } from '../../../shared/src/client';
import NotFound from '../../404.page';
import { useRouter } from 'next/router';
import { processNextQueryStringParam } from '../../../utils';

function Page({
  initialPage,
  pageId
}: {
  initialPage?: GetPage
  pageId: string
}) {
  const router = useRouter();
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
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

Page.getInitialProps = async (ctx: NextPageContext) => {
  const id = processNextQueryStringParam(ctx.query.id);

  const initialPage = await getPagePreview({ id });
  
  return { 
    initialPage,
    pageId: id
  };
};

export default Page;