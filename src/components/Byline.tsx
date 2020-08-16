import React from 'react';
import Theme from './Theme';
import Text from './Text';
import { formatDate, capitalizedToHypenated } from '../shared/src/utils';
import { styleHelpers } from '../utils';
import Link from 'next/link';

function Authors({
  updatedAt,
  publishDate,
  authors
}: {
  authors: string[]
  updatedAt: number
  publishDate: number
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();
  const wasUpdated = updatedAt > publishDate;

  const authorsExceptLast = authors.slice(0);
  let last: string | undefined;
  if(authors.length > 1) {
    last = authorsExceptLast.pop();
  }

  return (
    <>
      <div style={styles.row}>
        {authors.map((author) => (
          <Link 
            key={author}
            // FIX THIS: get slug from backend
            href={'/author/[slug]'}
            as={`/author/${capitalizedToHypenated(author)}`}
          >
            <a 
              style={styles.hideLink}
              aria-label={`More articles by ${author}`}
            >
              <div 
                className={cng(styles.avatar)}
                // style={{
                //   backgroundImage: `url(${img})`
                // }}
              />
            </a>
          </Link>
        ))}

        <div style={styles.column}>
          <div style={styles.authors}>
            {authorsExceptLast.map((author, i) => (
              <React.Fragment key={author}>
                <Link 
                  // FIX THIS: get slug from backend
                  href={'/author/[slug]'}
                  as={`/author/${capitalizedToHypenated(author)}`}
                >
                  <a 
                    style={styles.hideLink}
                    aria-label={`More articles by ${author}`}
                  >
                    <Text style={styles.author}>{author}</Text>
                  </a>
                </Link>
                {(i < authorsExceptLast.length - 1) ? (<Text style={styles.breakSpaces}>, </Text>) : null}
              </React.Fragment>
            ))}
            {last ? (
              <>
                <Text style={styles.breakSpaces}> and </Text>
                <Link 
                  // FIX THIS: get slug from backend
                  href={'/author/[slug]'}
                  as={`/author/${capitalizedToHypenated(last)}`}
                >
                  <a style={styles.hideLink}>
                    <Text style={styles.author}>{last}</Text>
                  </a>
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
    backgroundColor: '#000',
    height: 40,
    width: 40,
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    marginRight: theme.spacing(2),
    [theme.mediaQuery('xs', 'sm')]: {
      display: 'none'
    }
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
  }
}));

export const Byline = {
  Authors,
  Date
}

export default Byline;