import React from 'react';
import { actions, Gallery as GalleryType } from '../../../shared/src/client';
import { numbers } from '../../../shared/src/utils';
import { Grid, Carousel, Theme, Text, ActivityIndicator } from '../../../components';
import { styleHelpers, nextUtils, processNextQueryStringParam } from '../../../utils';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { IoMdClose } from 'react-icons/io';
import { GetStaticProps, GetStaticPaths } from 'next';
import NotFound from '../../404.page';

function Gallery({
  gallery
}: {
  gallery?: GalleryType
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const cng = Theme.useClassNameGenerator();
  const router = useRouter();
  const routeHistory = nextUtils.useRouteHistory();

  let query: any = {};
  if (typeof location !== 'undefined') {
    query = queryString.parse(location?.search);
  }

  const initialIndex = numbers.clamp(
    0, 
    +processNextQueryStringParam(query.index, '0'), 
    gallery?.images.length ?? 0
  );
  const [index, setIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    const query = queryString.stringify({ index });
    router.replace(router.route, `${location.pathname}?${query}`);
  }, [index]);

  // treat back button as if page is a modal
  function goBack() {
    if (routeHistory.slice(-2, -1)[0] === '/multimedia/photos') {
      router.back();
    } else {
      router.replace('/multimedia/photos');
    }
  }

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (gallery === undefined) {
    return <NotFound/>
  }

  return (
    <div style={styles.modal}>
      <Grid.Row
        style={styles.grid}
      >
        <Grid.Col
          xs={24}
          md={18}
        >
          <Carousel
            data={gallery.images}
            style={styles.carousel}
            keyExtractor={item => item.id}
            renderItem={item => (
              <div
                className={cng(styles.image)}
                style={{
                  backgroundImage: `url(${item.url})`
                }}
              />
            )}
            initialIndex={initialIndex}
            onChange={index => setIndex(index)}
          />
           
        </Grid.Col>

        <Grid.Col
          xs={24}
          md={6}
        >
          <div style={styles.body}>
            <Text variant='h1'>{gallery.images[index].title}</Text>
            <Text variant='p'>{gallery.images[index].description}</Text>
          </div>
        </Grid.Col>

      </Grid.Row>

      <IoMdClose
        style={styles.closeIcon}
        size={32}
        onClick={goBack}
      />
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  modal: {
    ...styleHelpers.absoluteFill(),
    backgroundColor: theme.colors.surface,
    zIndex: 3000
  },
  carousel: {
    width: '100%'
  },
  body: {
    padding: theme.spacing(3)
  },
  image: {
    width: '100%',
    height: '100vw',
    ...styleHelpers.centerBackgroundImage(),
    [theme.mediaQuery('md')]: {
      height: '100%'
    }
  },
  grid: {
    [theme.mediaQuery('md')]: {
      height: '100%'
    }
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    cursor: 'pointer',
    zIndex: 1000,
    padding: theme.spacing(1),
    borderRadius: '100%',
    backgroundColor: theme.colors.background
  }
}));

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = processNextQueryStringParam(ctx.params?.id, '');

  const gallery = await actions.getImageGallery({ 
    id
  });

  return {
    props: { 
      gallery
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () =>  {
  return {
    paths: [],
    fallback: true
  };
}

export default Gallery;