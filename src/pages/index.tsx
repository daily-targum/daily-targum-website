import React from 'react';
import Link from 'next/link';
import { actions, GetHomepage, Article } from '../shared/src/client';
import { Section, NewsCard, Theme, Divider, Text, NewsSlider, Newsletter, CardRow } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Section {
  id: string,
  title: string
}

function chopArray<I>(arr: I[]) {
  return [[arr[0]], [arr[1], arr[2]], [arr[3], arr[4]]];
}

function NewsRow({
  id,
  title,
  category
}: {
  id: string,
  title: string,
  category: Article[]
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <div className={classes.section}>
      <div className={classes.sectionHeader}>
        <Text variant='h3'>{title}</Text>
        <Link 
          href='/section/[section]'
          as={`/section/${id}`}
        >
          <a className={classes.moreInLink}>
            <Text variant='h4' style={{fontWeight: 400}} className={classes.moreInLinkText}>
              More in {title}
            </Text>
            <FontAwesomeIcon icon={faArrowRight}/>
          </a>
        </Link>
      </div>

      <CardRow items={chopArray(category)}>
        {(item, i) => i === 0 ? (
          <NewsCard.Large 
            article={item[0]}
            className={[classes.aspectRadio, classes.card].join(' ')}
          />
        ) : (
          <>
            <NewsCard.Medium 
              article={item[0]}
              className={classes.card}
            />
            <NewsCard.Medium 
              article={item[1]}
              className={classes.card}
            />
          </>
        )}
      </CardRow>
    </div>
  );
}

function literalArray<T extends string>(array: T[]): T[] {
  return array
}

function capitalizeWords(str: string){
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function camelCaseToCapitalized(str: string) {
  return capitalizeWords(str.replace(/([A-Z])/, ' $1'));
}


function Home({ 
  homepage 
}: { 
  homepage: GetHomepage
}) {
  return (
    <>
      <NewsSlider articles={homepage.high}/>
      <Section>
        {literalArray(['news', 'sports', 'insideBeat', 'opinions']).map((category, i) => (
          <React.Fragment
            key={category}
          >
            {i > 0 ? <Divider/> : null}
            <NewsRow
              category={homepage[category]}
              id={category}
              title={camelCaseToCapitalized(category)}
            />
          </React.Fragment>
        ))}
      </Section>
      <Divider/>
      <Newsletter.Section/>
    </>
  );
}

Home.getInitialProps = async () => {
  const homepage = await actions.getHomepage();
  return { 
    homepage
  };
};

const styleCreator = Theme.makeStyleCreator(theme => ({
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  section: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8)
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  moreInLink: {
    textDecoration: 'none',
    color: theme.colors.accent,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreInLinkText: {
    marginRight: theme.spacing(1),
    fontWeight: 600
  },
  aspectRadio: {
    paddingTop: '56.25%'
  },
  slider: {
    height: 400,
    position: 'relative'
  },
  slide: {
    height: 400,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}));

export default Home;