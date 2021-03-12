import * as React from 'react';
import { actions, GetHoru } from '../../shared/src/client';
import NotFound from '../404.page';
import { Carousel, Section, Grid, AspectRatioImage, LoadMoreButton, Banner, Modal, Text, SEOProps, HTML, Ad, ResetTabIndex, Semantic } from '../../components';
import { imgix } from '../../utils';
import { photoModalMachine, useMachine } from '../../machines';
import { GrStackOverflow } from 'react-icons/gr';
import { theme, next } from '../../constants';
import Styles from './humans-of-rutgers.styles';
const { classNames, StyleSheet } = Styles;

/** THIS IS A HACK! */
const MemoizedAspectRatioImage = React.memo(AspectRatioImage, () => true);

function Category({ 
  initHoru
}: { 
  initHoru: GetHoru
}) {
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
      <Section className={classNames.page}>
        <Section.OffsetPadding>
        <Semantic role='main' pritable skipNavContent>
          <Banner 
            text='Humans of RU'
            className={classNames.banner}
          />
        
          <Grid.Row spacing={theme.spacing(1)}>

            {horu.items.map((item, i) => (
              <React.Fragment key={item.id}>
                {(i % 24 === 0 && i !== 0) ? (
                  <Grid.Col xs={24}>
                    <Ad type='banner'/>
                  </Grid.Col>
                ) : null}
                <Grid.Col 
                  xs={24}
                  sm={12}
                  md={8}
                  xl={6}
                >
                  {state.context.itemId === item.id ? (
                    <ResetTabIndex
                      bool={state.value === 'grid'}
                    />
                  ) : null}
                  <button
                    role='article'
                    className={classNames.hideButton}
                    onClick={() => send({
                      type: 'OPEN_ITEM',
                      itemId: item.id,
                      initialIndex: 0
                    })}
                    aria-label={item.title.replace(/horu/i, 'Humans of Rutgers')}
                    data-tooltip-position='none'
                  >
                    <MemoizedAspectRatioImage
                      data={imgix(item.media[0], {
                        xs: imgix.presets.md('1:1')
                      })}
                      aspectRatio={1}
                      className={classNames.post}
                    />
                    {item.media.length > 1 ? (
                      <GrStackOverflow 
                        className={classNames.multiplePhotosIcon}
                        size={19}
                      />
                    ) : null}
                  </button>
                </Grid.Col>
              </React.Fragment>
            ))}

          </Grid.Row>
        </Semantic>

        {horu.nextToken ? (
          <LoadMoreButton
            handleLoad={loadMore}
            loading={isLoading}
          />
        ) : null}

        </Section.OffsetPadding>
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
            <div className={classNames.square}/>
            <Carousel.Responsive
              enableArrowKeys
              id={state.context.itemId + state.value}
              data={selectedPost?.media ?? []}
              className={classNames.carousel}
              keyExtractor={item => item}
              renderItem={item => (
                <AspectRatioImage
                  aspectRatio={1/1}
                  data={imgix(item, {
                    xs: imgix.presets.md('1:1'),
                    md: imgix.presets.lg('1:1')
                  })}
                />
              )}
            />
            
          </Grid.Col>


          <Grid.Col
            xs={24}
            md={10}
            style={{alignSelf: 'stretch'}}
          >
            <article className={classNames.body}>
              <Text variant='h1'>{selectedPost?.title}</Text>
              {selectedPost?.quote ? (
                <HTML
                  html={selectedPost.quote}
                />
              ) : null}
            </article>
          </Grid.Col>

        </Grid.Row>
      </Modal>

      {StyleSheet}
    </>
  );
}

export async function getStaticProps() {
  const initHoru = await actions.getHoru({
    limit: 50
  });

  const seo: SEOProps = {
    title: 'Humans of Rutgers'
  };

  const firstPost = initHoru?.items?.[0];
  if (firstPost) {
    seo.imageSrc = firstPost.media?.[0];
  }

  return {
    props: {
      initHoru: initHoru ?? null,
      seo
    },
    revalidate: next.staticPropsRevalidateSeconds
  }
};

export default Category;