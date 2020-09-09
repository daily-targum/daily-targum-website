import React from 'react';
import { NextPageContext } from 'next';
import { GetArticle, getArticlePreview } from '../../../shared/src/client';
import { SEOProps, Section, Grid, Text, Newsletter, Divider, Byline, Br, AspectRatioImage, HTML } from '../../../components';
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
      <Section className={styles.page}>
        <Grid.Row 
          spacing={theme.spacing(4)}
          cols={12}
        >
          
          <Grid.Col xs={24} md={0}/>

          <Grid.Col xs={12} md={10}>
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
            <HTML html={dynamicArticle.body}/>
          </Grid.Col>

          <Grid.Col xs={0} md={2}>
            <div style={{backgroundColor: '#eee', flex: 1, display: 'flex', height: '100%'}}>
              <span>Ad</span>
            </div>
          </Grid.Col>

        </Grid.Row>
      </Section>

      {/* <Divider/>
      <Section style={styles.page}>
        <Grid.Row spacing={theme.spacing(4)}>
          <Grid.Col xs={24} md={0}></Grid.Col>
          <Grid.Col>
            <Text variant='h2'>Comments</Text>
          </Grid.Col>
          <Grid.Col xs={24}></Grid.Col>
        </Grid.Row>
      </Section> */}

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