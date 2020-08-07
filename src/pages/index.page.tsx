import React from 'react';
import { actions, GetHomepage, Article } from '../shared/src/client';
import { Section, Theme, Divider, NewsSlider, Newsletter, Card, CardCols, Grid, Text } from '../components';
import { formatDateAbriviated, chopArray, camelCaseToCapitalized } from '../shared/src/utils';
import { styleHelpers, imgix } from '../utils';

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
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  return (
    <div style={styles.section}>
      <CardCols.Header
        title={title}
        href={`/section/${id}`}
      />

      <Grid.Row spacing={theme.spacing(2)}>
        <CardCols items={chopArray(category, [1, 2, 2])}>
          {(item, i) => {
            if(!item) return null;
            return i === 0 ? (
              <Card.ImageResponsive 
                title={item[0].title}
                image={imgix(item[0].media[0], imgix.presets.fourByThree.medium)}
                href='/article/[year]/[month]/[slug]'
                as={item[0].slug}
                date={formatDateAbriviated(item[0].publishDate)}
              />
            ) : (
              <>
                <Card.Compact
                  title={item[0].title}
                  image={imgix(item[0].media[0], imgix.presets.fourByThree.medium)}
                  href='/article/[year]/[month]/[slug]'
                  as={item[0].slug}
                  aspectRatio={3/2}
                  date={formatDateAbriviated(item[0].publishDate)}
                />
                <Card.Spacer/>
                <Card.Compact
                  title={item[1].title}
                  image={imgix(item[1].media[0], imgix.presets.fourByThree.medium)}
                  href='/article/[year]/[month]/[slug]'
                  as={item[1].slug}
                  aspectRatio={3/2}
                  date={formatDateAbriviated(item[1].publishDate)}
                />
              </>
            );
          }}
        </CardCols>
      </Grid.Row>
    </div>
  );
}

function literalArray<T extends string>(array: T[]): T[] {
  return array
}

function Home({ 
  homepage 
}: { 
  homepage: GetHomepage
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div style={styles.page}>

      <main>
        <NewsSlider articles={homepage.high}/>
        <Section>
          {literalArray(['news', 'sports', 'insideBeat', 'opinions']).map((category) => (
            <React.Fragment
              key={category}
            >
              <NewsRow
                category={homepage[category]}
                id={category}
                title={camelCaseToCapitalized(category)}
              />
            </React.Fragment>
          ))}
        </Section>
      </main>

      <Divider/>
      <Newsletter.Section/>

      <Divider/>
      <Section style={styles.appSection}>
        <Grid.Row>
          <Grid.Col xs={24} md={12} style={styles.getTheApp}>
            <Text variant='h1'>Get the App</Text>
            <div style={styles.appStoreRow}>
              <img
                style={styles.appStoreBadge}
                src='/app-store-badge.svg'
                loading='lazy'
              />
              <img
                style={styles.appStoreBadge}
                src='/google-play-badge.png'
                loading='lazy'
              />  
            </div>
          </Grid.Col>

          <Grid.Col xs={24} md={12} style={{alignItems: 'center'}}>
            <img
              style={styles.appScreenShot}
              src='/app-framed.png'
              loading='lazy'
            />
          </Grid.Col>
        </Grid.Row>
      </Section>

    </div>
  );
}

export async function getStaticProps() {
  const homepage = await actions.getHomepage();

  return {
    props: {
      homepage
    },
    revalidate: 60 // seconds
  }
};

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    backgroundColor: theme.colors.background
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
  },
  appSection: {
    paddingTop: theme.spacing(5)
  },
  appStoreRow: {
    ...styleHelpers.flex('row'),
    alignItems: 'center'
  },
  appStoreBadge: {
    ...styleHelpers.lockHeight(45),
    margin: theme.spacing(1)
  },
  getTheApp: {
    alignItems: 'center', 
    justifyContent: 'center',
    padding: theme.spacing(0, 0, 6)
  },
  appScreenShot: {
    width: 'auto',
    height: 'calc(300px + 3vw)'
  },
}));

export default Home;