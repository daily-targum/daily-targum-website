import React from 'react';
import Link from 'next/link';
import Theme from './Theme';
import Text from './Text';
import Grid from './Grid/web';
import { AspectRatioImage } from './AspectRatioView';
import { ImageData } from './Image';
import { styleHelpers } from '../utils';
import { ReactChildren, ReactChild } from '../types';


function Clickable({
  href,
  as,
  onClick,
  children,
  style
}: {
  href?: string
  as?: string
  onClick?: () => any
  children?: ReactChildren
  style?: React.CSSProperties
}) {
  return href ? (
    <Link
      href={href}
      as={as}
    >
      <a style={style}>
        {children}
      </a>
    </Link>
  ) : (
    <div
      style={{
        ...style,
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardBaseProps {
  title?: string
  tag?: string
  imageData: ImageData[]
  href?: string
  as?: string
  aspectRatio?: number
  date?: string
  className?: string
  id?: string
  style?: React.CSSProperties
  author?: string
  onClick?: () => any
  Overlay?: ReactChild
}

interface CardBaseResponsiveProps extends CardBaseProps {
  aspectRatioMobile?: number
  aspectRatioDesktop?: number
}

function CardCompact({
  author,
  title,
  tag,
  imageData,
  href,
  as,
  aspectRatio = 1,
  date,
  className,
  style,
  onClick
}: CardBaseProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <Clickable 
      href={href}
      as={as}
      onClick={onClick}
      style={styles.cardLink}
    >
      <div 
        style={{
          ...styles.compactCard,
          ...style
        }} 
        className={className}
      >
        <AspectRatioImage
          style={styles.compactCardImage}
          aspectRatio={aspectRatio}
          data={imageData}
        />
        
        <div style={styles.compactCardBody}>
          {tag ? <Text style={styles.tag}>{tag}</Text> : null}
          {title ? <Text.Truncate variant='h4' htmlTag='h1' numberOfLines={3} lockNumberOfLines={true}>{title}</Text.Truncate> : null}

          <div style={styles.grow}/>

          <div style={{ ...styles.byline, ...styles.textMuted }}>
            {date ? (<Text style={styles.date}>{date}</Text>) : null}
            {author ? (<Text style={styles.author}>{author}</Text>) : null}
          </div>
        </div>
      </div>
    </Clickable>
  );
}

function CardCompactResponsive({
  title,
  tag,
  imageData,
  href,
  as,
  aspectRatioMobile,
  aspectRatioDesktop,
  date,
  className,
  author,
  onClick
}: CardBaseResponsiveProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <Clickable 
      href={href}
      as={as}
      onClick={onClick}
      style={styles.cardLink}
    >
      <div 
        style={styles.compactCard} 
        className={className}
      >
        {/* Desktop */}
        <Grid.Display 
          xs={false}
          md={true}
          style={styles.compactCardImage}
        >
          <AspectRatioImage
            aspectRatio={aspectRatioDesktop}
            data={imageData}
            style={{ minHeight: '100%' }}
          />
        </Grid.Display>

        {/* Mobile */}
        <Grid.Display 
          xs={true}
          md={false}
          style={styles.compactCardImage}
        >
          <AspectRatioImage
            aspectRatio={aspectRatioMobile}
            data={imageData}
            style={{ minHeight: '100%' }}
          />
        </Grid.Display>

        <div style={styles.compactCardBody}>
          {tag ? <Text style={styles.tag}>{tag}</Text> : null}
          {title ? <Text.Truncate variant='h4' htmlTag='h1' numberOfLines={3} lockNumberOfLines={true}>{title}</Text.Truncate> : null}
        
          <div style={styles.grow}/>

          <div style={{ ...styles.byline, ...styles.textMuted }}>
            {date ? (<Text style={styles.date}>{date}</Text>) : null}
            {author ? (<Text style={styles.author}>{author}</Text>) : null}
          </div>
        </div>
      </div>
    </Clickable>
  );
}

function CardStacked({
  title,
  tag,
  imageData,
  href,
  as,
  aspectRatio,
  date,
  author,
  onClick,
  Overlay
}: CardBaseProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <Clickable 
      href={href}
      as={as}
      onClick={onClick}
      style={styles.stackedCard}
    >
      <div style={{ position: 'relative' }}>
        <AspectRatioImage
          style={styles.stackedCardImage}
          aspectRatio={aspectRatio}
          data={imageData}
        />
        {Overlay}
      </div>
      
      <div 
        style={{
          ...styles.stackedCardBody
        }}
      >
        {tag ? <Text style={styles.tag}>{tag}</Text> : null}
        {title ? (
          <Text.Truncate 
            variant='h4' 
            htmlTag='h1' 
            numberOfLines={2}
          >
            {title}
          </Text.Truncate>
        ) : null}

        <div style={styles.grow}/>

        <div style={{ ...styles.byline, ...styles.textMuted }}>
          {date ? (<Text style={styles.date}>{date}</Text>) : null}
          {author ? (<Text style={styles.author}>{author}</Text>) : null}
        </div>
      </div>
    </Clickable>
  );
}


export function CardStackedResponsive({
  aspectRatioMobile,
  aspectRatioDesktop,
  ...rest
}: CardBaseResponsiveProps) {
  return (
    <>
      {/* Desktop */}
      <Grid.Display 
        xs={false}
        md={true}
        style={{ flex: 1 }}
      >
        <CardStacked
          {...rest}
          aspectRatio={aspectRatioDesktop ?? rest.aspectRatio}
        />
      </Grid.Display>

      {/* Mobile */}
      <Grid.Display 
        xs={true}
        md={false}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioMobile ?? rest.aspectRatio}
        />
      </Grid.Display>
    </>
  )
}

