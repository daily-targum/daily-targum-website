import React, { CSSProperties } from 'react';
import Theme from './Theme';
import Grid from './Grid';
import Text from './Text';
import Section from './Section';
import { GetArticle } from '../shared/src/client';
import { formatDateAbriviated } from '../shared/src/utils';
import Link from 'next/link';

function Slide({
  article,
  className,
  style
}: {
  article: GetArticle,
  className?: string,
  style?: CSSProperties
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href='/article/[year]/[month]/[slug]'
      as={article.slug}
    >
      <a
        className={[className, classes.link, classes.image, classes.largeCardImage].join(' ')}
        style={{
          ...style,
          backgroundImage: `url(${article.media[0]}?ar=16:9&fit=crop&crop=faces,center)`
        }}
      >
        <div className={classes.slideCardImageOverlay}/>
        <Section>
          <div className={classes.slideCardTitleWrap}>
            <Text variant='h2' numberOfLines={2} className={classes.sliderCardTitle}>{article.title}</Text>
          </div>
        </Section>
      </a>
    </Link>
  );
}

function Large({
  article,
  className,
  style
}: {
  article: GetArticle,
  className?: string,
  style?: CSSProperties
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href='/article/[year]/[month]/[slug]'
      as={article.slug}
    >
      <a
        className={[className, classes.link, classes.image, classes.largeCardImage].join(' ')}
        style={{
          ...style,
          backgroundImage: `url(${article.media[0]}?h=260&w=400&fit=crop&crop=faces,center)`
        }}
      >
        <div className={classes.largeCardImageOverlay}/>
        <div className={classes.largeCardTitleWrap}>
          <Text variant='p' className={classes.largeCardSubtitle} noPadding>{formatDateAbriviated(article.publishDate)}</Text>
          <Text variant='h3' numberOfLines={2} className={classes.largeCardTitle} noPadding>{article.title}</Text>
        </div>
      </a>
    </Link>
  );
}

function Medium({
  article,
  className,
  style
}: {
  article: GetArticle,
  className?: string,
  style?: CSSProperties
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const {spacing} = Theme.useTheme();
  return (
    <Link
      href='/article/[year]/[month]/[slug]'
      as={article.slug}
    >
      <a
        className={[className, classes.link].join(' ')}
        style={style} 
      >
        <Grid.Row spacing={spacing(2)}>
          <Grid.Col xs={12}>
            <div
              className={[classes.image, classes.smallCardImage].join(' ')}
              style={{
                backgroundImage: `url(${article.media[0]}?h=260&w=400&fit=crop&crop=faces,center)`
              }}
            >
              <div className={classes.imageOverlay}/>
            </div>
          </Grid.Col>
          <Grid.Col xs={12}>
            <div className={classes.textWrap}>
              <Text variant='p' className={classes.mediumCardSubtitle}>{formatDateAbriviated(article.publishDate)}</Text>
              <Text variant='h5' numberOfLines={3}>{article.title}</Text>
            </div>
          </Grid.Col>
        </Grid.Row>
      </a>
    </Link>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  row: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.text
  },
  image: {
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'radial-gradient(circle, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.1) 150%)'
  },
  textWrap: {
    paddingTop: theme.spacing(1)
  },
  // Small
  smallCardImage: {
    paddingTop: '56.25%',
  },
  // Medium
  mediumCardSubtitle: {
    color: theme.colors.textMuted,
    marginBottom: theme.spacing(1)
  },
  // Large,
  largeCardImage: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end'
  },
  largeCardImageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7), transparent)'
  },
  largeCardTitle: {
    color: '#fff'
  },
  largeCardSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: theme.spacing(1)
  },
  largeCardTitleWrap: {
    position: 'absolute',
    bottom: 0,
    margin: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderLeftColor: theme.colors.accent,
    borderLeftWidth: 3,
    borderLeftStyle: 'solid'
  },
  // Slider
  slideCardImageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent)'
  },
  slideCardTitleWrap: {
    position: 'relative',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  sliderCardTitle: {
    color: '#fff',
    textAlign: 'center',
    maxWidth: 800
  }
}));

export const NewsCard = {
  Medium,
  Large,
  Slide
}
export default NewsCard;