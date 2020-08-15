import React from 'react';
import { NextPageContext } from 'next';
import { GetArticle, getArticlePreview } from '../../shared/src/client';
import { SEOProps, Section, Theme, Grid, Text, Newsletter, Divider, Byline, Br, AspectRatioImage, HTML } from '../../components';
import NotFound from '../404.page';
import { processNextQueryStringParam, styleHelpers, imgix } from '../../utils';

function Article({
  article,
  articleId
}: {
  article: GetArticle | null,
  articleId: string
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

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
      <Section style={styles.page}>
        <Grid.Row spacing={theme.spacing(4)}>
          <Grid.Col xs={24} md={0}>
          </Grid.Col>
          <Grid.Col>
            <Text variant='h2'>{dynamicArticle.title}</Text>
            <Byline.Authors 
              authors={dynamicArticle.authors}
              updatedAt={dynamicArticle.updatedAt} 
              publishDate={dynamicArticle.publishDate}
            />
            <AspectRatioImage
              aspectRatio={16/9}
              data={imgix(dynamicArticle.media[0], {
                xs: imgix.presets.sixteenByNine.md,
                md: imgix.presets.sixteenByNine.xl
              })}
            />
            <Br/>
            <HTML html={dynamicArticle.body}/>
          </Grid.Col>

          <Grid.Col xs={0}>
            <div style={{backgroundColor: '#eee', flex: 1, display: 'flex', height: '100%'}}>
              <span>Ad</span>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Divider/>
      <Section style={styles.page}>
        <Grid.Row spacing={theme.spacing(4)}>
          <Grid.Col xs={24} md={0}></Grid.Col>
          <Grid.Col>
            <Text variant='h2'>Comments</Text>
          </Grid.Col>
          <Grid.Col xs={24}></Grid.Col>
        </Grid.Row>
      </Section>

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
  const seo: SEOProps = {
    // pathname: `/${ctx.query.slug}`,
    title: article?.title,
    type: 'article',
    description: article?.abstract ? article?.abstract : undefined
  };
  return { 
    article,
    articleId: processNextQueryStringParam(ctx.query.id),
    seo
  };
};

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: styleHelpers.page(theme),
  image: {
    width: '100%',
    height: 'auto'
  }
}));

export default Article;