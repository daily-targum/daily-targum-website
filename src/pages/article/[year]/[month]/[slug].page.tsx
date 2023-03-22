import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { AiFillPrinter } from "react-icons/ai";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { actions, GetArticle, GetArticles } from "../../../../aws";
import {
  ActivityIndicator,
  AdSense,
  //AspectRatioImage,
  Byline,
  //Card,
  Divider,
  Donate,
  Grid,
  HTML,
  Link,
  Newsletter,
  RelatedArticles,
  Section,
  Semantic,
  SEOProps,
  Sticky,
  Text,
  //ImageSlider,
  ArticleImage,
} from "../../../../components";
import {
  //imgix,
  processNextQueryStringParam,
  styleHelpers,
  hyphenatedToCapitalized,
  //extractTextFromHTML,
  //formatDateAbbreviated,
} from "../../../../utils";
import NotFound from "../../../404.page";
import Styles from "./[slug].styles";
import { next, theme } from "../../../../constants";

const { classNames, StyleSheet } = Styles;

function ShareSidebar({ article }: { article: GetArticle }) {
  //console.log(article);
  const router = useRouter();

  const articlePath = `https://dailytargum.com${router.asPath}`;

  return (
    <div className={classNames.shareSidebar}>
      {/* <Text variant="h3">Share</Text> */}
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
  article,
  articles,
  embedded,
}: {
  article: GetArticle;
  articles: GetArticles;
  embedded: boolean;
}) {
  const router = useRouter();
  if (router.isFallback) {
    return <ActivityIndicator.Screen />;
  }

  if (!article) {
    return <NotFound />;
  }

  if (!articles) {
    return <NotFound />;
  }

  // const photoCredit = article.media[0]?.credits;
  // const photoDescription = extractTextFromHTML(
  //   article.media[0]?.description ?? ""
  // );
  //console.log(article);
  //if (embedded) {
  //  console.log("Embedded article");
  //} else {
  //  console.log("not an embedded article");
  //}

  return (
    <>
      <Section className={classNames.page}>
        <Grid.Row
          spacing={theme.spacing(3)}
          cols={["minmax(auto, 115ch)", "1px", "1fr"]}
          disableGridOnPrit
        >
          {/* <Grid.Col xs={5} xl={1} style={{ height: "100%" }}>
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
          </Grid.Col> */}
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
                  {article.heading ? (
                    <div>
                      {/* <Divider className={classNames.divider} /> */}
                      <Text
                        variant="p"
                        htmlTag="p"
                        className={classNames.heading}
                      >
                        {article.heading}
                      </Text>
                    </div>
                  ) : null}

                  <div style={{
                    display:'flex',
                    justifyContent: 'space-between'
                  }}>
                  <Byline.Authors
                    authors={article.authors}
                    publishDate={article.publishDate}
                  />

                  <ShareSidebar article={article} />
                  </div>
                  {article.media[0]?.url ? (
                    <ArticleImage
                      article={article}
                      classNames={classNames}
                      embedded={embedded}
                    />
                  ) : null}
                </header>
                <Divider className={classNames.divider} />

                <HTML
                  html={article.body}
                  embedded={embedded}
                  media={article.media}
                  classNames={classNames}
                />
              </Semantic>

              <RelatedArticles
                currentArticle={article}
                articles={articles}
                classNames={classNames}
                theme={theme}
              />
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
              <div style={{height: "1.75ch"}}> </div>
              <AdSense type="sidebar"/>
              
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const year = processNextQueryStringParam(ctx.params?.year, "");
  const month = processNextQueryStringParam(ctx.params?.month, "");
  const slug = processNextQueryStringParam(ctx.params?.slug, "");
  const regex = /<INSERT IMAGE>/g;

  let article = null;
  let articles = null;
  let embedded = false;
  try {
    article = await actions.getArticle({
      slug: `article/${year}/${month}/${slug}`,
    });
  } catch (e) {}
  try {
    //console.log(article?.tags?.slice(0, 4));
    articles = await actions.getArticlesByTag({
      category: `${article?.category}`,
      tagArray: article?.tags?.slice(0, 4) ?? [""],
      limit: 10,
    });
    //console.log(articles.items[0].articles);
  } catch (e) {}

  if (!article) {
    return {
      props: {},
      revalidate: next.staticPropsRevalidateSeconds,
    };
  }

  if (!articles) {
    return {
      props: {},
      revalidate: next.staticPropsRevalidateSeconds,
    };
  }
  //console.log(article);
  const pathname = `/article/${year}/${month}/${slug}`;
  const preferedSlug = `/${article.slug}`;

  const keywords = [...(article.tags ?? []), article.category].join(", ");

  let seo: SEOProps = {
    pathname: preferedSlug,
    title: article?.title,
    type: "article",
    author: article?.authors.map((author) => author.displayName).join(", "),
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

  if (pathname !== preferedSlug) {
    seo.canonical = preferedSlug;
  }

  if (article?.body) {
    const found = article.body.match(regex);
    if (found) {
      embedded = true;
    }
  }

  return {
    props: {
      article: article ?? null,
      articles: articles ?? null,
      seo,
      embedded: embedded,
    },
    revalidate: next.staticPropsRevalidateSeconds,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
    // fallback: 'unstable_blocking'
  };
};

// export const config = { amp: 'hybrid' }

export default Article;
