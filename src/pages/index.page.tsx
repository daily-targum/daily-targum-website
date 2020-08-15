import React from 'react';
import { actions, GetHomepage, Article } from '../shared/src/client';
import { Section, Theme, Divider, NewsSlider, Newsletter, Card, CardCols, Grid, Text, Image } from '../components';
import { formatDateAbriviated, chopArray, camelCaseToCapitalized, camelCaseToHyphenated } from '../shared/src/utils';
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
                id={item[0].id} 
                title={item[0].title}
                imageData={imgix(item[0].media[0], {
                  xs: imgix.presets.square.md,
                  md: imgix.presets.fourByThree.md
                })}
                href='/article/[year]/[month]/[slug]'
                as={item[0].slug}
                date={formatDateAbriviated(item[0].publishDate)}
              />
            ) : (
              <>
                <Card.CompactResponsive
                  id={item[0].id} 
                  title={item[0].title}
                  imageData={imgix(item[0].media[0], {
                    xs: imgix.presets.square.md
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={item[0].slug}
                  aspectRatioMobile={1}
                  date={formatDateAbriviated(item[0].publishDate)}
                  author={item[0].authors[0]}
                />
                <Card.Spacer/>
                <Card.CompactResponsive
                  id={item[1].id}
                  title={item[1].title}
                  imageData={imgix(item[1].media[0], {
                    xs: imgix.presets.square.md
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={item[1].slug}
                  aspectRatioMobile={1}
                  date={formatDateAbriviated(item[1].publishDate)}
                  author={item[1].authors[0]}
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
                id={camelCaseToHyphenated(category)}
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
            <Image
              style={styles.appScreenShot}
              data={imgix('https://dailytargum.imgix.net/images/app-framed.png', {
                xs: imgix.presets.original.md,
                lg: imgix.presets.original.lg
              })}
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