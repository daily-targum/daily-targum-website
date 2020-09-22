import React from 'react';
import { NextPageContext } from 'next';
import { GetArticle, getArticlePreview } from '../../../shared/src/client';
import { SEOProps, Section, Grid, Text, Newsletter, Divider, Byline, Br, AspectRatioImage, HTML, Sticky, Ad, SkipNav } from '../../../components';
import NotFound from '../../404.page';
import { processNextQueryStringParam } from '../../../utils';
import styles from './[id].module.scss';
import { theme } from '../../../constants';

function Article({
  article,
  articleId
}: {
  article: GetArticle | null,
  articleId: string
}) {
  const [ dynamicArticle, setDynamicArticle ] = React.useState<GetArticle | null>(article);

  React.useEffect(() => {
    async function refresh() {
      try {
        setDynamicArticle(
          await getArticlePreview({
            id: processNextQueryStringParam(articleId)
          })
        );
      } catch(err) {
        setDynamicArticle(null);
      }
    }
    window.addEventListener("focus", refresh); 
    return () => window.removeEventListener("focus", refresh);
  }, [articleId]);


  if(!dynamicArticle) return <NotFound/>;
  
  return (
    <>
      <Section.StickyContainer className={styles.page}>
        <Grid.Row 
          spacing={theme.spacing(4)}
          cols={[ '1fr', '300px' ]}
        >

          <Grid.Col xs={2} md={1}>
            <main>
              <article>
                <SkipNav.Content/>
                <Text variant='h2'>{dynamicArticle.title}</Text>
                <Byline.Authors 
                  authors={dynamicArticle.authors}
                  updatedAt={dynamicArticle.updatedAt} 
                  publishDate={dynamicArticle.publishDate}
                />
                <AspectRatioImage
                  aspectRatio={16/9}
                  src={dynamicArticle.media[0]?.url ?? ''}
                />
                <Br/>
                <HTML html={dynamicArticle.body} ads/>
              </article>
            </main>
          </Grid.Col>

          <Grid.Col xs={0} md={1}>
            <Sticky>
              <Ad type='rectange' style={{ marginBottom: '1rem' }} />
              <Ad type='skyscraper' />
            </Sticky>
          </Grid.Col>

        </Grid.Row>
      </Section.StickyContainer>

      <Divider/>
      <Newsletter.Section/>
    </>
  );
}

Article.getInitialProps = async (ctx: NextPageContext) => {
  let article = null;
  try {
    article = await getArticlePreview({
      id: processNextQueryStringParam(ctx.query.id)
    });
  } catch(e) {

  }

  let seo: SEOProps = {
    title: article?.title,
    type: 'article'
  };

  if (article?.abstract) {
    seo.description = article.abstract;
  }

  if (article?.media[0]) {
    seo.imageSrc = article.media[0].url;
  }

  return { 
    article,
    articleId: processNextQueryStringParam(ctx.query.id),
    seo
  };
};

export default Article;