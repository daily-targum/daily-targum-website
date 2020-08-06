import React from 'react';
import { Article } from '../shared/src/client';
import { Theme, Section, Text } from '../components';
import Link from 'next/link';
import { styleHelpers, imgix } from '../utils';

function Slide({
  article,
  className,
  hide,
  style
}: {
  article: Article,
  className?: string,
  hide: boolean,
  style?: React.CSSProperties
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href='/article/[year]/[month]/[slug]'
      as={article.slug}
    >
      <a
        className={[
          className, 
          hide ? classes.hide : null,
          classes.link, 
          classes.slideImage,
          'animate-opacity'
        ].join(' ')}
        style={{
          ...style,
          backgroundImage: `url(${imgix(article.media[0], imgix.presets.sixteenByNine.lg)})`
        }}
      >
        <div className={classes.slideCardImageOverlay}/>
          <Section>
            <div className={classes.slideCardTitleWrap}>
              <Text 
                variant='h5'
                style={{fontWeight: 900, color: '#fff'}}
              >NEWS</Text>
              <Text.Truncate
                variant='h3' 
                numberOfLines={2} 
                className={[
                  hide ? classes.hide : null,
                  classes.sliderCardTitle,
                  'animate-opacity-fast'
                ].join(' ')}
                style={{fontWeight: 400}}
                noPadding
              >
                {article.title}
              </Text.Truncate>
            </div>
          </Section>
      </a>
    </Link>
  );
}

export function NewsSlider({
  articles
}: {
  articles: Article[]
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setTimeout(() => {
      if(index < articles.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 10 * 1000);
    return () => {
      clearTimeout(id);
    }
  }, [index, articles.length])

  return (
    <div style={{position: 'relative'}}>
      <div className={classes.sider}>
        {articles.map((a, i) => (
          <Slide
            key={a.id}
            article={a}
            hide={i !== index}
            className={[
              i !== index ? classes.hide : null,
              classes.slide
            ].join(' ')}
          />
        ))}
      </div>
      
      <div className={classes.dots}>
        {articles.map((a, i) => (
          <div
            key={a.id}
            className={[
              i !== index ? classes.dotActive : null,
              classes.dot
            ].join(' ')}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  },
  dots: {
    position: 'absolute',
    display: 'flex',
    margin: theme.spacing(3),
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center'
  },
  dot: {
    height: 10,
    width: 10,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    borderRadius: '100%',
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
    cursor: 'pointer'
  },
  dotActive: {
    backgroundColor: '#fff'
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.text
  },
  slideImage: {
    ...styleHelpers.centerBackgroundImage(),
    display: 'flex',
    alignItems: 'flex-end'
  },
  slideCardImageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent)'
  },
  slideCardTitleWrap: {
    ...styleHelpers.flex('column'),
    position: 'relative',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    width: '100%',
    borderLeft: `4px solid ${theme.colors.accent}`
  },
  sliderCardTitle: {
    color: '#fff',
    maxWidth: '50%'
  },
  sider: {
    // maxHeight: 400,
    height: 'calc(25vw + 180px)',
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden'
  },
  slide: {
    ...styleHelpers.absoluteFill()
  },
}));

export default NewsSlider;