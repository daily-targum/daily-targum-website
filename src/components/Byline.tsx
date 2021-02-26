import * as React from 'react';
import Text from './Text';
import { formatDate, formatDateAbriviated } from '../utils';
import { Author } from '../aws';
import { imgix } from '../utils';
import Link from './Link';
import { AspectRatioImage } from './AspectRatioView';

import Styles from './Byline.styles';
const { classNames, StyleSheet } = Styles;

function getInitials(name: string) {
  return name.replace(/^(the)\s+/ig, '').split(' ').map(n => n[0] ?? '').join('');
}

function Authors({
  publishDate,
  authors,
  compact = false
}: {
  authors: Author[];
  publishDate: number;
  compact?: boolean
}) {
  const authorsExceptLast = authors.slice(0);
  let last: Author | undefined;
  if(authors.length > 1) {
    last = authorsExceptLast.pop();
  }

  return (
    <>
      <div className={classNames.row}>
        {compact ? null : (
          <aside 
            className={classNames.aside}
            aria-hidden={true}
          >
            {authors.map(author => (
              <Link 
                key={author.id}
                href={`/staff/${author.slug}`}
                className={classNames.avatar}
                label={`More articles by ${author.displayName}`}
                tabIndex={-1}
              >
                {author.headshot ? (
                  <AspectRatioImage
                    aspectRatio={1}
                    className={classNames.avatar}
                    data={imgix(author.headshot, {
                      xs: imgix.presets.xs('1:1')
                    })}
                    altText={`Author headshot for ${author.displayName}`}
                  />
                ): (
                  <div className={classNames.initials}>
                    {getInitials(author.displayName)}
                  </div >
                )}
              </Link>
            ))}
          </aside>
        )}

        <div className={classNames.column}>
          <address className={classNames.authors}>
            {authorsExceptLast.map((author, i) => (
              <React.Fragment key={author.id}>
                <Link 
                  href={`/staff/${author.slug}`}
                  className={classNames.hideLink}
                  label={`More articles by ${author.displayName}`}
                  rel='author'
                >
                  <Text className={classNames.author}>{author.displayName}</Text>
                </Link>
                {(i < authorsExceptLast.length - 1) ? (<Text className={classNames.breakSpaces}>, </Text>) : null}
              </React.Fragment>
            ))}

            {last ? (
              <>
                &nbsp;and&nbsp;
                <Link 
                  href={`/staff/${last.slug}`}
                  className={classNames.hideLink}
                  rel='author'
                >
                  <Text className={classNames.author}>{last.displayName}</Text>
                </Link>
              </>
            ) : null}
          </address>
          <Text 
            className={classNames.date} 
            htmlTag='time' 
            noPadding
          >
            {compact ? formatDateAbriviated(publishDate) : formatDate(publishDate)}
          </Text>
        </div>

      </div>
      {StyleSheet}
    </>
  );
}

function Compact({
  publishDate,
  authors
}: {
  authors: Author[]
  publishDate: number
}) {
  return (
    <>
      <div className={classNames.bylineCompact}>
        <Text htmlTag='time' className={classNames.bylineCompactDate}>{formatDateAbriviated(publishDate)}</Text>
        <Text className={classNames.bylineCompactAuthor}>
          {'By ' + authors.join(', ') + ' '}
        </Text>
      </div>
      {StyleSheet}
    </>
  )
}

export const Byline = {
  Authors,
  Compact
}

export default Byline;