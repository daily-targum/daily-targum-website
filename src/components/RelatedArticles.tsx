import Card from "./Card";
import Grid from "./Grid/web";
import Text from "./Text";
import { imgix, formatDateAbriviated } from "../utils";
import { GetArticles } from "../aws";

/*

To-do:
1. Fix Component names
2. Filter out viewing article

*/

export function RelatedArticles({
  articles,
  classNames,
  theme,
}: {
  articles: GetArticles;
  classNames: any;
  theme: any;
}) {
  const article1 = articles.items[0].articles[0];
  const article2 = articles.items[0].articles[1];
  const article3 = articles.items[0].articles[2];
  const article4 = articles.items[0].articles[3];

  return (
    <>
      <Text style={{}} variant="h3" htmlTag="h3" className={classNames.title}>
        Related Articles
      </Text>

      <Grid.RowRelated spacing={theme.spacing(10)}>
        <Grid.Col>
          <Card.CompactResponsiveRelated
            id={article1.id}
            title={article1.title}
            imageData={imgix(article1.media[0]?.url ?? "", {
              xs: imgix.presets.md("1:1"),
              md: imgix.presets.md("6:4"),
            })}
            href="/article/[year]/[month]/[slug]"
            as={article1.slug}
            aspectRatioMobile={1}
            aspectRatioDesktop={6 / 4}
            date={formatDateAbriviated(article1.publishDate)}
            author={article1.authors.map((a) => a.displayName).join(", ")}
            altText={
              article1.media[0]?.altText ??
              article1.media[0]?.description ??
              undefined
            }
          />

          <Card.CompactResponsiveRelated
            id={article2.id}
            style={{}}
            title={article2.title}
            imageData={imgix(article2.media[0]?.url ?? "", {
              xs: imgix.presets.md("1:1"),
              md: imgix.presets.md("6:4"),
            })}
            href="/article/[year]/[month]/[slug]"
            as={article2.slug}
            aspectRatioMobile={1}
            aspectRatioDesktop={6 / 4}
            date={formatDateAbriviated(article2.publishDate)}
            author={article2.authors.map((a) => a.displayName).join(", ")}
            altText={
              article2.media[0]?.altText ??
              article2.media[0]?.description ??
              undefined
            }
          />
        </Grid.Col>
        <Grid.Col>
          <Card.CompactResponsiveRelated
            id={article3.id}
            style={{}}
            title={article3.title}
            imageData={imgix(article3.media[0]?.url ?? "", {
              xs: imgix.presets.md("1:1"),
              md: imgix.presets.md("6:4"),
            })}
            href="/article/[year]/[month]/[slug]"
            as={article3.slug}
            aspectRatioMobile={1}
            aspectRatioDesktop={6 / 4}
            date={formatDateAbriviated(article3.publishDate)}
            author={article3.authors.map((a) => a.displayName).join(", ")}
            altText={
              article3.media[0]?.altText ??
              article3.media[0]?.description ??
              undefined
            }
          />
          <Card.CompactResponsiveRelated
            id={article4.id}
            style={{}}
            title={article4.title}
            imageData={imgix(article4.media[0]?.url ?? "", {
              xs: imgix.presets.md("1:1"),
              md: imgix.presets.md("6:4"),
            })}
            href="/article/[year]/[month]/[slug]"
            as={article4.slug}
            aspectRatioMobile={1}
            aspectRatioDesktop={6 / 4}
            date={formatDateAbriviated(article4.publishDate)}
            author={article4.authors.map((a) => a.displayName).join(", ")}
            altText={
              article4.media[0]?.altText ??
              article4.media[0]?.description ??
              undefined
            }
          />
        </Grid.Col>
      </Grid.RowRelated>
    </>
  );
}
