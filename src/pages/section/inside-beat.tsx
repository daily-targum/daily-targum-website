import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import NotFound from '../404';
import { Section, Theme, Text, Grid, ActivityIndicator, Card } from '../../components';
import { styles } from '../../utils';

function Category({ 
  initSection
}: { 
  initSection: GetArticles
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  const { spacing } = Theme.useTheme();

  const [section, setSection] = React.useState(initSection);
  const [isLoading, setIsLoading] = React.useState(false);

  async function loadMore() {
    if(!section.nextToken || isLoading) return;
    setIsLoading(true);
    const res = await actions.getArticles({
      category: 'inside-beat',
      limit: 20,
      nextToken: section.nextToken
    });
    setSection({
      ...res,
      items: section.items.concat(res.items)
    });
    setIsLoading(false);
  }

  if(!section) return <NotFound/>;
  return (
    <Section className={classes.page}>
      <div className={classes.logoWrap}>
        <Text className={classes.logo}>Inside <Text className={classes.logoAccent}>Beat</Text></Text>
      </div>
      <Grid.Row spacing={spacing(2)}>
        <Grid.Col xs={24}>
          <Card.StackedResponsive
            tag='Category'
            image={section.items[0].media[0]}
            title={section.items[0].title}
            href='/article/[year]/[month]/[slug]'
            as={'/'+section.items[0].slug}
            aspectRatioStacked={[7,2]}
          />
        </Grid.Col>

        <Grid.Col xs={24} md={12}>
          <Card.StackedResponsive
            tag='Category'
            image={section.items[1].media[0]}
            title={section.items[1].title}
            href='/article/[year]/[month]/[slug]'
            as={'/'+section.items[1].slug}
            aspectRatioStacked={[2,1]}
          />
        </Grid.Col>

        <Grid.Col xs={24} md={12}>
          <Card.StackedResponsive
            tag='Category'
            image={section.items[2].media[0]}
            title={section.items[2].title}
            href='/article/[year]/[month]/[slug]'
            as={'/'+section.items[2].slug}
            aspectRatioStacked={[2,1]}
          />
        </Grid.Col>

        {section.items.slice(3).map(item => (
          <Grid.Col 
            key={item.id}
            xs={24}
            md={12}
            lg={8}
          >
            <Card.Compact
              tag='Category'
              image={item.media[0]}
              title={item.title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+item.slug}
            />
          </Grid.Col>
        ))}
      </Grid.Row>
      {section.nextToken ? (
        <ActivityIndicator.ProgressiveLoader onVisible={loadMore}/>
      ) : null}
    </Section>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  page: {
    backgroundColor: theme.colors.background,
  },
  grow: {
    display: 'flex',
    flex: 1,
  },
  logoWrap: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    textTransform: 'uppercase',
    fontWeight: 900,
    fontSize: 'calc(38px + 2vw)',
    textAlign: 'center',
    color: '#fff'
  },
  logoAccent: {
    color: theme.colors.accent
  },
  tag: {
    color: '#fff',
    backgroundColor: theme.colors.accent,
    padding: theme.spacing(0.5, 1),
    marginBottom: theme.spacing(1),
  },
  // all cards
  cardBody: {
    padding: theme.spacing(2),
    backgroundColor: theme.colors.surface,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  // cmall cards
  cardSmall: {
    ...styles.hideLink(),
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  cardSmallImage: {
    height: 170,
    ...styles.lockWidth(170),
    ...styles.centerBackgroundImage(),
  },
  // medium cards
  cardMedium: {
    ...styles.hideLink(),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  cardMediumImage: {
    height: 250,
    ...styles.aspectRatioFullWidth(4, 1),
    ...styles.centerBackgroundImage(),
  }
}));

Category.getInitialProps = async () => {
  const section = await actions.getArticles({
    category: 'inside-beat',
    limit: 20
  });
  return { 
    initSection: section
  };
};

export default Category;