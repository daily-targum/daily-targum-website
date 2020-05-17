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
  return (
    <>
      <h1>{article.title}</h1>
      <p>By {article.author}</p>
      <p>{formatDate(article.date)}</p>
      <hr/>
      <div 
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(article.content)
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
  };
  return { 
    article,
    seo
  };
};

export default Article;