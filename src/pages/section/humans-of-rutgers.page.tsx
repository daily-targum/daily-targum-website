import React from 'react';
import { actions, GetHoru } from '../../shared/src/client';
import NotFound from '../404.page';
import { Carousel, Section, Theme, Grid, AspectRatioImage, ActivityIndicator, Banner, Modal, Text, SEOProps, HTML } from '../../components';
import { styleHelpers, imgix } from '../../utils';
import { photoModalMachine, useMachine } from '../../machines';

/** THIS IS A HACK! */
const MemoizedAspectRatioImage = React.memo(AspectRatioImage, () => true);

function Category({ 
  initHoru
}: { 
  initHoru: GetHoru
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();
  const theme = Theme.useTheme();

  const [state, send] = useMachine(photoModalMachine);

  const [horu, setHoru] = React.useState(initHoru);
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedPost = horu.items.find(item => item.id === state.context.itemId);

  async function loadMore() {
    if(!horu.nextToken || isLoading) return;
    setIsLoading(true);

    const { actions: clientActions } = await import('../../shared/src/client');

    const res = await clientActions.getHoru({
      limit: 50,
      nextToken: horu.nextToken
    });
    setHoru({
      ...res,
      items: horu.items.concat(res.items)
    });

    setIsLoading(false);
  }

  if(!horu) return <NotFound/>;

  return (
    <>
      <Section style={styles.page}>
        <Banner text='Humans of RU'/>
        
        <Grid.Row spacing={theme.spacing(2)}>

          {horu.items.map(item => (
            <Grid.Col 
              key={item.id}
              xs={24}
              sm={12}
              md={8}
              xl={6}
            >
              <MemoizedAspectRatioImage
                data={imgix(item.media[0].url, {
                  xs: imgix.presets.md('1:1')
                })}
                aspectRatio={1}
                onClick={() => send({
                  type: 'OPEN_ITEM',
                  itemId: item.id,
                  initialIndex: 0
                })}
                style={styles.post}
              />
            </Grid.Col>
          ))}

        </Grid.Row>

        {horu.nextToken ? (
          <ActivityIndicator.ProgressiveLoader 
            onVisible={loadMore}
          />
        ) : null}

      </Section>

      <Modal
        open={state.value === 'modal'}
        handleClose={() => send({
          type: 'CLOSE_ITEM'
        })}
        overflow='auto'
      >
        <Grid.Row>
          <Grid.Col
            xs={24}
            md={14}
          >
            <div style={styles.square}/>
            <Carousel.Responsive
              id={state.context.itemId}
              data={selectedPost?.media ?? []}
              style={styles.carousel}
              keyExtractor={item => item.id}
              renderItem={item => (
                <AspectRatioImage
                  aspectRatio={1/1}
                  data={imgix(item.url, {
                    xs: imgix.presets.md('1:1'),
                    md: imgix.presets.lg('1:1', ['pjpg', 'jpg']),
                    xl: imgix.presets.xl('1:1', ['pjpg', 'jpg'])
                  })}
                />
              )}
            />
            
          </Grid.Col>


          <Grid.Col
            xs={24}
            md={10}
          >
            <div className={cng(styles.body)}>
              <Text variant='h1'>{selectedPost?.title}</Text>
              {selectedPost?.quote ? (
                <HTML
                  html={selectedPost.quote}
                />
              ) : null}
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
  post: {
    cursor: 'pointer'
  },
  // modal
  square: {
    ...styleHelpers.aspectRatioFullWidth(1)
  },
  carousel: {
    ...styleHelpers.absoluteFill()
  },
  body: {
    padding: theme.spacing(4),
    [theme.mediaQuery('md')]: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      overflow: 'auto'
    }
  }
}));

export async function getStaticProps() {
  const initHoru = await actions.getHoru({
    limit: 50
  });

  const seo: SEOProps = {
    title: 'Humans of Rutgers'
  };

  const firstPost = initHoru?.items?.[0];
  if (firstPost) {
    seo.imageSrc = firstPost.media?.[0].url;
  }

  return {
    props: {
      initHoru: initHoru ?? null,
      seo
    },
    revalidate: 60 // seconds
  }
};

export default Category;