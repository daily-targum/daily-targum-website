import * as React from "react";
import { Media } from "../aws";
//import { formatDateAbbreviated, hyphenatedToCapitalized } from "../utils";
import { AspectRatioImage } from "../components";
import Link from "./Link";
import { imgix } from "../utils";
import { useSwipeable } from "react-swipeable";
import styles from "./NewsSlider.module.scss";
import cn from "classnames";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

function Slide({
  media,
  className,
  hide,
  style,
  load,
}: {
  media: Media | undefined;
  className?: string;
  classNames: any;
  hide: boolean;
  style?: React.CSSProperties;
  load: boolean;
}) {
  return (
    <Link
      //href={""}
      style={style}
      className={cn(className, styles.slide, {
        [styles.hide]: hide,
      })}
      tabIndex={hide ? -1 : undefined}
      ariaHidden={hide}
    >
      <AspectRatioImage
        aspectRatio={16 / 9}
        data={
          load
            ? imgix(media?.url ?? "", {
                xs: imgix.presets.md("16:9"),
                sm: imgix.presets.md("16:9"),
                md: imgix.presets.xl("16:9"),
                lg: imgix.presets.xl("16:9"),
              })
            : []
        }
        className={styles.slideImage}
      />
    </Link>
  );
}

export function ImageSlider({
  mediaArray,
  classNames,
}: {
  mediaArray: Media[];
  classNames: any;
}) {
  const [index, setIndex] = React.useState(0);
  const [loaded, setLoaded] = React.useState([true]);
  const [photoDescription, setPhotoDescription] = React.useState("");
  const [photoCredit, setPhotoCredit] = React.useState("");

  // Lazy load images
  React.useEffect(() => {
    if (!loaded[index]) {
      const clone = loaded.slice(0);
      clone[index] = true;
      setLoaded(clone);
    }
    console.log(loaded);
    const desc = mediaArray[index].description;
    const cred = mediaArray[index].credits;
    setPhotoDescription(desc);
    setPhotoCredit(cred);
  }, [index]);

  const incrementSlide = React.useCallback(
    (num: number) => {
      const updatedIndex = index + num;

      if (updatedIndex > mediaArray.length - 1) {
        setIndex(0);
      } else if (updatedIndex < 0) {
        setIndex(mediaArray.length - 1);
      } else {
        setIndex(updatedIndex);
      }
    },
    [index, mediaArray.length]
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => incrementSlide(1),
    onSwipedRight: () => incrementSlide(-1),
  });

  return (
    <div style={{ position: "relative" }} {...handlers}>
      <div className={cn("force-dark-mode", styles.imageSlider)}>
        {mediaArray.map((a, i) => (
          <>
            <Slide
              key={a?.url}
              media={a}
              hide={i !== index}
              className={cn({
                [styles.hide]: i !== index,
              })}
              classNames={classNames}
              load={loaded[i]}
            />
          </>
        ))}
        <ArrowBackIosRoundedIcon
          sx={{ color: "white" }}
          fontSize="large"
          className={styles.arrowLeft}
          onClick={() => incrementSlide(1)}
        />
        <ArrowForwardIosRoundedIcon
          sx={{ color: "white" }}
          fontSize="large"
          className={styles.arrowRight}
          onClick={() => incrementSlide(-1)}
        />
      </div>
      <div className={styles.dots}>
        {mediaArray.map((a, i) => (
          <button
            key={a?.url}
            aria-label={`Slide image ${i + 1}`}
            className={cn(styles.dot, {
              [styles.dotActive]: i !== index,
            })}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <figcaption className={classNames.figcaption} aria-hidden={true}>
        {photoCredit ? <>Photo by {photoCredit}</> : <></>}
        <div className={classNames.captionSpacer} />
        {photoDescription}
      </figcaption>
    </div>
  );
}

export default ImageSlider;
