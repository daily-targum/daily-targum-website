import React from 'react';
import { NextPageContext } from 'next';

function Page({
  slug 
}: {
  slug: string
}) {
  return (
    <h1>{slug}</h1>
  );
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  // TODO: fetch page from AWS
  return { 
    slug: ctx.query.slug
  };
};

export default Page;