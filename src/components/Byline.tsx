import React from 'react';
import Theme from './Theme';
import Text from './Text';
import { formatDate } from '../shared/src/utils';
import { Author } from '../shared/src/client';
import { styleHelpers, imgix } from '../utils';
import Link from './Link';
import { AspectRatioImage } from './AspectRatioView';

function Authors({
  updatedAt,
  publishDate,
  authors
}: {
  authors: Author[]
  updatedAt: number
  publishDate: number
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();
  const wasUpdated = updatedAt > publishDate;

  const authorsExceptLast = authors.slice(0);
  let last: Author | undefined;
  if(authors.length > 1) {
    last = authorsExceptLast.pop();
  }

  return (
    <>
      <div style={styles.row}>
        {authors.map(author => author.headshot ? (
          <Link 
            key={author.id}
            href={`/staff/${author.slug}`}
            className={cng(styles.avatar)}
            // FIX THIS: does aria-label work as expected
            aria-label={`More articles by ${author.displayName}`}
          >
            <AspectRatioImage
              aspectRatio={1}
              style={styles.avatar}
              data={imgix(author.headshot, {
                xs: imgix.presets.xs('1:1')
              })}
              altText={`Author headshot for ${author.displayName}`}
            />
          </Link>
        ) : null)}

        <div style={styles.column}>
          <div style={styles.authors}>
            {authorsExceptLast.map((author, i) => (
              <React.Fragment key={author.id}>
                <Link 
                  href={`/staff/${author.slug}`}
                  style={styles.hideLink}
                  aria-label={`More articles by ${author.displayName}`}
                >
                  <Text style={styles.author}>{author.displayName}</Text>
                </Link>
                {(i < authorsExceptLast.length - 1) ? (<Text style={styles.breakSpaces}>, </Text>) : null}
              </React.Fragment>
            ))}

            {last ? (
              <>
                <Text style={styles.breakSpaces}> and </Text>
                <Link 
                  href={`/staff/${last.slug}`}
                  style={styles.hideLink}
                >
                  <Text style={styles.author}>{last.displayName}</Text>
                </Link>
              </>
            ) : null}
          </div>
          <Text style={styles.date} noPadding>{wasUpdated ? ('Updated '+formatDate(updatedAt)) : formatDate(publishDate)}</Text>
        </div>

      </div>
      <Text.Br/>
    </>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  row: {
    ...styleHelpers.flex('row'),
    alignItems: 'center',
    margin: theme.spacing(2, 0)
  },
  column: {
    ...styleHelpers.flex('column')
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    marginRight: theme.spacing(2)
  },
  date: {
    color: theme.colors.textMuted
  },
  author: {
    color: theme.colors.accent
  },
  authors: {
    ...styleHelpers.flex('row'),
    marginBottom: theme.spacing(0.4)
  },
  hideLink: {
    ...styleHelpers.hideLink()
  },
  breakSpaces: {
    whiteSpace: 'break-spaces'
  },
  avatarWrap: {
    ...styleHelpers.hideLink(),
    [theme.mediaQuery('xs', 'sm')]: {
      display: 'none'
    }
  }
}));

export const Byline = {
  Authors,
  Date
}

export default Byline;