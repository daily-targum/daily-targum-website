import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import NotFound from '../404';
import { Section, Theme, Grid, ActivityIndicator, Card } from '../../components';
import { styleHelpers } from '../../utils';

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
        <span className={classes.logo}>Inside <span className={classes.logoAccent}>Beat</span></span>
      </div>
      
      <Grid.Row spacing={spacing(2)}>
        <Grid.Col xs={24} md={12}>
          <Card.StackedResponsive
            tag='Category'
            image={section.items[0].media[0]}
            title={section.items[0].title}
            href='/article/[year]/[month]/[slug]'
            as={'/'+section.items[0].slug}
            aspectRatioStacked={2 / 1}
          />
        </Grid.Col>

        <Grid.Col xs={24} md={12}>
          <Card.StackedResponsive
            tag='Category'
            image={section.items[1].media[0]}
            title={section.items[1].title}
            href='/article/[year]/[month]/[slug]'
            as={'/'+section.items[1].slug}
            aspectRatioStacked={2 /1}
          />
        </Grid.Col>

        {section.items.slice(2).map(item => (
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
  },
  grow: {
    display: 'flex',
    flex: 1,
  },
  logoWrap: {
    ...styleHelpers.card(theme),
    backgroundColor: theme.colors.primary,
    padding: theme.spacing(2),
    margin: theme.spacing(0, 0, 2),
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
    color: theme.colors.accent,
    display: 'inline'
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
    ...styleHelpers.hideLink(),
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  cardSmallImage: {
    height: 170,
    ...styleHelpers.lockWidth(170),
    ...styleHelpers.centerBackgroundImage(),
  },
  // medium cards
  cardMedium: {
    ...styleHelpers.hideLink(),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  cardMediumImage: {
    height: 250,
    ...styleHelpers.aspectRatioFullWidth(4 / 1),
    ...styleHelpers.centerBackgroundImage(),
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