import React from 'react';
import { NextPageContext } from 'next';
import { GetArticle, getArticlePreview } from '../../shared/src/client';
import { SEOProps, Section, Theme, HTML, Grid, Text, Newsletter, Divider, Byline, Br, Navbar } from '../../components';
import NotFound from '../404';

function HighlightedImage({
  src,
  title
}: {
  src: string,
  title: string
}) {
  return (
    <div 
      style={{
        maxHeight: '75vh',
        backgroundImage: `url(${src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <div style={{
        paddingTop: '50%'
      }}/>
      <div style={{
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7), transparent)',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }}/>
      <div style={{
        position: 'absolute',
        bottom: 30,
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}>
        <Text variant='h1' style={{
          color: '#fff',
          textAlign: 'center',
          width: '80%',
          maxWidth: 750,
          fontSize: 'calc(1rem + 2vw)'
        }}>{title}</Text>
      </div>
    </div>
  );
}

function Article({
  article,
  articleId
}: {
  article: GetArticle | null,
  articleId: string
}) {
  Navbar.useDynamicHeader();
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const {spacing} = Theme.useTheme();

  const [dynamicArticle, setDynamicArticle] = React.useState<GetArticle | null>(article);

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
      <HighlightedImage 
        src={dynamicArticle.media[0]+'?ar=16:9&fit=crop&crop=faces,center'}
        title={dynamicArticle.title}
      />
      <Section className={classes.page}>
        <Grid.Row spacing={spacing(6)}>
          <Grid.Col xs={24} md={0} lg='250px'>
          </Grid.Col>
          <Grid.Col>
            {/* <Text variant='h1'>{article.title}</Text> */}
            <Byline.Authors authors={dynamicArticle.authors}/>
            <Byline.Date 
              updatedAt={dynamicArticle.updatedAt} 
              publishDate={dynamicArticle.publishDate}
            />
            <Divider/>
            <Br/>
            <HTML html={dynamicArticle.body}/>
          </Grid.Col>

          <Grid.Col xs={0} md='250px'>
            <div style={{backgroundColor: '#eee', flex: 1, display: 'flex', height: '100%'}}>
              <span>Ad</span>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Divider/>
      <Section className={classes.page}>
        <Grid.Row spacing={spacing(6)}>
          <Grid.Col xs={24} md={0} lg='250px'></Grid.Col>
          <Grid.Col>
            <Text variant='h2'>Comments</Text>
          </Grid.Col>
          <Grid.Col xs={24} md='250px'></Grid.Col>
        </Grid.Row>
      </Section>

      <Divider/>
      <Newsletter.Section/>
    </>
  );
}

function processNextQueryStringParam(str: string | string[] | undefined) {
  if(typeof str === 'object') {
    return str[0]
  } else {
    return str || '';
  }
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
  page: Section.style.page(theme),
  image: {
    width: '100%',
    height: 'auto'
  }
}));

export default Article;