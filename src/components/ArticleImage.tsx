import { GetArticle } from "../aws";
import { ImageSlider, ImageFigure } from "./";
import { extractTextFromHTML } from "../utils";

export function ArticleImage({
  classNames,
  article,
}: {
  classNames?: any;
  article: GetArticle;
}) {
  const photoCredit = article.media[0].credits;
  const photoDescription = extractTextFromHTML(
    article.media[0]?.description ?? ""
  );
  const photoURL = article.media[0].url;
  return article?.media?.length == 1 ? (
    <ImageFigure
      classNames={classNames}
      photoCredit={photoCredit}
      photoDescription={photoDescription}
      photoURL={photoURL}
    />
  ) : (
    <ImageSlider classNames={classNames} mediaArray={article.media} />
  );
}

// <figure className={classNames.fullWidth}>
//   <Section.OffsetPadding className={classNames.photoWrap}>
//     <AspectRatioImage
//       aspectRatio={16 / 9}
//       data={imgix(article?.media[0]?.url ?? "", {
//         xs: imgix.presets.md("16:9"),
//         md: imgix.presets.xl("16:9"),
//       })}
//       altText={`${photoDescription} – Photo by ${photoCredit}`}
//     />
//   </Section.OffsetPadding>
//   <figcaption className={classNames.figcaption} aria-hidden={true}>
//     Photo by {photoCredit}
//     <div className={classNames.captionSpacer} />
//     {photoDescription}
//   </figcaption>
// </figure>
