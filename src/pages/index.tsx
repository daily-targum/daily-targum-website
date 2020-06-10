import React from 'react';
import Link from 'next/link';
import { actions, GetArticles } from '../shared/src/client';
import { Section, NewsCard, Grid, Theme, Divider, Text, NewsSlider, Newsletter } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface Section {
  id: string,
  title: string
}

interface FeedItem extends GetArticles, Section {}

const sections: Section[] = [
  {
    id: 'News',
    title: 'News'
  },
  {
    id: 'Sports',
    title: 'Sports'
  },
  {
    id: 'Opinions',
    title: 'Opinions'
  },
  {
    id: 'inside-beat',
    title: 'Inside Beat'
  }
];


function NewsRow({
  category
}: {
  category: FeedItem
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const {spacing} = Theme.useTheme();
  return (
    <div className={classes.section}>
      <div className={classes.sectionHeader}>
        <Text variant='h3'>News</Text>
        <Link 
          href='/section/[section]'
          as={`/section/${category.id}`}
        >
          <a className={classes.moreInLink}>
            <Text variant='h4' className={classes.moreInLinkText}>
              More in {category.title}
            </Text>
            <FontAwesomeIcon icon={faPlusCircle}/>
          </a>
        </Link>
      </div>
      <Grid.Row spacing={spacing(2)}>
        <Grid.Col xs={24} md={0}>
          <NewsCard.Large
            article={category.items[0] as any} 
            className={[classes.aspectRadio, classes.card].join(' ')}
          />
        </Grid.Col>
        <Grid.Col xs={0} md={12} lg={8}>
          <NewsCard.Large
            article={category.items[0] as any} 
            className={[classes.card].join(' ')}
          />
        </Grid.Col>
        <Grid.Col xs={24} md={12} lg={8}>
          <NewsCard.Medium
            article={category.items[1] as any} 
            className={classes.card}
          />
          <NewsCard.Medium
            article={category.items[2] as any} 
            className={classes.card}
          />
        </Grid.Col>
        <Grid.Col xs={24} md={0} lg={8}>
          <NewsCard.Medium
            article={category.items[3] as any} 
            className={classes.card}
          />
          <NewsCard.Medium
            article={category.items[4] as any} 
            className={classes.card}
          />
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}


function Home({ 
  feed 
}: { 
  feed: FeedItem[]
}) {
  return (
    <>
      <NewsSlider
        articles={feed.map(f => f.items[0]) as any[]}
      />
      <Section>
        {feed.map((category, i) => (
          <React.Fragment
            key={category.id}
          >
            {i > 0 ? <Divider/> : null}
            <NewsRow
              category={category}
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
  const feed = await Promise.all(sections.map(section => (
    actions.getArticles({
      category: section.id,
      limit: 20
    })
  )));
  return { 
    feed: feed.map((category, i) => ({
      ...category,
      ...sections[i]
    }))
  };
};

const styleCreator = Theme.makeStyleCreator(theme => ({
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  section: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
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