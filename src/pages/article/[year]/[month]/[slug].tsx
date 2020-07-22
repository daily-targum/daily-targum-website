import React from 'react';
import { NextPageContext } from 'next';
import { actions, GetArticle } from '../../../../shared/src/client';
import { SEOProps, Section, Theme, HTML, Grid, Text, Newsletter, Divider, Byline, Br, AspectRatioImage } from '../../../../components';
import NotFound from '../../../404';
import { styleHelpers } from '../../../../utils';


function Article({
  article 
}: {
  article: GetArticle
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const { spacing } = Theme.useTheme();

  if(!article) return <NotFound/>;
  
  return (
    <>
      <Section className={classes.page}>
        <Grid.Row 
          spacing={spacing(4)}
          cols={['165px', '1fr', '165px']}
        >
          <Grid.Col xs={0} lg={1}/>

          <Grid.Col xs={3} lg={1}>
            <article>
              <Text variant='h1'>{article.title}</Text>
              <Byline.Authors 
                authors={article.authors}
                updatedAt={article.updatedAt} 
                publishDate={article.publishDate}
              />
              <AspectRatioImage
                aspectRatio={16 / 9}
                src={article.media[0]+'?ar=16:9&fit=crop&crop=faces,center'}
              />
              <Br/>
              <HTML html={article.body}/>
            </article>
          </Grid.Col>

          <Grid.Col xs={0} lg={1}>
            <div style={{backgroundColor: '#eee', flex: 1, display: 'flex', height: '100%'}}>
              <span>Ad</span>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Section>

      {/* <Divider/>
      <Section className={classes.page}>
        <Grid.Row 
          spacing={spacing(4)}
          cols={['165px', '1fr', '165px']}
        >
          <Grid.Col xs={3} md={0} lg={1}></Grid.Col>
          <Grid.Col>
            <Text variant='h2'>Comments</Text>
          </Grid.Col>
        </Grid.Row>
      </Section> */}

      <Divider/>
      <Newsletter.Section/>
    </>
  );
}

Article.getInitialProps = async (ctx: NextPageContext) => {
  const article = await actions.getArticle({
    slug: ctx.asPath?.replace(/(^\/|\/$)/g, '') as string
  });
  const seo: SEOProps = {
    pathname: `/${ctx.query.slug}`,
    title: article?.title,
    type: 'article',
    description: article?.abstract ? article?.abstract : undefined
  };
  return { 
    article,
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