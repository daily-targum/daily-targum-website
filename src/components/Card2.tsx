
import * as React from 'react';
import Link from 'next/link';
import Text from './Text';
import { AspectRatioImage } from './AspectRatioView';
import { ImageData } from './Image';
import { ReactChildren, ReactChild } from '../types';
import cn from 'classnames';
import Styles from './Card2.styles';
const { classNames, StyleSheet } = Styles;


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
  return (
    <>
      {href ? (
        <Link
          href={href}
          as={as}
        >
          <a 
            style={style} 
            className={cn(
              className,
              classNames.clickable
            )}
            role='article'
          >
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
            classNames.clickable
          )}
          onClick={onClick}
          role='article'
        >
          {children}
        </button>
      )}
      {StyleSheet}
    </>
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
  description?: string
}

// interface CardBaseResponsiveProps extends CardBaseProps {
//   aspectRatioMobile?: number
//   aspectRatioDesktop?: number
// }

function CardStacked({
  title,
  description,
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
    <>
      <Clickable 
        href={href}
        as={as}
        onClick={onClick}
        className={classNames.stackedCard}
      >
        <AspectRatioImage
          aspectRatio={aspectRatio ?? 16/9}
          data={imageData}
          Overlay={Overlay}
          altText={altText}
        />
        
        <div 
          className={classNames.stackedCardBody}
        >
          {tag ? (
            <Text 
              className={cn(
                classNames.tag,
                classNames.textPadding
              )}
            >
              {tag}
            </Text>
          ) : null}

          {title ? (
            <Text.Truncate 
              className={classNames.textPadding}
              variant='h3' 
              htmlTag='h2' 
              numberOfLines={2}
              noPadding
            >
              {title}
            </Text.Truncate>
          ) : null}

          {description ? (
            <Text.Truncate 
              className={classNames.textPadding}
              variant='p' 
              numberOfLines={3}
              noPadding
            >
              {description}
            </Text.Truncate>
          ) : null}

          {author ? (
            <Text 
              className={cn(
                classNames.byline,
                classNames.textPadding
              )}
            >
              {author}
            </Text>
          ) : null}

          {date ? (
            <Text 
              className={cn(
                classNames.byline,
                classNames.textPadding
              )}
            >
              {date}
            </Text>
          ) : null}
        </div>
      </Clickable>
      {StyleSheet}
    </>
  );
}

function CardSpacer() {
  return (
    <div className={classNames.spacer}/>
  )
}

const comparisonFn = function(prevProps: any, nextProps: any) {
  return prevProps.id && prevProps.id === nextProps.id;
};

export const Card2 = {
  Stacked: React.memo(CardStacked, comparisonFn),
  Spacer: React.memo(CardSpacer, comparisonFn)
}

export default Card2;