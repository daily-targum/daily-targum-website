import React from 'react';
import Text from './Text';
import { formatDate } from '../shared/src/utils';
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
    <>
      <div className={styles.row}>
        {authors.map(author => author.headshot ? (
          <Link 
            key={author.id}
            href={`/staff/${author.slug}`}
            className={styles.avatar}
            // FIX THIS: does aria-label work as expected
            aria-label={`More articles by ${author.displayName}`}
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
          <div className={styles.authors}>
            {authorsExceptLast.map((author, i) => (
              <React.Fragment key={author.id}>
                <Link 
                  href={`/staff/${author.slug}`}
                  className={styles.hideLink}
                  aria-label={`More articles by ${author.displayName}`}
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
                >
                  <Text className={styles.author}>{last.displayName}</Text>
                </Link>
              </>
            ) : null}
          </div>
          <Text className={styles.date} noPadding>{formatDate(publishDate)}</Text>
        </div>

      </div>
      <Text.Br/>
    </>
  );
}

export const Byline = {
  Authors,
  Date
}

export default Byline;