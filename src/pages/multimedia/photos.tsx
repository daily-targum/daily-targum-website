import React from 'react';
import { CardCols, Card, Grid, Section, Theme, FlatList } from '../../components';
import { chopArray } from '../../shared/src/utils';
import { actions, GetImageGalleries, GalleryImage } from '../../shared/src/client';
import { styleHelpers } from '../../utils';

function Gallery({
  title,
  id,
  items
}: {
  title: string
  id: string
  items: GalleryImage[]
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const theme = Theme.useTheme();
  return (
    <div className={classes.section}>
      <CardCols.Header
        title={title}
        href='/multimedia/photos/[gallery]'
        as={`/multimedia/photos/${id}`}
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
                key={item[0]?.id}
                image={item[0]?.url}
                href=''
                title={item[0]?.title}
              />
            ) : (
              <>
                <Card.Image
                  key={item[0]?.id}
                  image={item[0]?.url}
                  href=''
                  title={item[0]?.title}
                  aspectRatio={3 / 2}
                />
                <Card.Spacer/>
                <Card.Image
                  key={item[1]?.id}
                  image={item[1]?.url}
                  href=''
                  title={item[1]?.title}
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
  imageGalleries
}: {
  imageGalleries: GetImageGalleries
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return (
    <Section className={classes.page}>
      <FlatList
        data={imageGalleries}
        keyExtractor={index => index.id}
        renderItem={images => (
          <Gallery
            id={images.id}
            title={images.title}
            items={images.images}
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
    ...styleHelpers.lockWidth('100%'),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8)
  },
}));

Photos.getInitialProps = async () => {
  const imageGalleries = await actions.getImageGalleries();
  return { 
    imageGalleries
  };
};
  
export default Photos;