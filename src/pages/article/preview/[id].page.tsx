import React from 'react';
import { NextPageContext } from 'next';
import { GetArticle, getArticlePreview } from '../../../shared/src/client';
import { SEOProps, Section, Grid, Text, Newsletter, Divider, Byline, AspectRatioImage, HTML, Ad, Sticky, Semantic, AdBlockDector, Donate } from '../../../components';
import NotFound from '../../404.page';
import { imgix, processNextQueryStringParam } from '../../../utils';
import styles from './[id].module.scss';
import { theme } from '../../../constants';

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
      <Section.StickyContainer className={styles.page}>
      
        <Grid.Row 
          spacing={theme.spacing(4)}
          cols={[ '1fr', '1px', 'minmax(auto, 300px)' ]}
          disableGridOnPrit
        >
          <Grid.Col xs={3} xl={1}>
            <Semantic role='main' skipNavContent pritable>
              <Semantic role='article'>
                <header>
                  <Text 
                    variant='h1' 
                    htmlTag='h1'
                    className={styles.title}
                  >
                    {article.title}
                  </Text>
                  
                  <Byline.Authors 
                    authors={article.authors}
                    publishDate={article.publishDate}
                  />

                  <figure className={styles.fullWidth}>
                    <Section.OffsetPadding className={styles.photoWrap}>
                      <AspectRatioImage
                        aspectRatio={16 / 9}
                        data={imgix(article.media[0]?.url ?? '', {
                          xs: imgix.presets.md('16:9'),
                          md: imgix.presets.xl('16:9')
                        })}
                        altText={`${photoDescription} – Photo by ${photoCredit}`}
                      />
                    </Section.OffsetPadding>
                    <figcaption className={styles.figcaption} aria-hidden={true}>
                      Photo by {photoCredit}
                      <div className={styles.captionSpacer}/>
                      {photoDescription}
                    </figcaption>
                  </figure>
                </header>

                <Divider className={styles.divider}/>

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

          <Grid.Col xs={0} xl={1}>
            <Sticky>
              <Semantic role='aside'>
                <Ad type='rectange' style={{ marginBottom: '1rem' }} />
                <Ad type='skyscraper' />
                <AdBlockDector>
                  <Donate.SidebarCard/>
                </AdBlockDector>
              </Semantic>
            </Sticky>
          </Grid.Col>

        </Grid.Row>

      </Section.StickyContainer>

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
    initialArticle: article,
    articleId: processNextQueryStringParam(ctx.query.id),
    seo
  };
};

export default Article;