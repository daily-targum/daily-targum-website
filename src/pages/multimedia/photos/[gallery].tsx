import React from 'react';
import { actions, GetArticles } from '../../../shared/src/client';
import { Grid, Carousel, Theme } from '../../../components';
import { styleHelpers } from '../../../utils';

function Gallery({
  section
}: {
  section: GetArticles
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const [imgIndex, setImgIndex] = React.useState(0);

  console.log(imgIndex);

  return (
    <div className={classes.modal}>
      <Grid.Row
        style={{height: '100%'}}
      >
        <Grid.Col
          xs={18}
        >
          <Carousel
            data={section.items}
            className={classes.fill}
            keyExtractor={item => item.id}
            renderItem={item => (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundImage: `url(${item.media[0]})`,
                  ...styleHelpers.centerBackgroundImage()
                }}
              />
            )}
          />
           
        </Grid.Col>

      </Grid.Row>
    </div>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  modal: {
    ...styleHelpers.absoluteFill(),
    backgroundColor: theme.colors.surface,
    zIndex: 3000
  },
  fill: {
    height: '100%',
    width: '100%'
  }
}));

Gallery.getInitialProps = async () => {
  const section = await actions.getArticles({
    category: 'News',
    limit: 20
  });
  return { 
    section
  };
};

export default Gallery;