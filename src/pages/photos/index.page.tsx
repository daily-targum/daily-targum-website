import React from 'react';
import { CardCols, Card, Grid, Section, Theme, FlatList, ActivityIndicator } from '../../components';
import { chopArray } from '../../shared/src/utils';
import { actions, GetImageGalleries, GalleryImage } from '../../shared/src/client';
import { styleHelpers, imgix } from '../../utils';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

function Gallery({
  title,
  id,
  items
}: {
  title: string
  id: string
  items: GalleryImage[]
}) {
  const router = useRouter();
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  return (
    <div style={styles.section}>
      <CardCols.Header
        title={title}
        href='/multimedia/photos/[id]'
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
                imageData={imgix(item[0]?.url, {
                  xs: imgix.presets.fourByThree.md,
                  md: imgix.presets.fourByThree.lg
                })}
                href=''
                title={item[0]?.title}
              />
            ) : (
              <>
                <Card.Image
                  key={item[0]?.id}
                  imageData={imgix(item[0]?.url, {
                    xs: imgix.presets.fourByThree.md
                  })}
                  href=''
                  title={item[0]?.title}
                  aspectRatio={3 / 2}
                />
                <Card.Spacer/>
                <Card.Image
                  key={item[1]?.id}
                  imageData={imgix(item[1]?.url, {
                    xs: imgix.presets.fourByThree.md
                  })}
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
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <Section style={styles.page}>
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

export const getStaticProps: GetStaticProps = async () => {
  const imageGalleries = await actions.getImageGalleries();

  return {
    props: { 
      imageGalleries
    }
  };
};
  
export default Photos;