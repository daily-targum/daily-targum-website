import React from 'react';
import { actions, GetArticles, CompactArticle } from '../../../shared/src/client';
import { formatDateAbriviated, hyphenatedToCapitalized } from '../../../shared/src/utils';
import { Section, Text, Divider, CardCols, Card, Grid, Banner, AspectRatioImage, SEOProps, Carousel, Link, Ad, SkipNav } from '../../../components';
import { imgix } from '../../../utils';
import { GetStaticProps } from 'next';
import styles from './index.module.scss';
import { theme } from '../../../constants';

function Column({
  title,
  subcategory,
  articles
}: {
  title: string
  subcategory: string
  articles: CompactArticle[]
}) {
  return (
    <div className={styles.section}>
      <CardCols.Header
        title={title}
        href={`/section/opinions/${subcategory}`}
      />

      <Grid.Row spacing={theme.spacing(2)}>
        <CardCols items={articles}>
          {article => article ? (
            <Card.StackedResponsive 
              id={article.id}
              title={article.title}
              imageData={imgix(article.media[0]?.url ?? '', {
                xs: imgix.presets.sm('1:1'),
                md: imgix.presets.md('16:9')
              })}
              href='/article/[year]/[month]/[slug]'
              as={'/'+article.slug}
              aspectRatioDesktop={16 / 9}
              altText={article.media[0]?.altText ?? article.media[0]?.description ?? undefined}
            />
          ) : null}
        </CardCols>
      </Grid.Row>

    </div>
  );
}

function Category({ 
  featured,
  initSection
}: { 
  featured: CompactArticle[],
  initSection: GetArticles
}) {
  return (
    <Section className={styles.page}>
      <Banner text='Opinions'/>

      <main>
        <SkipNav.Content/>
      
        <Grid.Row spacing={theme.spacing(2)}>
          <CardCols items={featured}>
            {article => article ? (
              <Card.ImageResponsive
                id={article.id}
                tag={hyphenatedToCapitalized(article.subcategory)}
                title={article.title}
                imageData={imgix(article.media[0]?.url ?? '', {
                  xs: imgix.presets.sm('1:1'),
                  md: imgix.presets.md('16:9')
                })}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article.slug}
                aspectRatioDesktop={16 / 9}
                date={formatDateAbriviated(article.publishDate)}
                author={article.authors.map(a => a.displayName).join(', ')}
                altText={article.media[0]?.altText ?? article.media[0]?.description ?? undefined}
              />
            ) : null}
          </CardCols>
        </Grid.Row>

        <Divider className={styles.divider}/>
        <Text variant='h2'>Our Columnists</Text>
        <Carousel
          data={initSection.columnists}
          renderItem={(author) => author.headshot ? (
            <Link
              href={`/staff/${author.slug}`}
              className={styles.columnist}
            >
              <AspectRatioImage
                aspectRatio={1}
                className={styles.columnistPicture}
                data={imgix(author.headshot, {
                  xs: imgix.presets.xs('1:1')
                })}
              />
              <Text className={styles.columnistTitle}>{author.displayName}</Text>
            </Link>
          ) : null}
          keyExtractor={author => author.id}
        />

        <Divider className={styles.divider}/>

        {initSection.items.map((column, i) => (
          <React.Fragment
            key={column.name}
          >
            <Column
              subcategory={column.name}
              title={hyphenatedToCapitalized(column.name)}
              articles={column.articles}
            />
            {((i + 1) % 2 === 0) && ((i + 1) !== initSection.items.length) ? (
              <Ad type='banner'/>
            ) : null}
          </React.Fragment>
        ))}
        
      </main>
    </Section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const initSection = await actions.getArticles({
    category: 'Opinions',
    limit: 4
  });

  let featured: CompactArticle[] = [];
  initSection.items.forEach(item => {
    featured.push(...item.articles);
  });
  featured.sort((a, b) => b.publishDate - a.publishDate);

  const seo: SEOProps = {
    title: 'Opinions'
  };

  const firstArticle = initSection?.items?.[0].articles?.[0];
  if (firstArticle?.media?.[0]?.url) {
    seo.imageSrc = firstArticle.media[0].url;
  }

  return { 
    props: {
      featured: featured.slice(0, 3),
      initSection: initSection ?? null,
      seo
    },
    revalidate: 60 // seconds
  };
};

export default Category;