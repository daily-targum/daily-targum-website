import React from 'react';
import { actions, GetHomepage, CompactArticle } from '../shared/src/client';
import { Section, Theme, Divider, NewsSlider, Newsletter, Card, CardCols, Grid, SEOProps,
  // Text, Image, Link 
} from '../components';
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
  category: CompactArticle[]
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  return (
    <div style={styles.newsRow}>

      <CardCols.Header
        title={title}
        href={`/section/${id}`}
      />

      <Divider style={styles.divider}/>

      <Grid.Row spacing={theme.spacing(2.5)}>
        <CardCols items={chopArray(category, [1, 2, 2])}>
          {(item, i) => {
            if(!item) return null;
            return i === 0 ? (
              <Card.ImageResponsive 
                id={item[0].id} 
                title={item[0].title}
                imageData={imgix(item[0].media[0]?.url ?? '', {
                  xs: imgix.presets.md('1:1'),
                  md: imgix.presets.md('16:9')
                })}
                href='/article/[year]/[month]/[slug]'
                as={item[0].slug}
                date={formatDateAbriviated(item[0].publishDate)}
                author={item[0].authors.map(a => a.displayName).join(', ')}
              />
            ) : (
              <>
                <Card.CompactResponsive
                  id={item[0].id} 
                  title={item[0].title}
                  imageData={imgix(item[0].media[0]?.url ?? '', {
                    xs: imgix.presets.md('1:1')
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={item[0].slug}
                  aspectRatioMobile={1}
                  date={formatDateAbriviated(item[0].publishDate)}
                  author={item[0].authors.map(a => a.displayName).join(', ')}
                />
                <Card.Spacer/>
                <Card.CompactResponsive
                  id={item[1].id}
                  title={item[1].title}
                  imageData={imgix(item[1].media[0]?.url ?? '', {
                    xs: imgix.presets.md('1:1')
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={item[1].slug}
                  aspectRatioMobile={1}
                  date={formatDateAbriviated(item[1].publishDate)}
                  author={item[1].authors.map(a => a.displayName).join(', ')}
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
        <Section style={styles.mainSection}>
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

      {/* <Divider/>
      <Section style={styles.appSection}>
        <Grid.Row>
          <Grid.Col xs={24} md={12} style={styles.getTheApp}>
            <Text variant='h1'>Get the App</Text>
            <div style={styles.appStoreRow}>

              <Link href='https://apps.apple.com/us/app/daily-targum/id486306039'>
                <img
                  style={styles.appStoreBadge}
                  src='/app-store-badge.svg'
                  loading='lazy'
                />
              </Link>

              <Link href='https://play.google.com/store/apps/details?id=com.dailytargum.dailytargum'>
                <img
                  style={styles.appStoreBadge}
                  src='/google-play-badge.png'
                  loading='lazy'
                />  
              </Link>

            </div>
          </Grid.Col>

          <Grid.Col xs={24} md={12} style={{alignItems: 'center'}}>
            <Image
              style={styles.appScreenShot}
              data={imgix('https://dailytargum.imgix.net/images/app-framed.png', {
                xs: imgix.presets.md(),
                lg: imgix.presets.lg()
              })}
            />
          </Grid.Col>
        </Grid.Row>
      </Section> */}

    </div>
  );
}

export async function getStaticProps() {
  const homepage = await actions.getHomepage();

  const seo: SEOProps = {};

  const firstArticle = homepage?.high?.[0];
  if (firstArticle?.media?.[0]?.url) {
    seo.imageSrc = firstArticle.media[0].url;
  }

  return {
    props: {
      homepage,
      seo
    },
    revalidate: 60 // seconds
  }
};

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    backgroundColor: theme.colors.surface,
    flex: 1
  },
  mainSection: {
    paddingBottom: theme.spacing(6)
  },
  newsRow: {
    marginTop: `calc(${theme.spacing(3)}px + 1vw)`,
    marginBottom: `calc(${theme.spacing(4)}px + 1vw)`,
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
    paddingTop: theme.spacing(5),
    backgroundColor: theme.colors.background
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
  divider: {
    marginBottom: theme.spacing(2.5)
  }
}));

export default Home;