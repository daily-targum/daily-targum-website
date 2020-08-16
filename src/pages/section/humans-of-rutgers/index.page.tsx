import React from 'react';
import { actions, GetHoru } from '../../../shared/src/client';
import NotFound from '../../404.page';
import { Section, Theme, Grid, AspectRatioImage, ActivityIndicator, Banner } from '../../../components';
import { styleHelpers, imgix } from '../../../utils';

function Category({ 
  initHoru
}: { 
  initHoru: GetHoru
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const theme = Theme.useTheme();

  const [horu, setHoru] = React.useState(initHoru);
  const [isLoading, setIsLoading] = React.useState(false);

  async function loadMore() {
    if(!horu.nextToken || isLoading) return;
    setIsLoading(true);

    const { actions: clientActions } = await import('../../../shared/src/client');

    const res = await clientActions.getHoru({
      limit: 20,
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
    <Section style={styles.page}>
      <Banner text='Humans of RU'/>
      
      <Grid.Row spacing={theme.spacing(2)}>

        {horu.items.map(item => (
          <Grid.Col 
            key={item.id}
            md={6}
            xs={24}
          >
            <AspectRatioImage
              data={imgix(item.photo, {
                xs: imgix.presets.md('1:1')
              })}
              aspectRatio={1}
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
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    ...styleHelpers.page(theme, 'compact'),
    backgroundColor: theme.colors.background,
    flex: 1
  }
}));

export async function getStaticProps() {
  const initHoru = await actions.getHoru({
    limit: 20
  });

  return {
    props: {
      initHoru
    },
    revalidate: 60 // seconds
  }
};

export default Category;