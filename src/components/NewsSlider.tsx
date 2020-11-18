import * as React from 'react';
import { CompactArticle } from '../shared/src/client';
import { formatDateAbriviated, hyphenatedToCapitalized } from '../shared/src/utils';
import { Section, Text, AspectRatioImage } from '../components';
import Link from './Link';
import { imgix } from '../utils';
import { useSwipeable } from 'react-swipeable'
import styles from './NewsSlider.module.scss';
import cn from 'classnames';

function Slide({
  article,
  className,
  hide,
  style,
  load
}: {
  article: CompactArticle,
  className?: string,
  hide: boolean,
  style?: React.CSSProperties,
  load: boolean
}) {
  return (
    <Link
      href={'/'+article.slug}
      style={style}
      className={cn(
        className,
        styles.slide,
        {
          [styles.hide]: hide
        }
      )}
      tabIndex={hide ? -1 : undefined}
      ariaHidden={hide}
    >
      <AspectRatioImage
        aspectRatio={16/9}
        data={load ? imgix(article.media[0]?.url ?? '', {
          xs: imgix.presets.sm('16:9'),
          sm: imgix.presets.md('16:9'),
          md: imgix.presets.lg('16:9'),
          lg: imgix.presets.xl('16:9')
        }) : []}
        className={styles.slideImage}
      />
      <div className={styles.slideCardImageOverlay}/>
      <Section>
        <div 
          className={cn(
            styles.slideCardTitleWrap,
            {
              [styles.hide]: hide
            }
          )}
        >
          {article.category ? (
            <Text 
              variant='h5'
              style={{fontWeight: 900}}
            >
              {hyphenatedToCapitalized(article.category)}
            </Text>
          ) : null}
          
          <Text.Truncate
            variant='h3' 
            numberOfLines={2} 
            style={{ fontWeight: 400 }}
          >
            {article.title}
          </Text.Truncate>

          <Text className={styles.byline}>
            {formatDateAbriviated(article.publishDate)} - <Text className={styles.author}>{article.authors.map(a => a.displayName).join(', ')}</Text>
          </Text>
        </div>
      </Section>
    </Link>
  );
}

export function NewsSlider({
  articles
}: {
  articles: CompactArticle[]
}) {
  const [ index, setIndex ] = React.useState(0);
  const [ loaded, setLoaded ] = React.useState([true]);
  const [ resetTimer, setResetTimer] = React.useState(0);

  // Lazy load images
  React.useEffect(() => {
    if (!loaded[index]) {
      const clone = loaded.slice(0);
      clone[index] = true;
      setLoaded(clone);
    }
  }, [index]);

  const incrementSlide = React.useCallback(
    (num: number) => {
      const updatedIndex = index + num;

      if(updatedIndex > articles.length - 1) {
        setIndex(0);
      } 

      else if (updatedIndex < 0) {
        setIndex(articles.length - 1);
      }
      
      else {
        setIndex(updatedIndex);
      }
    },
    [index, articles.length]
  );

  React.useEffect(() => {
    const id = setTimeout(() => {
      incrementSlide(1);
    }, 10 * 1000);

    return () => {
      clearTimeout(id);
    }
  }, [index, incrementSlide, resetTimer]);

  const handlers = useSwipeable({
    onSwipedLeft: () => incrementSlide(1),
    onSwipedRight: () => incrementSlide(-1)
  });

  return (
    <div 
      style={{position: 'relative'}}
      {...handlers}
    >
      <div 
        className={cn(
          'force-dark-mode',
          styles.slider
        )}
        onMouseEnter={() => setResetTimer(num => num+1)}
      >
        {articles.map((a, i) => (
          <Slide
            key={a.id}
            article={a}
            hide={i !== index}
            className={cn({
              [styles.hide]: i !== index
            })}
            load={loaded[i]}
          />
        ))}
      </div>
      
      <div className={styles.dots}>
        {articles.map((a, i) => (
          <button
            key={a.id}
            aria-label={`Slide article ${i+1}`}
            className={cn(
              styles.dot,
              {
                [styles.dotActive]: i !== index
              }
            )}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default NewsSlider;