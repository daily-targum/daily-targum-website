// import React from 'react';
import { NextPageContext } from 'next';
// import { Section } from '../../components';
import { getPage, GetPage } from '../../shared/src/client';
// import sanitizeHtml from 'sanitize-html';
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

function Page({
  page 
}: {
  page: GetPage
}) {
  console.log(page);
  return null;
  // return (
  //   <Section>
  //     <div 
  //       dangerouslySetInnerHTML={{
  //         __html: sanitizeHtml(documentToHtmlString(page.content))
  //       }}
  //     />
  //   </Section>
  // );
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const page = await getPage({slug: (
    typeof ctx.query.slug === 'object' ? ctx.query.slug[0] : (ctx.query.slug||'')
  )});
  return { 
    page
  };
};

export default Page;