import React from 'react';
import { CardCols, Card, Grid, Section, Theme, FlatList, ActivityIndicator, Modal, Carousel, Text } from '../components';
import { chopArray } from '../shared/src/utils';
import { actions, GetImageGalleries, GalleryImage } from '../shared/src/client';
import { styleHelpers, imgix } from '../utils';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { photoModalMachine, useMachine } from '../machines';

function Gallery({
  title,
  items,
  handleOpen
}: {
  title: string
  items: GalleryImage[]
  handleOpen: () => any
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
        onClick={handleOpen}
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
                  xs: imgix.presets.md('3:2'),
                  md: imgix.presets.lg('3:2')
                })}
                href=''
                title={item[0]?.title}
              />
            ) : (
              <>
                <Card.Image
                  key={item[0]?.id}
                  imageData={imgix(item[0]?.url, {
                    xs: imgix.presets.md('3:2')
                  })}
                  href=''
                  title={item[0]?.title}
                  aspectRatio={3 / 2}
                />
                <Card.Spacer/>
                <Card.Image
                  key={item[1]?.id}
                  imageData={imgix(item[1]?.url, {
                    xs: imgix.presets.md('3:2')
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
  const [state, send] = useMachine(photoModalMachine);

  const selectedGallery = imageGalleries.find(gallery => gallery.id === state.context.itemId);

  return (
    <>
      <Section style={styles.page}>
        <FlatList
          data={imageGalleries}
          keyExtractor={index => index.id}
          renderItem={images => (
            <Gallery
              title={images.title}
              items={images.images}
              handleOpen={() => send({
                type: 'OPEN_ITEM',
                itemId: images.id 
              })}
            />
          )}
        />
      </Section>

      <Modal
        open={state.value === 'modal'}
        handleClose={() => send({
          type: 'CLOSE_ITEM'
        })}
      >
        <Grid.Row>
          <Grid.Col
            xs={24}
            md={16}
          >
            <div style={styles.square}/>
            <Carousel
              id={state.context.itemId}
              data={selectedGallery?.images ?? []}
              style={styles.carousel}
              keyExtractor={item => item.id}
              renderItem={item => (
                <div
                  style={{
                    ...styles.image,
                    backgroundImage: `url(${item.url})`
                  }}
                />
              )}
            />
            
          </Grid.Col>

          <Grid.Col
            xs={24}
            md={8}
          >
            <div style={styles.body}>
              <Text variant='h1'>{selectedGallery?.title ?? ''}</Text>
              <Text variant='p'>{selectedGallery?.title ?? ''}</Text>
            </div>
          </Grid.Col>

        </Grid.Row>
      </Modal>
    </>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    flex: 1
  },
  section: {
    ...styleHelpers.lockWidth('100%'),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8)
  },
  // modal
  square: {
    ...styleHelpers.aspectRatioFullWidth(1)
  },
  carousel: {
    ...styleHelpers.absoluteFill()
  },
  body: {
    padding: theme.spacing(3)
  },
  image: {
    width: '100%',
    height: '100%',
    ...styleHelpers.centerBackgroundImage()
  }
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
