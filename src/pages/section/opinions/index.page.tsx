import React from 'react';
import { actions, GetArticles, CompactArticle } from '../../../shared/src/client';
import { formatDateAbriviated, hyphenatedToCapitalized } from '../../../shared/src/utils';
import { Section, Theme, Text, Divider, CardCols, Card, Grid, Banner, AspectRatioImage, SEOProps, Carousel, Link } from '../../../components';
import { styleHelpers, imgix } from '../../../utils';
import { GetStaticProps } from 'next';

function Column({
  title,
  subcategory,
  articles
}: {
  title: string
  subcategory: string
  articles: CompactArticle[]
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  return (
    <div style={styles.section}>
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
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  return (
    <Section style={styles.page}>
      <Banner text='Opinions'/>

      <Grid.Row spacing={theme.spacing(2)}>
        <CardCols items={featured}>
          {article => article ? (
            <Card.ImageResponsive
              id={article.id}
              tag='Column'
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
            />
          ) : null}
        </CardCols>
      </Grid.Row>

      <Divider style={styles.divider}/>
      <Text variant='h2'>Our Columnists</Text>
      <Carousel
        data={initSection.columnists}
        renderItem={(author) => author.headshot ? (
          <Link
            href={`/staff/${author.slug}`}
            style={styles.columnist}
          >
            <AspectRatioImage
              aspectRatio={1}
              style={styles.columnistPicture}
              data={imgix(author.headshot, {
                xs: imgix.presets.xs('1:1')
              })}
            />
            <Text style={styles.columnistTitle}>{author.displayName}</Text>
          </Link>
        ) : null}
        keyExtractor={author => author.id}
      />

      <Divider style={styles.divider}/>

      {initSection.items.map(column => (
        <Column
          key={column.name}
          subcategory={column.name}
          title={hyphenatedToCapitalized(column.name)}
          articles={column.articles}
        />
      ))}
    </Section>
  );
}

const styleCreator =  Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    flex: 1
  },
  divider: {
    margin: theme.spacing(6, 0, 4)
  },
  section: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8)
  },
  sectionHeader: {
    ...styleHelpers.flex('row'),
    justifyContent: 'space-between'
  },
  moreInLink: {
    ...styleHelpers.flex('row'),
    textDecoration: 'none',
    color: theme.colors.accent,
    alignItems: 'center',
  },
  moreInLinkText: {
    marginRight: theme.spacing(1),
    fontWeight: 600
  },
  hideLink: {
    ...styleHelpers.hideLink(),
  },
  columnist: {
    ...styleHelpers.flex(),
    alignItems: 'center',
    ...styleHelpers.hideLink(),
    padding: `${theme.spacing(5)}px 2.5vw`
  },
  columnistPicture: {
    ...styleHelpers.lockHeight(120),
    ...styleHelpers.lockWidth(120),
    borderRadius: '100%',
    marginBottom: theme.spacing(1),
    overflow: 'hidden'
  },
  columnistTitle: {
    ...styleHelpers.textCenter(),
    ...styleHelpers.lockWidth(140)
  }
}));

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