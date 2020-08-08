import React from 'react';
import { actions, GetHoru } from '../../../shared/src/client';
import NotFound from '../../404.page';
import { Section, Theme, Grid, AspectRatioImage, ActivityIndicator, Banner } from '../../../components';
import { styleHelpers } from '../../../utils';

function Category({ 
  initHoru
}: { 
  initHoru: GetHoru
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const theme = Theme.useTheme();

  const [horu, setHoru] = React.useState(initHoru);
  const [isLoading, setIsLoading] = React.useState(false);

  async function loadMore() {
    if(!horu.nextToken || isLoading) return;
    setIsLoading(true);

    const res = await actions.getHoru({
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
    <Section className={classes.page}>
      <Banner text='Humans of RU'/>
      
      <Grid.Row spacing={theme.spacing(2)}>

        {horu.items.map(item => (
          <Grid.Col 
            key={item.id}
            md={6}
            xs={24}
          >
            <AspectRatioImage
              src={item.photo}
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
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    revalidate: 1
  }
};

export default Category;