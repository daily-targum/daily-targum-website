import React from 'react';
import { NextPageContext } from 'next';
import { actions, GetArticle } from '../../../../shared/src/client';
import { formatDate } from '../../../../shared/src/utils';
import sanitizeHtml from 'sanitize-html';
import { SEOProps, Section, Theme } from '../../../../components';
import NotFound from '../../../404';

function Article({
  article 
}: {
  article: GetArticle
}) {
  const classes = Theme.useStyleCreatorClassNames(styleCreator);

  if(!article) return <NotFound/>;
  const wasUpdated = article.updatedAt > article.publishDate;
  return (
    <Section>
      <h1>{article.title}</h1>
      <img 
        src={article.media[0]}
        className={classes.image}
      />
      <p>By {article.authors.join(', ')}</p>
      <p>{wasUpdated ? ('Updated '+formatDate(article.updatedAt)) : formatDate(article.publishDate)}</p>
      <hr/>
      <div 
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(article.body)
        }}
      />
    </Section>
  );
}

Article.getInitialProps = async (ctx: NextPageContext) => {
  const article = await actions.getArticle({
    slug: ctx.asPath?.replace(/(^\/|\/$)/g, '') as string
  });
  const seo: SEOProps = {
    pathname: `/${ctx.query.slug}`,
    title: article?.title,
    type: 'article',
    description: article?.abstract ? article?.abstract : undefined
  };
  return { 
    article,
    seo
  };
};

const styleCreator = Theme.makeStyleCreator(() => ({
  image: {
    width: '100%',
    height: 'auto'
  }
}));

export default Article;