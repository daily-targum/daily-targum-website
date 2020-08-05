import React from 'react';
import { actions } from '../../../shared/src/client';
import { Grid, Carousel, Theme, Text } from '../../../components';
import { styleHelpers, nextUtils, processNextQueryStringParam } from '../../../utils';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { IoMdClose } from 'react-icons/io';
import { NextPageContext } from 'next';
import { Gallery as GalleryType } from '../../../shared/src/client';
import NotFound from '../../404.page';

function Gallery({
  gallery
}: {
  gallery?: GalleryType
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const router = useRouter();
  const routeHistory = nextUtils.useRouteHistory();

  let query: any = {};
  if (typeof location !== 'undefined') {
    query = queryString.parse(location?.search);
  }
  const initialIndex = +processNextQueryStringParam(query.index, '0');
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

  if (gallery === undefined) {
    return <NotFound/>
  }

  return (
    <div className={classes.modal}>
      <Grid.Row
        className={classes.grid}
      >
        <Grid.Col
          xs={24}
          md={18}
        >
          <Carousel
            data={gallery.images}
            className={classes.carousel}
            keyExtractor={item => item.id}
            renderItem={item => (
              <div
                className={classes.image}
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
          <div className={classes.body}>
            <Text variant='h1'>{gallery.images[index].title}</Text>
            <Text variant='p'>{gallery.images[index].description}</Text>
          </div>
        </Grid.Col>

      </Grid.Row>

      <IoMdClose
        className={classes.closeIcon}
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

Gallery.getInitialProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;
  const imageGalleries = await actions.getImageGalleries();

  const gallery = imageGalleries.find(
    gallery => gallery.id === processNextQueryStringParam(id)
  );

  return { 
    gallery
  };
};

export default Gallery;