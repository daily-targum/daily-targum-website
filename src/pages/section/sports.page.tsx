import * as React from "react";
import { actions, GetArticles } from "../../aws";
import {
  Section,
  Grid,
  LoadMoreButton,
  ActivityIndicator,
  Card,
  CardCols,
  Banner,
  TagBar,
  Divider,
  SEOProps,
  Text,
  Semantic,
} from "../../components";
import { imgix, formatDateAbbreviated, chopArray } from "../../utils";
import { useRouter } from "next/router";
import { useSports } from "../../machines";
import styles from "./sports.module.scss";
import { theme, next } from "../../constants";

function Category({ initialArticles }: { initialArticles: GetArticles }) {
  const router = useRouter();

  const subcategories = initialArticles.subcategories;
  const firstFiveArticles = initialArticles.items[0].articles.slice(0, 5);
  const restArticles = initialArticles.items[0].articles.slice(5);

  const {
    selectedArticles,
    loadMore,
    loading,
    outOfContent,
    selectedTag,
    setSelectedTag,
  } = useSports({
    initialArticles: restArticles,
    subcategories,
  });

  if (router.isFallback) {
    return <ActivityIndicator.Screen />;
  }

  return (
    <Section className={styles.page}>
      <Semantic role="main" pritable skipNavContent>
        <Banner text="Sports" legacy />

        <Grid.Row spacing={theme.spacing(2)} cols={["2fr", "1fr", "1fr"]}>
          <CardCols items={chopArray(firstFiveArticles, [1, 2, 2])}>
            {(article, i) => {
              if (!article) {
                return null;
              }

              return i === 0 ? (
                article[0] ? (
                  <Card.ImageResponsive
                    id={article[0].id}
                    title={article[0].title}
                    imageData={imgix(article[0].media[0]?.url ?? "", {
                      xs: imgix.presets.sm("1:1"),
                      md: imgix.presets.md("4:3"),
                    })}
                    href="/article/[year]/[month]/[slug]"
                    as={"/" + article[0].slug}
                    date={formatDateAbbreviated(article[0].publishDate)}
                    author={article[0].authors
                      .map((a) => a.displayName)
                      .join(", ")}
                    altText={
                      article[0].media[0]?.altText ??
                      article[0].media[0]?.description ??
                      undefined
                    }
                  />
                ) : null
              ) : (
                <>
                  {article[0] ? (
                    <Card.ImageResponsive
                      id={article[0].id}
                      title={article[0].title}
                      imageData={imgix(article[0].media[0]?.url ?? "", {
                        xs: imgix.presets.sm("1:1"),
                        md: imgix.presets.md("3:2"),
                      })}
                      href="/article/[year]/[month]/[slug]"
                      as={"/" + article[0].slug}
                      aspectRatioDesktop={3 / 2}
                      date={formatDateAbbreviated(article[0].publishDate)}
                      author={article[0].authors
                        .map((a) => a.displayName)
                        .join(", ")}
                      altText={
                        article[0].media[0]?.altText ??
                        article[0].media[0]?.description ??
                        undefined
                      }
                    />
                  ) : null}

                  <Card.Spacer />

                  {article[1] ? (
                    <Card.ImageResponsive
                      id={article[1].id}
                      title={article[1].title}
                      imageData={imgix(article[1].media[0]?.url ?? "", {
                        xs: imgix.presets.sm("1:1"),
                        md: imgix.presets.md("3:2"),
                      })}
                      href="/article/[year]/[month]/[slug]"
                      as={"/" + article[1].slug}
                      aspectRatioDesktop={3 / 2}
                      date={formatDateAbbreviated(article[1].publishDate)}
                      author={article[1].authors
                        .map((a) => a.displayName)
                        .join(", ")}
                      altText={
                        article[1].media[0]?.altText ??
                        article[1].media[0]?.description ??
                        undefined
                      }
                    />
                  ) : null}
                </>
              );
            }}
          </CardCols>
        </Grid.Row>

        <Card.Spacer />
        <Card.Spacer />
        <Divider />
        <Card.Spacer />
        <TagBar
          // THIS IS A HACK
          tags={subcategories.sort()}
          value={selectedTag}
          onChange={setSelectedTag}
        />
        <Card.Spacer />
        <Card.Spacer />

        <Grid.Row spacing={theme.spacing(2)}>
          {selectedArticles.map((item) =>
            item ? (
              <Grid.Col key={item.id} xs={24} md={12} lg={8}>
                <Card.StackedResponsive
                  imageData={imgix(item.media[0]?.url ?? "", {
                    xs: imgix.presets.sm("1:1"),
                    md: imgix.presets.md("16:9"),
                  })}
                  title={item.title}
                  href="/article/[year]/[month]/[slug]"
                  as={"/" + item.slug}
                  date={formatDateAbbreviated(item.publishDate)}
                  aspectRatioDesktop={16 / 9}
                  author={item.authors.map((a) => a.displayName).join(", ")}
                  altText={
                    item.media[0]?.altText ??
                    item.media[0]?.description ??
                    undefined
                  }
                />
              </Grid.Col>
            ) : null
          )}
        </Grid.Row>
      </Semantic>

      {!outOfContent ? (
        <LoadMoreButton
          key={selectedTag}
          handleLoad={loadMore}
          loading={loading}
        />
      ) : (
        <Text style={{ textAlign: "center", display: "block" }}>
          No {selectedArticles.length === 0 ? "more " : ""}articles.
        </Text>
      )}
    </Section>
  );
}

export async function getStaticProps() {
  const initialArticles = await actions.getArticles({
    category: "Sports",
    limit: 100,
  });

  const seo: SEOProps = {
    title: "Sports",
  };

  const firstArticle = initialArticles?.items?.[0].articles?.[0];
  if (firstArticle?.media?.[0]?.url) {
    seo.imageSrc = firstArticle.media[0].url;
  }

  return {
    props: {
      initialArticles: initialArticles ?? null,
      seo,
    },
    revalidate: next.staticPropsRevalidateSeconds,
  };
}

export default Category;
