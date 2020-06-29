import React from 'react';
import { NextPageContext } from 'next';
import { Section, Theme, HTML } from '../../components';
import { getPage, GetPage } from '../../shared/src/client';
import NotFound from '../404';
import { styles } from '../../utils';

function Page({
  page 
}: {
  page?: GetPage
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);
  return page?.content ? (
    <Section className={classes.section}>
      <HTML html={page.content}/>
    </Section>
  ) : (
    <NotFound/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  section: {
    ...styles.page(theme)
  }
}));

Page.getInitialProps = async (ctx: NextPageContext) => {
  const page = await getPage({slug: (
    typeof ctx.query.slug === 'object' ? ctx.query.slug[0] : (ctx.query.slug||'')
  )});
  return { 
    page
  };
};

export default Page;