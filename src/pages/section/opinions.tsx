import React from 'react';
import Link from 'next/link';
import { actions, GetArticles, Article } from '../../shared/src/client';
import { Section, Theme, Text, Grid, Divider, CardRow, AspectRatioImage } from '../../components';
import { styles } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


function Card({
  article
}: {
  article: Article
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Link
      href='/article/[year]/[month]/[slug]'
      as={`/${article.slug}`}
    >
      <a className={classes.cardLink}>
        <Grid.Row>
          {/* Desktop */}
          <Grid.Col 
            xs={0}
            sm={24}
          >
            <div className={classes.card}>
              <div 
                className={classes.cardImage}
                style={{
                  backgroundImage: `url(${article.media})`
                }}
              />
              <div className={classes.cardBody}>
                <Text className={classes.tag}>News</Text>
                <Text variant='h4' numberOfLines={3}>{article.title}</Text>
              </div>
            </div>
          </Grid.Col>
          {/* Mobile */}
          <Grid.Col 
            xs={24}
            sm={0}
          >
            <div className={classes.cardMobile}>
              <AspectRatioImage
                style={{width: 200}}
                aspectRatio={[1,1]}
                src={article.media[0]}
              />
              <div className={classes.cardBody}>
                <Text className={classes.tag}>News</Text>
                <Text variant='h4' numberOfLines={3}>{article.title}</Text>
              </div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </a>
    </Link>
  )
}

function Column({
  title,
  articles
}: {
  title: string
  articles: Article[]
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <div className={classes.section}>
      <div className={classes.sectionHeader}>
        <div>
        <Text variant='h3'>{title}</Text>
        </div>
        <Link 
          href='/section/opinions/[column]'
          as='/section/opinions/column'
        >
          <a className={classes.moreInLink}>
            <Text variant='h4' style={{fontWeight: 400}} className={classes.moreInLinkText}>
              More in {title}
            </Text>
            <FontAwesomeIcon icon={faArrowRight}/>
          </a>
        </Link>
      </div>

      <CardRow items={articles}>
        {article => <Card article={article}/>}
      </CardRow>
    </div>
  );
}

function Category({ 
  section
}: { 
  section: GetArticles
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const theme = Theme.useTheme();

  return (
    <Section className={classes.page}>
      <Text variant='h2'>Opinions</Text>

      <Grid.Row spacing={theme.spacing(2)}>
        <Grid.Col>
          <Card article={section.items[0]}/>
        </Grid.Col>

        <Grid.Col>
          <Card article={section.items[1]}/>
        </Grid.Col>

        <Grid.Col>
          <Card article={section.items[2]}/>
        </Grid.Col>
      </Grid.Row>

      <Divider className={classes.divider}/>
      <Text variant='h2'>Our Columnists</Text>

      <Divider className={classes.divider}/>
      <Column
        title='Column'
        articles={section.items}
      />

    </Section>
  );
}

const styleCreator =  Theme.makeStyleCreator(theme => ({
  page: {
    ...styles.page(theme),
    backgroundColor: theme.colors.background
  },

  
  card: {
    ...styles.flex(),
    flex: 1
  },
  cardImage: {
    ...styles.aspectRatioFullWidth(3, 2),
    ...styles.centerBackgroundImage()
  },
  cardBody: {
    padding: theme.spacing(2),
    backgroundColor: theme.colors.surface,
    flex: 1
  },
  cardMobile: {
    ...styles.flex('row'),
    marginBottom: theme.spacing(2)
  },
  cardMobileImage: {
    // ...styles.aspectRatioFullWidth(1, 1),
    width: 200,
    paddingTop: '100%',
    ...styles.centerBackgroundImage()
  },
  tag: {
    color: '#fff',
    backgroundColor: theme.colors.accent,
    padding: theme.spacing(0.5, 1),
    marginBottom: theme.spacing(1),
  },
  cardLink: {
    ...styles.hideLink(),
    display: 'flex',
    flex: 1
  },


  divider: {
    margin: theme.spacing(4, 0, 2)
  },
  section: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8)
  },
  sectionHeader: {
    ...styles.flex('row'),
    justifyContent: 'space-between'
  },
  moreInLink: {
    ...styles.flex('row'),
    textDecoration: 'none',
    color: theme.colors.accent,
    alignItems: 'center',
  },
  moreInLinkText: {
    marginRight: theme.spacing(1),
    fontWeight: 600
  },
  hideLink: {
    ...styles.hideLink(),
  }
}));

Category.getInitialProps = async () => {
  const section = await actions.getArticles({
    category: 'inside-beat',
    limit: 20
  });
  return { 
    section
  };
};

export default Category;