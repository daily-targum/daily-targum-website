import React from 'react';
import Link from 'next/link';
import { actions, GetHomepage, Article } from '../shared/src/client';
import { Section, NewsCard, Grid, Theme, Divider, Text, NewsSlider, Newsletter, Navbar } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Section {
  id: string,
  title: string
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
  const {spacing} = Theme.useTheme();
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
      <Grid.Row spacing={spacing(2)}>
        <Grid.Col xs={24} md={0}>
          <NewsCard.Large
            article={category[0] as any} 
            className={[classes.aspectRadio, classes.card].join(' ')}
          />
        </Grid.Col>
        <Grid.Col xs={0} md={12} lg={8}>
          <NewsCard.Large
            article={category[0] as any} 
            className={[classes.card].join(' ')}
          />
        </Grid.Col>
        <Grid.Col xs={24} md={12} lg={8}>
          <NewsCard.Medium
            article={category[1] as any} 
            className={classes.card}
          />
          <NewsCard.Medium
            article={category[2] as any} 
            className={classes.card}
          />
        </Grid.Col>
        <Grid.Col xs={24} md={0} lg={8}>
          <NewsCard.Medium
            article={category[3] as any} 
            className={classes.card}
          />
          <NewsCard.Medium
            article={category[4] as any} 
            className={classes.card}
          />
        </Grid.Col>
      </Grid.Row>
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
  Navbar.useDynamicHeader();
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
    fontWeight: '600' as any
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