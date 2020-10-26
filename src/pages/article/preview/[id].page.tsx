import * as React from 'react';
import { NextPageContext } from 'next';
import { GetArticle, getArticlePreview } from '../../../shared/src/client';
import { hyphenatedToCapitalized } from '../../../shared/src/utils';
import { SEOProps, Section, Grid, Text, Newsletter, Divider, Byline, AspectRatioImage, HTML, Ad, Sticky, Semantic, Donate, Link } from '../../../components';
import NotFound from '../../404.page';
import { imgix, processNextQueryStringParam } from '../../../utils';
import { theme } from '../../../constants';
import Styles from './[id].styles';
const { classNames, StyleSheet } = Styles;

function Article({
  initialArticle,
  articleId
}: {
  initialArticle: GetArticle | null,
  articleId: string
}) {
  const [ article, setArticle ] = React.useState<GetArticle | null>(initialArticle);

  React.useEffect(() => {
    async function refresh() {
      try {
        setArticle(
          await getArticlePreview({
            id: processNextQueryStringParam(articleId)
          })
        );
      } catch(err) {
        setArticle(null);
      }
    }
    window.addEventListener("focus", refresh); 
    return () => window.removeEventListener("focus", refresh);
  }, [articleId]);


  if(!article) {
    return <NotFound/>;
  }

  const photoCredit = article.media[0]?.credits;
  const photoDescription = article.media[0]?.description ?? '';
  
  return (
    <>
      <Section className={classNames.page}>
      
        <Grid.Row 
          spacing={theme.spacing(4)}
          cols={[ '1fr', '1px', 'minmax(auto, 300px)' ]}
          disableGridOnPrit
        >
          <Grid.Col xs={3} xl={1}>
            <Semantic role='main' skipNavContent pritable>
            {article.category ? (
                <Link 
                  className={classNames.category}
                  href={`/section/${article.category.toLowerCase()}`}
                >
                  {hyphenatedToCapitalized(article.category)}
                </Link>
              ) : null}
              
              <Semantic role='article'>
                <header>
                  <Text 
                    variant='h1' 
                    htmlTag='h1'
                    className={classNames.title}
                  >
                    {article.title}
                  </Text>
                  
                  <Byline.Authors 
                    authors={article.authors ?? []}
                    publishDate={article.publishDate}
                  />

                  {article.media[0]?.url ? (
                    <figure className={classNames.fullWidth}>
                      <Section.OffsetPadding className={classNames.photoWrap}>
                        <AspectRatioImage
                          aspectRatio={16 / 9}
                          data={imgix(article.media[0].url, {
                            xs: imgix.presets.md('16:9'),
                            md: imgix.presets.xl('16:9')
                          })}
                          altText={`${photoDescription} – Photo by ${photoCredit}`}
                        />
                      </Section.OffsetPadding>
                      <figcaption className={classNames.figcaption} aria-hidden={true}>
                        Photo by {photoCredit}
                        <div className={classNames.captionSpacer}/>
                        {photoDescription}
                      </figcaption>
                    </figure>
                  ) : null}
                </header>

                <Divider className={classNames.divider}/>

                <HTML 
                  ads
                  html={article.body} 
                />
              </Semantic>
            </Semantic>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{height: '100%', overflow: 'hidden'}}>
            <Divider.Vertical/>
          </Grid.Col>

          <Grid.Col xs={0} xl={1} style={{height: '100%'}}>
            <Sticky>
              <Semantic role='aside'>
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
              </Semantic>
            </Sticky>
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

      {StyleSheet}
    </>
  );
}

Article.getInitialProps = async (ctx: NextPageContext) => {
  let article = null;
  try {
    article = await getArticlePreview({
      id: processNextQueryStringParam(ctx.query.id)
    });
  } catch(e) {}

  const keywords = [
    ...(article?.tags ?? []),
    article?.category
  ].join(', ');

  let seo: SEOProps = {
    title: article?.title,
    type: 'article',
    author: article?.authors?.map(author => author.displayName).join(', '),
    keywords
  };

  if (article?.abstract) {
    seo.description = article.abstract;
  }

  if (article?.media[0]) {
    seo.imageSrc = article.media[0].url;
  }

  return { 
    initialArticle: article,
    articleId: processNextQueryStringParam(ctx.query.id),
    seo
  };
};

export default Article;