function CardImage({
  title,
  imageData,
  href,
  as,
  aspectRatio,
  date,
  author,
  onClick,
  tag
}: CardBaseProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <Clickable 
      href={href}
      as={as}
      onClick={onClick}
      style={{
        ...styles.imageCard,
        ...(aspectRatio ? null : {
          flex: 1,
          height: '100%'
        })
      }}
    >
      <AspectRatioImage
        aspectRatio={aspectRatio}
        data={imageData}
      />

      <div style={styles.imageCardOverlay}/>
      <div style={styles.imageCardTitleWrap} className='dark-mode'>
        {tag ? (
          <Text 
            variant='h5'
            style={{fontWeight: 900}}
          >
            {tag}
          </Text>
        ) : null}

        {title ? <Text.Truncate variant='h3' htmlTag='h1' numberOfLines={2} style={styles.imageCardTitle}>{title}</Text.Truncate> : null}
        <div style={{ ...styles.byline, ...styles.contrastTextMuted }}>
          {date ? (<Text style={styles.date}>{date}</Text>) : null}
          {author ? (<Text style={styles.author}>{author}</Text>) : null}
        </div>
      </div>
    </Clickable>
  );
}

function CardImageResponsive({
  aspectRatioMobile,
  aspectRatioDesktop,
  ...rest
}: CardBaseResponsiveProps) {
  return (
    <>
      {/* Desktop */}
      <Grid.Display 
        xs={false}
        md={true}
        style={{ height: '100%' }}
      >
        <CardImage
          {...rest}
          aspectRatio={aspectRatioDesktop ?? rest.aspectRatio}
        />
      </Grid.Display>

      {/* Mobile */}
      <Grid.Display 
        xs={true}
        md={false}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioMobile ?? rest.aspectRatio}
        />
      </Grid.Display>
    </>
  )
}

function CardSpacer() {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div style={styles.spacer}/>
  )
}

const styleCreator =  Theme.makeStyleCreator(theme => ({  
  stackedCard: {
    ...styleHelpers.hideLink(),
    ...styleHelpers.flex(),
    flex: 1,
    height: '100%'
  },
  compactCard: {
    ...styleHelpers.flex('row'),
    flex: 1
  },
  compactCardImage: {
    ...styleHelpers.lockWidth('40%'),
    ...styleHelpers.card(theme)
  },
  stackedCardImage: {
    ...styleHelpers.card(theme)
  },
  stackedCardBody: {
    ...styleHelpers.flex('column'),
    ...styleHelpers.cardBody(theme),
    flex: 1,
    alignItems: 'flex-start'
  },
  compactCardBody: {
    ...styleHelpers.flex('column'),
    ...styleHelpers.cardBody(theme),
    flex: 1,
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  imageCard: {
    ...styleHelpers.card(theme),
    ...styleHelpers.hideLink(),
    border: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    ...styleHelpers.centerBackgroundImage()
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
    ...styleHelpers.flex('column'),
    position: 'absolute',
    bottom: 0,
    padding: theme.spacing(2),
    width: '100%'
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
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
  spacer: {
    height: theme.spacing(2.5)
  },
  byline: {
    ...styleHelpers.flex('row'),
    width: '100%',
    justifyContent: 'space-between'
  },
  author: {
    fontStyle: 'italic',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  textMuted: {
    color: theme.colors.textMuted
  },
  contrastTextMuted: {
    color: 'rgba(255,255,255,0.7)'
  },
  grow: {
    flex: 1
  }
}));

const comparisonFn = function(prevProps: any, nextProps: any) {
  return prevProps.id && prevProps.id === nextProps.id;
};

export const Card = {
  Compact: React.memo(CardCompact, comparisonFn),
  CompactResponsive: React.memo(CardCompactResponsive, comparisonFn),
  Stacked: React.memo(CardStacked, comparisonFn),
  StackedResponsive: React.memo(CardStackedResponsive, comparisonFn),
  Image: React.memo(CardImage, comparisonFn),
  ImageResponsive: React.memo(CardImageResponsive, comparisonFn),
  Spacer: React.memo(CardSpacer, comparisonFn)
}

export default Card;