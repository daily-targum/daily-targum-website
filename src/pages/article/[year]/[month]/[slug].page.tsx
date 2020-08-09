import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { actions, GetArticle } from '../../../../shared/src/client';
import { SEOProps, Section, Theme, Grid, Text, Newsletter, Divider, Byline, Br, AspectRatioImage, ActivityIndicator } from '../../../../components';
import HTML from '../../../../components/HTML';
import NotFound from '../../../404.page';
import { styleHelpers, imgix, processNextQueryStringParam } from '../../../../utils';
import { useRouter } from 'next/router';


function Article({
  article 
}: {
  article: GetArticle
}) {
  const router = useRouter();
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (!article) {
    return <NotFound/>;
  }
  
  return (
    <>
      <Section style={styles.page}>
        <Grid.Row 
          spacing={theme.spacing(4)}
          cols={['165px', '1fr', '165px']}
        >
          <Grid.Col xs={0} lg={1}/>

          <Grid.Col xs={3} lg={1}>
            <main>
              <article>
                <Text variant='h1' htmlTag='h1'>{article.title}</Text>
                <Byline.Authors 
                  authors={article.authors}
                  updatedAt={article.updatedAt} 
                  publishDate={article.publishDate}
                />
                <AspectRatioImage
                  aspectRatio={16 / 9}
                  src={imgix(article.media[0], imgix.presets.sixteenByNine.xl)}
                />
                <Br/>
                <HTML html={article.body}/>
              </article>
            </main>
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const year = processNextQueryStringParam(ctx.params?.year, '');
  const month = processNextQueryStringParam(ctx.params?.month, '');
  const slug = processNextQueryStringParam(ctx.params?.slug, '');

  const article = await actions.getArticle({
    slug: `article/${year}/${month}/${slug}`
  });

  let seo: SEOProps = {
    pathname: `/article/${year}/${month}/${slug}`,
    title: article?.title,
    type: 'article'
  };

  if (article?.abstract) {
    seo.description = article.abstract;
  }

  if (article?.media[0]) {
    seo.imageSrc = article.media[0];
  }

  return {
    props: { 
      article,
      seo
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () =>  {
  return {
    paths: [],
    fallback: true
  };
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: styleHelpers.page(theme),
  image: {
    width: '100%',
    height: 'auto'
  }
}));

export default Article;