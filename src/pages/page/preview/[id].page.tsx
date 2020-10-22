import * as React from 'react';
import { NextPageContext } from 'next';
import { Section, ActivityIndicator, HTML, SEOProps, Grid, Ad, Sticky, Semantic, Divider, Donate } from '../../../components';
import { getPagePreview, GetPage } from '../../../shared/src/client';
import NotFound from '../../404.page';
import { useRouter } from 'next/router';
import { processNextQueryStringParam } from '../../../utils';
import styles from './[id].module.scss';
import { theme } from '../../../constants';

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
    <Section.StickyContainer className={styles.page}>
      <Grid.Row
        spacing={theme.spacing(4)}
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
        
        <Grid.Col xs={0} md={1}>
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
    </Section.StickyContainer>
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