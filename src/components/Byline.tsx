import React from 'react';
import Text from './Text';
import { formatDate, formatDateAbriviated } from '../shared/src/utils';
import { Author } from '../shared/src/client';
import { imgix } from '../utils';
import Link from './Link';
import { AspectRatioImage } from './AspectRatioView';

import styles from './Byline.module.scss';

function Authors({
  publishDate,
  authors
}: {
  authors: Author[]
  publishDate: number
}) {
  const authorsExceptLast = authors.slice(0);
  let last: Author | undefined;
  if(authors.length > 1) {
    last = authorsExceptLast.pop();
  }

  return (
    <div className={styles.row}>
      {authors.map(author => author.headshot ? (
        <Link 
          key={author.id}
          href={`/staff/${author.slug}`}
          className={styles.avatar}
          label={`More articles by ${author.displayName}`}
          tabIndex={-1}
        >
          <AspectRatioImage
            aspectRatio={1}
            className={styles.avatar}
            data={imgix(author.headshot, {
              xs: imgix.presets.xs('1:1')
            })}
            altText={`Author headshot for ${author.displayName}`}
          />
        </Link>
      ) : null)}

      <div className={styles.column}>
        <address className={styles.authors}>
          {authorsExceptLast.map((author, i) => (
            <React.Fragment key={author.id}>
              <Link 
                href={`/staff/${author.slug}`}
                className={styles.hideLink}
                label={`More articles by ${author.displayName}`}
                rel='author'
              >
                <Text className={styles.author}>{author.displayName}</Text>
              </Link>
              {(i < authorsExceptLast.length - 1) ? (<Text className={styles.breakSpaces}>, </Text>) : null}
            </React.Fragment>
          ))}

          {last ? (
            <>
              <Text className={styles.breakSpaces}> and </Text>
              <Link 
                href={`/staff/${last.slug}`}
                className={styles.hideLink}
                rel='author'
              >
                <Text className={styles.author}>{last.displayName}</Text>
              </Link>
            </>
          ) : null}
        </address>
        <Text className={styles.date} htmlTag='time' noPadding>{formatDate(publishDate)}</Text>
      </div>

    </div>
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
    <div className={styles.bylineCompact}>
      <Text htmlTag='time' className={styles.bylineCompactDate}>{formatDateAbriviated(publishDate)}</Text>
      <Text className={styles.bylineCompactAuthor}>
        {'By ' + authors.join(', ') + ' '}
      </Text>
    </div>
  )
}

export const Byline = {
  Authors,
  Compact
}

export default Byline;