import React from 'react';
import Link from 'next/link';
import { actions, GetArticles, Article } from '../../../shared/src/client';
import { capitalizedToHypenated } from '../../../shared/src/utils';
import { Section, Theme, Text, Divider, CardCols, Card, FlatList, Grid, Banner } from '../../../components';
import { styleHelpers, imgix } from '../../../utils';

function Column({
  title,
  articles
}: {
  title: string
  articles: Article[]
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  return (
    <div style={styles.section}>
      <CardCols.Header
        title={title}
        href='/section/opinions/[column]'
        as='/section/opinions/column'
      />

      <Grid.Row spacing={theme.spacing(2)}>
        <CardCols items={articles}>
          {article => article ? (
            <Card.StackedResponsive 
              id={article.id}
              title={article.title}
              imageData={imgix(article.media[0], {
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
  section
}: { 
  section: GetArticles
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  return (
    <Section style={styles.page}>
      <Banner text='Opinions'/>

      <Grid.Row spacing={theme.spacing(2)}>
        <CardCols items={section.items.slice(0,3)}>
          {article => article ? (
            <Card.StackedResponsive
              id={article.id}
              tag='Column'
              title={article.title}
              imageData={imgix(article.media[0], {
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

      <Divider style={styles.divider}/>
      <Text variant='h2'>Our Columnists</Text>
      <FlatList
        data={section.columnists}
        renderItem={(author) => (
          <Link
            href='/author/[slug]'
            as={`/author/${capitalizedToHypenated(author)}`}
          >
            <a style={styles.columnist}>
              <div style={styles.columnistPicture}/>
              <Text style={styles.columnistTitle}>{author}</Text>
            </a>
          </Link>
        )}
        keyExtractor={author => author}
        horizontal
      />

      <Divider style={styles.divider}/>
      <Column
        title='Column'
        articles={section.items}
      />
    </Section>
  );
}

const styleCreator =  Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    backgroundColor: theme.colors.background
  },
  divider: {
    margin: theme.spacing(6, 0, 4)
  },
  section: {
    // marginTop: theme.spacing(4),
    // marginBottom: theme.spacing(8)
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
    paddingBottom: theme.spacing(2)
  },
  columnistPicture: {
    ...styleHelpers.lockHeight(120),
    ...styleHelpers.lockWidth(120),
    backgroundColor: '#000',
    ...styleHelpers.centerBackgroundImage(),
    borderRadius: '100%',
    marginBottom: theme.spacing(1)
  },
  columnistTitle: {
    ...styleHelpers.textCenter(),
    ...styleHelpers.lockWidth(175)
  }
}));

Category.getInitialProps = async () => {
  const section = await actions.getArticles({
    category: 'Opinions',
    limit: 20
  });
  return { 
    section
  };
};

export default Category;