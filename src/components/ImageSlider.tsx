import * as React from "react";
import { CompactArticle, CompactMedia, GetArticle, Media } from "../aws";
//import { formatDateAbbreviated, hyphenatedToCapitalized } from "../utils";
import { Section, Text, AspectRatioImage } from "../components";
import Link from "./Link";
import { imgix } from "../utils";
import { useSwipeable } from "react-swipeable";
import styles from "./NewsSlider.module.scss";
import cn from "classnames";

function Slide({
  media,
  className,
  hide,
  style,
  load,
}: {
  media: Media | undefined;
  //article: CompactArticle;
  className?: string;
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
                //sm: imgix.presets.md("16:9"),
                md: imgix.presets.xl("16:9"),
                //lg: imgix.presets.xl("16:9"),
              })
            : []
        }
        className={styles.slideImage}
      />

      {/* <Section>
        <div
          className={cn(styles.slideCardTitleWrap, {
            [styles.hide]: hide,
          })}
        >
          <Text.Truncate
            variant="h3"
            numberOfLines={2}
            style={{ fontWeight: 400 }}
          >
            {media?.description}
          </Text.Truncate>
        </div>
      </Section> */}
    </Link>
  );
}

export function ImageSlider({
  mediaArray,
}: {
  mediaArray: (Media | undefined)[];
}) {
  const [index, setIndex] = React.useState(0);
  const [loaded, setLoaded] = React.useState([true]);
  const [resetTimer, setResetTimer] = React.useState(0);
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
      console.log(mediaArray[index]);
    },
    [index, mediaArray.length]
  );

  React.useEffect(() => {
    const id = setTimeout(() => {
      incrementSlide(1);
    }, 10 * 1000);

    return () => {
      clearTimeout(id);
    };
  }, [index, incrementSlide, resetTimer]);

  const handlers = useSwipeable({
    onSwipedLeft: () => incrementSlide(1),
    onSwipedRight: () => incrementSlide(-1),
  });

  return (
    <div style={{ position: "relative" }} {...handlers}>
      <div
        className={cn("force-dark-mode", styles.imageSlider)}
        onMouseEnter={() => setResetTimer((num) => num + 1)}
      >
        {mediaArray.map((a, i) => (
          <Slide
            key={a?.url}
            media={a}
            hide={i !== index}
            className={cn({
              [styles.hide]: i !== index,
            })}
            load={loaded[i]}
          />
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
    </div>
  );
}

export default ImageSlider;
