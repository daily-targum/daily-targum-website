import Card from "./Card";
import Grid from "./Grid/web";
import Text from "./Text";
import Divider from "./Divider";
import { imgix, formatDateAbbreviated } from "../utils";
import { GetArticle, GetArticles } from "../aws";

/*

The RelatedArticles component fetches articles from the same category as the article
currently being viewed. The design is a 2x2 grid that turns into a single column flexbox
when viewed on mobile or smaller sized displays.

*/

export function RelatedArticles({
  currentArticle,
  articles,
  classNames,
  theme,
}: {
  currentArticle: GetArticle;
  articles: GetArticles;
  classNames: any;
  theme: any;
}) {
  const currentArticleID = currentArticle.id;
  const filteredArticles = articles.items[0].articles.filter(
    (art) => art.id !== currentArticleID
  );
  // const article1 = filteredArticles[0];
  // const article2 = filteredArticles[1];
  // const article3 = filteredArticles[2];
  // const article4 = filteredArticles[3];

  return filteredArticles.length < 4 ? (
    <></>
  ) : (
    <>
      <Divider className={classNames.divider} />
      <Text style={{}} variant="h2" htmlTag="h3" className={classNames.title}>
        Related Articles
      </Text>

      <Grid.RowRelated cols={2} spacing={theme.spacing(10)}>
        <Grid.Col style={{ maxWidth: "100%" }}>
          <Card.CompactResponsiveRelated
            id={filteredArticles[0].id}
            title={filteredArticles[0].title}
            imageData={imgix(filteredArticles[0].media[0]?.url ?? "", {
              xs: imgix.presets.md("1:1"),
              md: imgix.presets.md("6:4"),
            })}
            href="/article/[year]/[month]/[slug]"
            as={`/${filteredArticles[0].slug}`}
            aspectRatioMobile={1}
            aspectRatioDesktop={6 / 4}
            date={formatDateAbbreviated(filteredArticles[0].publishDate)}
            author={filteredArticles[0].authors
              .map((a) => a.displayName)
              .join(", ")}
            altText={
              filteredArticles[0].media[0]?.altText ??
              filteredArticles[0].media[0]?.description ??
              undefined
            }
          />

          <Card.CompactResponsiveRelated
            id={filteredArticles[1].id}
            style={{}}
            title={filteredArticles[1].title}
            imageData={imgix(filteredArticles[1].media[0]?.url ?? "", {
              xs: imgix.presets.md("1:1"),
              md: imgix.presets.md("6:4"),
            })}
            href="/article/[year]/[month]/[slug]"
            as={`/${filteredArticles[1].slug}`}
            aspectRatioMobile={1}
            aspectRatioDesktop={6 / 4}
            date={formatDateAbbreviated(filteredArticles[1].publishDate)}
            author={filteredArticles[1].authors
              .map((a) => a.displayName)
              .join(", ")}
            altText={
              filteredArticles[1].media[0]?.altText ??
              filteredArticles[1].media[0]?.description ??
              undefined
            }
          />
        </Grid.Col>
        <Grid.Col style={{ maxWidth: "100%" }}>
          <Card.CompactResponsiveRelated
            id={filteredArticles[2].id}
            style={{}}
            title={filteredArticles[2].title}
            imageData={imgix(filteredArticles[2].media[0]?.url ?? "", {
              xs: imgix.presets.md("1:1"),
              md: imgix.presets.md("6:4"),
            })}
            href="/article/[year]/[month]/[slug]"
            as={`/${filteredArticles[2].slug}`}
            aspectRatioMobile={1}
            aspectRatioDesktop={6 / 4}
            date={formatDateAbbreviated(filteredArticles[2].publishDate)}
            author={filteredArticles[2].authors
              .map((a) => a.displayName)
              .join(", ")}
            altText={
              filteredArticles[2].media[0]?.altText ??
              filteredArticles[2].media[0]?.description ??
              undefined
            }
          />
          <Card.CompactResponsiveRelated
            id={filteredArticles[3].id}
            style={{}}
            title={filteredArticles[3].title}
            imageData={imgix(filteredArticles[3].media[0]?.url ?? "", {
              xs: imgix.presets.md("1:1"),
              md: imgix.presets.md("6:4"),
            })}
            href="/article/[year]/[month]/[slug]"
            as={`/${filteredArticles[3].slug}`}
            aspectRatioMobile={1}
            aspectRatioDesktop={6 / 4}
            date={formatDateAbbreviated(filteredArticles[3].publishDate)}
            author={filteredArticles[3].authors
              .map((a) => a.displayName)
              .join(", ")}
            altText={
              filteredArticles[3].media[0]?.altText ??
              filteredArticles[3].media[0]?.description ??
              undefined
            }
          />
        </Grid.Col>
      </Grid.RowRelated>
    </>
  );
}
