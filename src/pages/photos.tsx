import * as React from 'react';
import { CardCols, Card, Grid, Section, FlatList, ActivityIndicator, Modal, Carousel, Text, Image, SEOProps } from '../components';
import { chopArray, choppedArrayRunningCount } from '../shared/src/utils';
import { actions, GetImageGalleries, GalleryImage } from '../shared/src/client';
import { imgix } from '../utils';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { photoModalMachine, useMachine } from '../machines';
import styles from './photos.module.scss';
import { theme } from '../constants';

const GALLERY_COLS_SHAPE = [1, 2, 2];

function Gallery({
  title,
  items,
  handleOpen
}: {
  title: string
  items: GalleryImage[]
  handleOpen: (i: number) => any
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  return (
    <div className={styles.section}>
      <CardCols.Header
        title={title}
        // onClick={() => handleOpen(0)}
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
                title={item[0]?.title}
                onClick={() => handleOpen(
                  choppedArrayRunningCount(i, GALLERY_COLS_SHAPE)
                )}
              />
            ) : (
              <>
                <Card.Image
                  key={item[0]?.id}
                  imageData={imgix(item[0]?.url, {
                    xs: imgix.presets.md('3:2')
                  })}
                  title={item[0]?.title}
                  aspectRatio={3 / 2}
                  onClick={() => handleOpen(
                    choppedArrayRunningCount(i, GALLERY_COLS_SHAPE)
                  )}
                />
                <Card.Spacer/>
                <Card.Image
                  key={item[1]?.id}
                  imageData={imgix(item[1]?.url, {
                    xs: imgix.presets.md('3:2')
                  })}
                  title={item[1]?.title}
                  aspectRatio={3 / 2}
                  onClick={() => handleOpen(
                    choppedArrayRunningCount(i, GALLERY_COLS_SHAPE) + 1
                  )}
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
  const [state, send] = useMachine(photoModalMachine);

  const selectedGallery = imageGalleries.find(gallery => gallery.id === state.context.itemId);

  return (
    <>
      <Section className={styles.page}>
        <FlatList
          data={imageGalleries}
          keyExtractor={index => index.id}
          renderItem={images => (
            <Gallery
              title={images.title}
              items={images.media}
              handleOpen={i => send({
                type: 'OPEN_ITEM',
                itemId: images.id,
                initialIndex: i
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
            <div className={styles.square}/>
            <Carousel
              key={state.context.itemId}
              data={selectedGallery?.media ?? []}
              className={styles.carousel}
              keyExtractor={item => item.id}
              renderItem={item => (
                <Image
                  aspectRatio={1}
                  data={imgix(item.url, {
                    xs: imgix.presets.md('1:1')
                  })}
                  className={styles.image}
                />
              )}
              initialIndex={state.context.initialIndex}
            />
            
          </Grid.Col>

          <Grid.Col
            xs={24}
            md={8}
          >
            <div className={styles.body}>
              <Text variant='h2'>{selectedGallery?.title ?? ''}</Text>
              <Text variant='p'>{selectedGallery?.title ?? ''}</Text>
            </div>
          </Grid.Col>

        </Grid.Row>
      </Modal>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const imageGalleries = await actions.getImageGalleries();

  const seo: SEOProps = {
    title: 'Photos'
  }

  return {
    props: { 
      imageGalleries,
      seo
    }
  };
};
  
export default Photos;
