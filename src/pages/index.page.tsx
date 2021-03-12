import * as React from 'react';
import { actions, GetHomepage, CompactArticle } from '../shared/src/client';
import { Section, Divider, NewsSlider, Newsletter, Card, CardCols, Grid, SEOProps, Ad, Semantic
  // Text, Image, Link 
} from '../components';
import { formatDateAbriviated, chopArray, camelCaseToCapitalized, camelCaseToHyphenated } from '../shared/src/utils';
import { imgix } from '../utils';
import styles from './index.module.scss';
import { theme } from '../constants';
import { next } from '../constants/next';

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
  return (
    <div className={styles.newsRow}>

      <CardCols.Header
        title={title}
        href={`/section/${id}`}
      />

      <Divider className={styles.divider}/>

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
                altText={item[0].media[0]?.altText ?? item[0].media[0]?.description ?? undefined}
              />
            ) : (
              <>
                <Card.CompactResponsive
                  id={item[0].id} 
                  title={item[0].title}
                  imageData={imgix(item[0].media[0]?.url ?? '', {
                    xs: imgix.presets.md('1:1'),
                    md: imgix.presets.md('6:4')
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={item[0].slug}
                  aspectRatioMobile={1}
                  aspectRatioDesktop={6/4}
                  date={formatDateAbriviated(item[0].publishDate)}
                  author={item[0].authors.map(a => a.displayName).join(', ')}
                  altText={item[0].media[0]?.altText ?? item[0].media[0]?.description ?? undefined}
                />
                <Card.Spacer/>
                <Card.CompactResponsive
                  id={item[1].id}
                  title={item[1].title}
                  imageData={imgix(item[1].media[0]?.url ?? '', {
                    xs: imgix.presets.md('1:1'),
                    md: imgix.presets.md('6:4')
                  })}
                  href='/article/[year]/[month]/[slug]'
                  as={item[1].slug}
                  aspectRatioMobile={1}
                  aspectRatioDesktop={6/4}
                  date={formatDateAbriviated(item[1].publishDate)}
                  author={item[1].authors.map(a => a.displayName).join(', ')}
                  altText={item[1].media[0]?.altText ?? item[1].media[0]?.description ?? undefined}
                />
              </>
            );
          }}
        </CardCols>
      </Grid.Row>

      <CardCols.Footer
        title={title}
        href={`/section/${id}`}
      />
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
  return (
    <div className={styles.page}>
      {/* for SEO */}
      <h1 style={{display: 'none'}} aria-hidden={true}>The Daily Targum</h1>

      <Semantic role='main' pritable skipNavContent>
        <div aria-label='Highlighted articles slide show' data-tooltip-position='none'>
          <NewsSlider articles={homepage.high}/>
        </div>

        <Section className={styles.mainSection}>
          {literalArray(['news', 'sports', 'insideBeat', 'opinions']).map((category, i) => (
            <div
              key={category}
              aria-label={`${category}, latest articles`}
              data-tooltip-position='none'
            >
              <NewsRow
                category={homepage[category]}
                id={camelCaseToHyphenated(category)}
                title={camelCaseToCapitalized(category)}
              />
              {i === 1 ? (
                <Ad type='banner'/>
              ) : null}
            </div>
          ))}

          <Ad type='banner' priority={2}/>
        </Section>
      </Semantic>

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
    revalidate: next.staticPropsRevalidateSeconds
  }
};

export default Home;