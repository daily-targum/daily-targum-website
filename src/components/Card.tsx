import React from 'react';
import Link from 'next/link';
import Theme from './Theme';
import Text from './Text';
import Grid from './Grid';
import { AspectRatioImage } from './AspectRatioView';
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
        <div className={classes.cardCompact}>
          <AspectRatioImage
            className={classes.cardCompactImage}
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

function CardStacked({
  title,
  subtitle,
  tag,
  image,
  href,
  as,
  date
}: {
  title?: string
  subtitle?: string
  tag?: string
  image: string
  href: string
  as?: string
  date?: string
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href={href}
      as={as}
    >
      <a className={classes.cardLink}>
        <div className={classes.cardStacked}>
          <AspectRatioImage
            aspectRatio={[3,2]}
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

export function Card({
  title,
  subtitle,
  tag,
  href,
  as,
  image,
  date
}: {
  title?: string
  subtitle?: string
  tag?: string
  href: string
  as?: string
  image: string
  date?: string
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
        />
      </Grid.Col>
    </Grid.Row>
  )
}

const styleCreator =  Theme.makeStyleCreator(theme => ({  
  cardStacked: {
    ...styles.flex(),
    flex: 1
  },
  cardCompact: {
    ...styles.flex('row'),
    marginBottom: theme.spacing(2)
  },
  cardCompactImage: {
    ...styles.lockWidth('40%')
  },
  cardBody: {
    padding: theme.spacing(2),
    backgroundColor: theme.colors.surface,
    flex: 1
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
export default Card;