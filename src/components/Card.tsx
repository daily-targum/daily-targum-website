import React from 'react';
import Link from 'next/link';
import Theme from './Theme';
import Text from './Text';
import Grid from './Grid';
import { AspectRatioImage, AspectRatioView } from './AspectRatioView';
import { styleHelpers } from '../utils';

function CardCompact({
  title,
  subtitle,
  tag,
  image,
  href,
  as,
  aspectRatio = [1,1],
  date,
  className
}: {
  title?: string
  subtitle?: string
  tag?: string
  image: string
  href?: string
  as?: string
  aspectRatio?: [number, number]
  date?: string,
  className?: string
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href={href||''}
      as={as}
    >
      <a className={classes.cardLink}>
        <div className={[classes.compactCard, className].join(' ')}>
          <AspectRatioImage
            className={classes.compactCardImage}
            aspectRatio={aspectRatio}
            src={image}
          />
          <div className={classes.cardBody}>
            {date ? <Text variant='p' className={classes.date} noPadding>{date}</Text> : null}
            {tag ? <Text className={classes.tag}>{tag}</Text> : null}
            {title ? <Text variant='h4' numberOfLines={3}>{title}</Text> : null}
            {subtitle ? <Text variant='p' numberOfLines={3} noPadding>{subtitle}</Text> : null}
          </div>
        </div>
      </a>
    </Link>
  );
}

type CardStackedProps = {
  title?: string
  subtitle?: string
  tag?: string
  image: string
  href: string
  as?: string
  aspectRatio?: [number, number]
  date?: string
}

function CardStacked({
  title,
  subtitle,
  tag,
  image,
  href,
  as,
  aspectRatio,
  date
}: CardStackedProps) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href={href}
      as={as}
    >
      <a className={classes.cardLink}>
        <div className={classes.stackedCard}>
          <div
            className={classes.backgroundImgae}
            style={{
              backgroundImage: `url(${image}?h=260&w=400&fit=crop&crop=faces,center)`
            }}
          >
            {aspectRatio ? (
            <AspectRatioView 
              aspectRatio={aspectRatio}
              style={{width: '100%'}}
            /> 
          ) : <div style={{flex: 1}}/>}
          </div>
          <div className={classes.cardBody}>
            {date ? <Text variant='p' className={classes.date} noPadding>{date}</Text> : null}
            {tag ? <Text className={classes.tag}>{tag}</Text> : null}
            {title ? <Text variant='h4' numberOfLines={2}>{title}</Text> : null}
            {subtitle ? <Text variant='p' numberOfLines={2} noPadding>{subtitle}</Text> : null}
          </div>
        </div>
      </a>
    </Link>
  );
}

interface CardStackedResponsiveProps extends CardStackedProps {
  aspectRatioCompact?: [number, number]
  aspectRatioStacked?: [number, number]
  tag?: string
}

export function CardStackedResponsive({
  aspectRatioCompact,
  aspectRatioStacked,
  ...rest
}: CardStackedResponsiveProps) {
  return (
    <Grid.Row>
      {/* Desktop */}
      <Grid.Col 
        xs={0}
        md={24}
      >
        <CardStacked
          {...rest}
          aspectRatio={aspectRatioStacked || rest.aspectRatio}
        />
      </Grid.Col>
      {/* Mobile */}
      <Grid.Col 
        xs={24}
        md={0}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioCompact || rest.aspectRatio}
        />
      </Grid.Col>
    </Grid.Row>
  )
}

type CardImageProps = {
  title?: string
  image: string
  href: string
  as?: string
  aspectRatio?: [number, number]
  date?: string
}

function CardImage({
  title,
  image,
  href,
  as,
  aspectRatio,
  date
}: CardImageProps) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href={href}
      as={as}
    >
      <a
        className={classes.imageCard}
        style={{
          backgroundImage: `url(${image}?h=260&w=400&fit=crop&crop=faces,center)`
        }}
      >
        {aspectRatio ? (
          <AspectRatioView 
            aspectRatio={aspectRatio}
            style={{width: '100%'}}
          /> 
        ) : <div style={{flex: 1}}/>}
        <div className={classes.imageCardOverlay}/>
        <div className={classes.imageCardTitleWrap}>
          {date ? <Text variant='p' className={classes.imageCardSubtitle} noPadding>{date}</Text> : null}
          {title ? <Text variant='h3' numberOfLines={2} className={classes.imageCardTitle} noPadding>{title}</Text> : null}
        </div>
      </a>
    </Link>
  );
}

interface CardImageResponsiveProps extends CardImageProps {
  aspectRatioCompact?: [number, number]
  aspectRatioImage?: [number, number]
  tag?: string
}

export function CardImageResponsive({
  aspectRatioCompact,
  aspectRatioImage,
  ...rest
}: CardImageResponsiveProps) {
  return (
    <Grid.Row>
      {/* Desktop */}
      <Grid.Col 
        xs={0}
        md={24}
      >
        <CardImage
          {...rest}
          aspectRatio={aspectRatioImage || rest.aspectRatio}
        />
      </Grid.Col>
      {/* Mobile */}
      <Grid.Col 
        xs={24}
        md={0}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioCompact || rest.aspectRatio}
        />
      </Grid.Col>
    </Grid.Row>
  )
}

const styleCreator =  Theme.makeStyleCreator(theme => ({  
  stackedCard: {
    ...styleHelpers.flex(),
    ...styleHelpers.card(theme),
    flex: 1,
    marginBottom: theme.spacing(2)
  },
  compactCard: {
    ...styleHelpers.flex('row'),
    ...styleHelpers.card(theme),
    flex: 1,
    marginBottom: theme.spacing(2)
  },
  compactCardImage: {
    ...styleHelpers.lockWidth('40%')
  },
  cardBody: {
    ...styleHelpers.flex('column'),
    padding: theme.spacing(2),
    backgroundColor: theme.colors.surface,
    flex: 1,
    alignItems: 'flex-start'
  },
  imageCard: {
    ...styleHelpers.card(theme),
    border: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    ...styleHelpers.centerBackgroundImage(),
    marginBottom: theme.spacing(2)
  },
  backgroundImgae: {
    height: '100%',
    display: 'flex',
    ...styleHelpers.centerBackgroundImage()
  },
  imageCardOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7), transparent)'
  },
  imageCardTitle: {
    color: '#fff'
  },
  imageCardSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: theme.spacing(1)
  },
  imageCardTitleWrap: {
    position: 'absolute',
    bottom: 0,
    margin: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderLeftColor: theme.colors.accent,
    borderLeftWidth: 3,
    borderLeftStyle: 'solid'
  },
  tag: {
    display: 'flex',
    color: '#fff',
    backgroundColor: theme.colors.accent,
    padding: theme.spacing(0.5, 1),
    marginBottom: theme.spacing(1),
  },
  cardLink: {
    ...styleHelpers.hideLink(),
    display: 'flex',
    flex: 1
  },
  date: {
    color: theme.colors.textMuted
  }
}));

export const Card = {
  Compact: CardCompact,
  Stacked: CardStacked,
  StackedResponsive: CardStackedResponsive,
  Image: CardImage,
  ImageResponsive: CardImageResponsive,
}

export default Card;