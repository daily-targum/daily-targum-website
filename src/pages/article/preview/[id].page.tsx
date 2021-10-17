import * as React from "react";
import { NextPageContext } from "next";
import { GetArticle, getArticlePreview } from "../../../aws";
import {
  hyphenatedToCapitalized /*extractTextFromHTML*/,
} from "../../../utils";
import {
  SEOProps,
  Section,
  Grid,
  Text,
  Newsletter,
  Divider,
  Byline,
  //AspectRatioImage,
  ArticleImage,
  HTML,
  AdSense,
  Sticky,
  Semantic,
  Donate,
  Link,
} from "../../../components";
import NotFound from "../../404.page";
import {
  //imgix,
  processNextQueryStringParam,
  styleHelpers,
} from "../../../utils";
import { theme } from "../../../constants";
import { useRouter } from "next/router";

import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { AiFillPrinter } from "react-icons/ai";

import Styles from "./[id].styles";
const { classNames, StyleSheet } = Styles;

function ShareSidebar({ article }: { article: GetArticle }) {
  const router = useRouter();

  const articlePath = `https://dailytargum.com${router.asPath}`;

  return (
    <div className={classNames.shareSidebar}>
      <Text variant="h3">Share</Text>
      <div className={classNames.shareIcons}>
        <FacebookShareButton
          url={articlePath}
          title={article.title}
          className={classNames.shareIcon}
        >
          <FacebookIcon
            size={42}
            round
            iconFillColor={styleHelpers.color("background_main")}
            bgStyle={{ fill: styleHelpers.color("textMuted") }}
          />
        </FacebookShareButton>

        <TwitterShareButton
          url={articlePath}
          title={article.title ?? undefined}
          className={classNames.shareIcon}
        >
          <TwitterIcon
            size={42}
            round
            iconFillColor={styleHelpers.color("background_main")}
            bgStyle={{ fill: styleHelpers.color("textMuted") }}
          />
        </TwitterShareButton>

        <RedditShareButton
          url={articlePath}
          title={article.title}
          className={classNames.shareIcon}
        >
          <RedditIcon
            size={42}
            round
            iconFillColor={styleHelpers.color("background_main")}
            bgStyle={{ fill: styleHelpers.color("textMuted") }}
          />
        </RedditShareButton>

        <LinkedinShareButton
          url={articlePath}
          title={article.title}
          className={classNames.shareIcon}
        >
          <LinkedinIcon
            size={42}
            round
            iconFillColor={styleHelpers.color("background_main")}
            bgStyle={{ fill: styleHelpers.color("textMuted") }}
          />
        </LinkedinShareButton>

        <EmailShareButton
          url={articlePath}
          subject={article.title}
          body={article.abstract ?? undefined}
          className={classNames.shareIcon}
        >
          <EmailIcon
            size={42}
            round
            iconFillColor={styleHelpers.color("background_main")}
            bgStyle={{ fill: styleHelpers.color("textMuted") }}
          />
        </EmailShareButton>

        <button className={classNames.printIcon} onClick={() => window.print()}>
          <AiFillPrinter
            style={{ fill: styleHelpers.color("background_main") }}
          />
        </button>
      </div>
    </div>
  );
}

function Article({
  initialArticle,
  articleId,
}: {
  initialArticle: GetArticle | null;
  articleId: string;
}) {
  const [article, setArticle] = React.useState<GetArticle | null>(
    initialArticle
  );

  React.useEffect(() => {
    async function refresh() {
      try {
        setArticle(
          await getArticlePreview({
            id: processNextQueryStringParam(articleId),
          })
        );
        //console.log("I am here");
      } catch (err) {
        //console.log("I am here");
        setArticle(null);
      }
    }
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [articleId]);

  if (!article) {
    return <NotFound />;
  }
  console.log(article);

  //const photoCredit = article.media[0]?.credits;
  //const photoDescription = extractTextFromHTML(
  //  article.media[0]?.description ?? ""
  //);

  return (
    <>
      <Section className={classNames.page}>
        <Grid.Row
          spacing={theme.spacing(3)}
          cols={["1fr", "1px", "minmax(auto, 65ch)", "1px", "1fr"]}
          disableGridOnPrit
        >
          <Grid.Col xs={5} xl={1} style={{ height: "100%" }}>
            <Sticky>
              <ShareSidebar article={article} />
            </Sticky>
          </Grid.Col>

          <Grid.Col
            xs={0}
            xl={1}
            style={{ height: "100%", overflow: "hidden" }}
          >
            <Divider.Vertical />
          </Grid.Col>

          <Grid.Col xs={5} md={3} xl={1}>
            <Semantic role="main" skipNavContent pritable>
              {article.category ? (
                <Link
                  className={classNames.category}
                  href={`/section/${article.category.toLowerCase()}`}
                >
                  {hyphenatedToCapitalized(article.category)}
                </Link>
              ) : null}

              <Semantic role="article">
                <header>
                  <Text variant="h1" htmlTag="h1" className={classNames.title}>
                    {article.title}
                  </Text>

                  <Byline.Authors
                    authors={article.authors}
                    publishDate={article.publishDate}
                  />

                  {article.media[0]?.url ? (
                    <ArticleImage article={article} classNames={classNames} />
                  ) : null}
                  {/* {article.media[0]?.url ? (
                    <figure className={classNames.fullWidth}>
                      <Section.OffsetPadding className={classNames.photoWrap}>
                        <AspectRatioImage
                          aspectRatio={16 / 9}
                          data={imgix(article.media[0].url, {
                            xs: imgix.presets.md("16:9"),
                            md: imgix.presets.xl("16:9"),
                          })}
                          altText={`${photoDescription} – Photo by ${photoCredit}`}
                        />
                      </Section.OffsetPadding>
                      <figcaption
                        className={classNames.figcaption}
                        aria-hidden={true}
                      >
                        Photo by {photoCredit}
                        <div className={classNames.captionSpacer} />
                        {photoDescription}
                      </figcaption>
                    </figure>
                  ) : null} */}
                </header>

                <Divider className={classNames.divider} />

                <HTML html={article.body} />
              </Semantic>
            </Semantic>

            <Grid.Display xs={true} md={false}>
              <ShareSidebar article={article} />
            </Grid.Display>
          </Grid.Col>

          <Grid.Col
            xs={0}
            md={1}
            style={{ height: "100%", overflow: "hidden" }}
          >
            <Divider.Vertical />
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{ height: "100%" }}>
            <Sticky>
              <AdSense type="sidebar" fallback={<Donate.SidebarCard />} />
            </Sticky>
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Divider />
      <Newsletter.Section />

      {StyleSheet}
    </>
  );
}

Article.getInitialProps = async (ctx: NextPageContext) => {
  let article = null;
  try {
    article = await getArticlePreview({
      id: processNextQueryStringParam(ctx.query.id),
    });
    //console.log(`article = ${article}`);
  } catch (e) {
    //console.log(e);
  }

  const keywords = [...(article?.tags ?? []), article?.category].join(", ");

  let seo: SEOProps = {
    title: article?.title,
    type: "article",
    author: article?.authors?.map((author) => author.displayName).join(", "),
    keywords,
  };

  if (article?.abstract) {
    seo.description = article.abstract;
  }

  if (article?.media[0]) {
    const media = article.media[0];
    seo.imageSrc = media.url;
    seo.imageAlt = `${media.description} – Photo by ${media.credits}`;
  }

  return {
    initialArticle: article,
    articleId: processNextQueryStringParam(ctx.query.id),
    seo,
  };
};

export default Article;
