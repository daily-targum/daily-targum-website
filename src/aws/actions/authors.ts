import { client } from '../client';
import gql from 'graphql-tag';
import { CompactArticle } from './articles';

export interface GetAuthorPage {
  articles: CompactArticle[]
  author: {
    id: string
    displayName: string
    headshot?: string
    bio?: string
  }
}

export async function getAuthorBySlug({
  slug
}: {
  slug: string
}): Promise<GetAuthorPage | undefined> {
  let res: any;
  
  try {
    res = await client.query({
      query: gql`
        query getAuthorBySlug($slug: String!) {
          getAuthorBySlug(slug: $slug){
            articles {
              abstract
              id
              slug
              tags
              title
              publishDate
              subcategory
              category
              media {
                url
              }
            }
            author {
              id
              displayName
              headshot
              bio
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
      variables: {
        slug
      }
    });
  } catch(e) {
    return undefined;
  }

  return res.data.getAuthorBySlug;
}