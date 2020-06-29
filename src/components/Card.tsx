import React from 'react';
import Link from 'next/link';
import Theme from './Theme';
import Text from './Text';
import Grid from './Grid';
import { AspectRatioImage, AspectRatioView } from './AspectRatioView';
import { styles } from '../utils';

function CardCompact({
  title,
  subtitle,
  tag,
  image,
  href,
  as,
  aspectRatio = [1,1],
  date
}: {
  title?: string
  subtitle?: string
  tag?: string
  image: string
  href: string
  as?: string
  aspectRatio?: [number, number]
  date?: string
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href={href}
      as={as}
    >
      <a className={classes.cardLink}>
        <div className={classes.compactCard}>
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

function CardStacked({
  title,
  subtitle,
  tag,
  image,
  href,
  as,
  aspectRatio = [3, 2],
  date
}: {
  title?: string
  subtitle?: string
  tag?: string
  image: string
  href: string
  as?: string
  aspectRatio?: [number, number]
  date?: string
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href={href}
      as={as}
    >
      <a className={classes.cardLink}>
        <div className={classes.stackedCard}>
          <AspectRatioImage
            aspectRatio={aspectRatio}
            src={image}
          />
          <div className={classes.cardBody}>
            {date ? <Text variant='p' className={classes.date}>{date}</Text> : null}
            {tag ? <Text className={classes.tag}>{tag}</Text> : null}
            {title ? <Text variant='h4' numberOfLines={3}>{title}</Text> : null}
            {subtitle ? <Text variant='p' numberOfLines={3} noPadding>{subtitle}</Text> : null}
          </div>
        </div>
      </a>
    </Link>
  );
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

interface CardImageResponziveProps extends CardImageProps {
  aspectRatioCompact?: [number, number]
  aspectRatioImage?: [number, number]
  tag?: string
}

export function CardImageResponzive({
  aspectRatioCompact,
  aspectRatioImage,
  ...rest
}: CardImageResponziveProps) {
  return (
    <Grid.Row>
      {/* Desktop */}
      <Grid.Col 
        xs={0}
        sm={24}
      >
        <CardImage
          {...rest}
          aspectRatio={aspectRatioImage}
        />
      </Grid.Col>
      {/* Mobile */}
      <Grid.Col 
        xs={24}
        sm={0}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioCompact}
        />
      </Grid.Col>
    </Grid.Row>
  )
}

export function Card({
  title,
  subtitle,
  tag,
  href,
  as,
  image,
  date,
  aspectRatioCompact,
  aspectRatioStacked
}: {
  title?: string
  subtitle?: string
  tag?: string
  href: string
  as?: string
  image: string
  date?: string
  aspectRatioCompact?: [number, number]
  aspectRatioStacked?: [number, number]
}) {
  return (
    <Grid.Row>
      {/* Desktop */}
      <Grid.Col 
        xs={0}
        sm={24}
      >
        <CardStacked
          title={title}
          subtitle={subtitle}
          tag={tag}
          href={href}
          as={as}
          image={image}
          date={date}
          aspectRatio={aspectRatioStacked}
        />
      </Grid.Col>
      {/* Mobile */}
      <Grid.Col 
        xs={24}
        sm={0}
      >
        <CardCompact
          title={title}
          subtitle={subtitle}
          tag={tag}
          href={href}
          as={as}
          image={image}
          date={date}
          aspectRatio={aspectRatioCompact}
        />
      </Grid.Col>
    </Grid.Row>
  )
}

const styleCreator =  Theme.makeStyleCreator(theme => ({  
  stackedCard: {
    ...styles.flex(),
    flex: 1,
    marginBottom: theme.spacing(2)
  },
  compactCard: {
    ...styles.flex('row'),
    flex: 1,
    marginBottom: theme.spacing(2)
  },
  compactCardImage: {
    ...styles.lockWidth('40%')
  },
  cardBody: {
    padding: theme.spacing(2),
    backgroundColor: theme.colors.surface,
    flex: 1
  },
  imageCard: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    ...styles.centerBackgroundImage(),
    marginBottom: theme.spacing(2)
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
    color: '#fff',
    backgroundColor: theme.colors.accent,
    padding: theme.spacing(0.5, 1),
    marginBottom: theme.spacing(1),
  },
  cardLink: {
    ...styles.hideLink(),
    display: 'flex',
    flex: 1
  },
  date: {
    color: theme.colors.textMuted
  }
}));

Card.Compact = CardCompact;
Card.Stacked = CardStacked;
Card.Image = CardImage;
Card.ImageResponsive = CardImageResponzive;
export default Card;