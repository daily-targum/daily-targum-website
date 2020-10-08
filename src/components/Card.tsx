import React from 'react';
import Link from 'next/link';
import Text from './Text';
import Grid from './Grid/web';
import { AspectRatioImage } from './AspectRatioView';
import { ImageData } from './Image';
import { ReactChildren, ReactChild } from '../types';
import styles from './Card.module.scss';
import cn from 'classnames';


function Clickable({
  href,
  as,
  onClick,
  children,
  style,
  className
}: {
  href?: string
  as?: string
  onClick?: () => any
  children?: ReactChildren
  style?: React.CSSProperties
  className?: string
}) {
  return href ? (
    <Link
      href={href}
      as={as}
    >
      <a style={style} className={className} role='article'>
        {children}
      </a>
    </Link>
  ) : (
    <button
      style={{
        ...style,
        cursor: 'pointer'
      }}
      className={cn(
        className,
        styles.clickableButton
      )}
      onClick={onClick}
      role='article'
    >
      {children}
    </button>
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
  altText?: string
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
  aspectRatio,
  date,
  className,
  style,
  altText,
  onClick
}: CardBaseProps) {
  return (
    <Clickable 
      href={href}
      as={as}
      onClick={onClick}
      style={style}
      className={cn(className, styles.compactCard)}
    >
      <AspectRatioImage
        className={styles.compactCardImage}
        aspectRatio={aspectRatio ?? 1}
        data={imageData}
        altText={altText}
      />
      
      <div className={styles.compactCardBody}>
        {tag ? <Text className={styles.tag}>{tag}</Text> : null}
        {title ? <Text.Truncate variant='h4' htmlTag='h1' numberOfLines={3} lockNumberOfLines={true}>{title}</Text.Truncate> : null}

        <div className={styles.grow}/>

        <Text className={styles.byline}>
          {date} 
          {(date && author) ? ' - ' : null}
          {author ? (
            <Text className={styles.author}>{author}</Text>
          ) : null}
        </Text>
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
  altText,
  onClick
}: CardBaseResponsiveProps) {
  return (
    <Clickable 
      href={href}
      as={as}
      onClick={onClick}
      className={cn(className, styles.compactCard)}
    >
      {/* Desktop */}
      <Grid.Display 
        xs={false}
        md={true}
        className={styles.compactCardImage}
      >
        <AspectRatioImage
          aspectRatio={aspectRatioDesktop ?? 1}
          data={imageData}
          style={{ minHeight: '100%' }}
          altText={altText}
        />
      </Grid.Display>

      {/* Mobile */}
      <Grid.Display 
        xs={true}
        md={false}
        className={styles.compactCardImage}
      >
        <AspectRatioImage
          aspectRatio={aspectRatioMobile ?? 1}
          data={imageData}
          style={{ minHeight: '100%' }}
          altText={altText}
        />
      </Grid.Display>

      <div className={styles.compactCardBody}>
        {tag ? <Text className={styles.tag}>{tag}</Text> : null}
        {title ? <Text.Truncate variant='h4' htmlTag='h1' numberOfLines={3} lockNumberOfLines={true}>{title}</Text.Truncate> : null}
      
        <div className={styles.grow}/>

        <Text className={styles.byline}>
          {date} 
          {(date && author) ? ' - ' : null}
          {author ? (
            <Text className={styles.author}>{author}</Text>
          ) : null}
        </Text>
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
  altText,
  Overlay
}: CardBaseProps) {
  return (
    <Clickable 
      href={href}
      as={as}
      onClick={onClick}
      className={styles.stackedCard}
    >
      <AspectRatioImage
        className={styles.stackedCardImage}
        aspectRatio={aspectRatio ?? 16/9}
        data={imageData}
        Overlay={Overlay}
        altText={altText}
      />
      
      <div 
        className={styles.stackedCardBody}
      >
        {tag ? <Text className={styles.tag}>{tag}</Text> : null}
        {title ? (
          <Text.Truncate 
            variant='h4' 
            htmlTag='h1' 
            numberOfLines={2}
            lockNumberOfLines={true}
          >
            {title}
          </Text.Truncate>
        ) : null}

        <div className={styles.grow}/>

        <Text className={styles.byline}>
          {date} 
          {(date && author) ? ' - ' : null}
          {author ? (
            <Text className={styles.author}>{author}</Text>
          ) : null}
        </Text>
      </div>
    </Clickable>
  );
}


export function CardStackedResponsive({
  aspectRatioMobile,
  aspectRatioDesktop,
  title,
  tag,
  imageData,
  href,
  as,
  aspectRatio,
  date,
  author,
  onClick,
  altText,
  Overlay
}: CardBaseResponsiveProps) {
  return (
    <Clickable 
      href={href}
      as={as}
      onClick={onClick}
      className={styles.stackedCardResponsive}
    >
      <>
        {/* Desktop */}
        <Grid.Display 
          xs={false}
          md={true}
          style={{ flex: 1 }}
        >
          <AspectRatioImage
            className={styles.cardBaseImage}
            aspectRatio={aspectRatioDesktop ?? aspectRatio ?? 16/9}
            data={imageData}
            Overlay={Overlay}
            altText={altText}
          />
        </Grid.Display>

        {/* Mobile */}
        <Grid.Display 
          xs={true}
          md={false}
          className={styles.compactCardImage}
        >
          <AspectRatioImage
            className={styles.cardBaseImage}
            aspectRatio={aspectRatioMobile ?? aspectRatio ?? 1}
            data={imageData}
            Overlay={Overlay}
            altText={altText}
          />
        </Grid.Display>
      </>
      
      <div className={styles.stackedCardBody}>
        {tag ? <Text className={styles.tag}>{tag}</Text> : null}
        {title ? (
          <Text.Truncate 
            variant='h4' 
            htmlTag='h1' 
            numberOfLines={2}
            lockNumberOfLines={true}
          >
            {title}
          </Text.Truncate>
        ) : null}

        <div className={styles.grow}/>

        <Text className={styles.byline}>
          {date} 
          {(date && author) ? ' - ' : null}
          {author ? (
            <Text className={styles.author}>{author}</Text>
          ) : null}
        </Text>
      </div>
    </Clickable>
  );
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
  altText,
  tag
}: CardBaseProps) {
  return (
    <Clickable 
      href={href}
      as={as}
      onClick={onClick}
      style={{
        ...(aspectRatio ? null : {
          flex: 1,
          height: '100%'
        })
      }}
      className={cn('dark-mode', styles.imageCard)}
    >
      <AspectRatioImage
        aspectRatio={aspectRatio ?? 16/9}
        data={imageData}
        altText={altText}
      />

      <div className={styles.imageCardTitleWrap}>
        {tag ? (
          <Text 
            variant='h5'
            style={{fontWeight: 900}}
          >
            {tag}
          </Text>
        ) : null}

        {title ? <Text.Truncate variant='h3' htmlTag='h1' numberOfLines={2}>{title}</Text.Truncate> : null}
        <Text 
          className={styles.byline}
        >
          <span aria-label={`Published ${date}`}>{date}</span>
          {(date && author) ? ' - ' : null}
          {author ? (
            <Text className={styles.author}>By {author}</Text>
          ) : null}
        </Text>
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
          aspectRatio={aspectRatioDesktop ?? rest.aspectRatio ?? 16/9}
        />
      </Grid.Display>

      {/* Mobile */}
      <Grid.Display 
        xs={true}
        md={false}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioMobile ?? rest.aspectRatio ?? 1}
        />
      </Grid.Display>
    </>
  )
}

function CardSpacer() {
  return (
    <div className={styles.spacer}/>
  )
}

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