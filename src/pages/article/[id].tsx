import React from 'react';
import { NextPageContext } from 'next';
import { actions, GetArticle } from '../../shared/src/client';
import { formatDate } from '../../shared/src/utils';
import sanitizeHtml from 'sanitize-html';
import { SEOProps } from '../../components';

function Article({
  article 
}: {
  article: GetArticle
}) {
  const wasUpdated = article.updatedAt > article.publishDate;
  return (
    <>
      <h1>{article.title}</h1>
      <p>By {article.authors.join(', ')}</p>
      <p>{wasUpdated ? ('Updated '+formatDate(article.updatedAt)) : formatDate(article.publishDate)}</p>
      <hr/>
      <div 
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(article.body)
        }}
      />
    </>
  );
}

Article.getInitialProps = async (ctx: NextPageContext) => {
  const article = await actions.getArticle({
    id: ctx.query.id as string
  });
  const seo: SEOProps = {
    pathname: `/article/${ctx.query.id}`,
    title: article.title,
    type: 'article',
    description: article.abstract ? article.abstract : undefined
  };
  return { 
    article,
    seo
  };
};

export default Article;