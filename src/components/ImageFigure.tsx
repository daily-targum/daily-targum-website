import { AspectRatioImage, Section } from ".";
import { imgix } from "../utils";

export function ImageFigure({
  classNames,
  photoCredit = "",
  photoDescription = "",
  photoURL = "",
}: {
  classNames?: any;
  photoCredit?: string;
  photoDescription?: string;
  photoURL?: string;
}) {
  return (
    <figure className={classNames.fullWidth}>
      <Section.OffsetPadding className={classNames.photoWrap}>
        <AspectRatioImage
          aspectRatio={16 / 9}
          data={imgix(photoURL, {
            xs: imgix.presets.md("16:9"),
            md: imgix.presets.xl("16:9"),
          })}
          altText={`${photoDescription} – Photo by ${photoCredit}`}
        />
      </Section.OffsetPadding>
      <figcaption className={classNames.figcaption} aria-hidden={true}>
        Photo by {photoCredit}
        <div className={classNames.captionSpacer} />
        {photoDescription}
      </figcaption>
    </figure>
  );
}
