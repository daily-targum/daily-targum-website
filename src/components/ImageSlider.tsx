import * as React from "react";
import { Media } from "../aws";
//import { formatDateAbbreviated, hyphenatedToCapitalized } from "../utils";
import { AspectRatioImage, Section, Text } from "../components";
import Link from "./Link";
import { imgix } from "../utils";
import { useSwipeable } from "react-swipeable";
import styles from "./NewsSlider.module.scss";
import cn from "classnames";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

// function Shower({
//   media,
//   hide,
//   style,
//   className,
//   classNames,
// }: {
//   media: Media | undefined;
//   hide: boolean;
//   style?: React.CSSProperties;
//   className?: string;
//   classNames: any;
// }) {
//   return (
//     <Link
//       style={style}
//       className={cn(className, styles.slide, {
//         [styles.hide]: hide,
//       })}
//       tabIndex={hide ? -1 : undefined}
//       ariaHidden={hide}
//     >
//       <figure className={classNames.fullWidth}>
//         <figcaption>{media?.description}</figcaption>
//       </figure>
//     </Link>
//   );
// }

function Slide({
  media,
  className,
  //classNames,
  hide,
  style,
  load,
}: {
  media: Media | undefined;
  //article: CompactArticle;
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
      <div className={styles.articleSlideCardImageOverlay} />

      <Section>
        <div
          className={cn(styles.imageSlideCardTitleWrap, {
            [styles.hide]: hide,
          })}
        >
          <Text
            variant="p"
            //numberOfLines={2}
            style={{ fontWeight: 500, fontSize: "1rem", lineHeight: "95%" }}
          >
            {media?.description}
          </Text>
        </div>
      </Section>
    </Link>
  );
}

export function ImageSlider({
  mediaArray,
  classNames,
}: {
  mediaArray: (Media | undefined)[];
  classNames: any;
}) {
  const [index, setIndex] = React.useState(0);
  const [loaded, setLoaded] = React.useState([true]);
  //const [resetTimer, setResetTimer] = React.useState(0);
  console.log(mediaArray);

  // Lazy load images
  React.useEffect(() => {
    if (!loaded[index]) {
      const clone = loaded.slice(0);
      clone[index] = true;
      setLoaded(clone);
    }
    console.log(loaded);
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
      //console.log(mediaArray[index]);
    },
    [index, mediaArray.length]
  );

  // React.useEffect(() => {
  //   const id = setTimeout(() => {
  //     incrementSlide(1);
  //   }, 10 * 1000);

  //   return () => {
  //     clearTimeout(id);
  //   };
  // }, [index, incrementSlide, resetTimer]);

  const handlers = useSwipeable({
    onSwipedLeft: () => incrementSlide(1),
    onSwipedRight: () => incrementSlide(-1),
  });

  return (
    <div style={{ position: "relative" }} {...handlers}>
      <div
        className={cn("force-dark-mode", styles.imageSlider)}
        //onMouseEnter={() => setResetTimer((num) => num + 1)}
      >
        {mediaArray.map((a, i) => (
          <>
            {console.log(a)}

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
            {/* <Shower
              key={a?.id}
              media={a}
              hide={i !== index}
              className={cn({
                [styles.hide]: i !== index,
              })}
              classNames={classNames}
            /> */}
          </>
        ))}
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
      <ArrowBackIosRoundedIcon
        sx={{ color: "white" }}
        fontSize="large"
        className={styles.arrowLeft}
        onClick={() => incrementSlide(1)}
        //className={styles.arrowLeft}
      />
      <ArrowForwardIosRoundedIcon
        sx={{ color: "white" }}
        fontSize="large"
        className={styles.arrowRight}
        onClick={() => incrementSlide(-1)}
        //className={styles.arrowRight}
      />
    </div>
  );
}

export default ImageSlider;
