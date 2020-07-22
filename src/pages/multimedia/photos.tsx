import React from 'react';
import { CardCols, Card, Grid, Section, Theme, FlatList } from '../../components';
import { chopArray } from '../../shared/src/utils';
import { actions, GetArticles, Article } from '../../shared/src/client';
import { styleHelpers } from '../../utils';

function Gallery({
  title,
  items
}: {
  title: string
  items: Article[]
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const theme = Theme.useTheme();
  return (
    <div className={classes.section}>
      <CardCols.Header
        title={title}
        href='/'
      />

      <Grid.Row 
        spacing={theme.spacing(2)}
        cols={['2fr', '1fr', '1fr']}
      >
        <CardCols
          items={chopArray(items, [1, 2, 2])}
        >
          {(item, i) => {
            if (!item) {
              return null;
            }

            return i === 0 ? (
              <Card.Image
                key={item[0].id}
                image={item[0].media[0]}
                href=''
                title={item[0].title}
              />
            ) : (
              <>
                <Card.Image
                  key={item[0].id}
                  image={item[0].media[0]}
                  href=''
                  title={item[0].title}
                  aspectRatio={3 / 2}
                />
                <Card.Spacer/>
                <Card.Image
                  key={item[1].id}
                  image={item[1].media[0]}
                  href=''
                  title={item[1].title}
                  aspectRatio={3 / 2}
                />
              </>
            );
          }}
        </CardCols>
      </Grid.Row>

    </div>
  )
}

function Photos({
  initSection
}: {
  initSection: GetArticles
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Section className={classes.page}>
      <FlatList
        data={[0, 1]}
        keyExtractor={index => index}
        renderItem={() => (
          <Gallery
            title='Untitled'
            items={initSection.items}
          />
        )}
      />
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact')
  },
  section: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8)
  },
}));

Photos.getInitialProps = async () => {
  const section = await actions.getArticles({
    category: 'News',
    limit: 20
  });
  return { 
    initSection: section
  };
};
  
export default Photos;