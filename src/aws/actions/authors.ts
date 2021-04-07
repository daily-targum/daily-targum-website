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
  slug,
  lastEvaluatedKey = '',
  lastPublishDate = 0
}: {
  slug: string,
  lastEvaluatedKey?: string
  lastPublishDate?: number
}): Promise<GetAuthorPage | undefined> {
  let res: any;
  
  try {
    res = await client.query({
      query: gql`
        query getAuthorBySlug($slug: String! ${lastEvaluatedKey ? ', $lastEvaluatedKey: String!, $lastPublishDate: Int!' : ''}) {
          getAuthorBySlug(slug: $slug ${lastEvaluatedKey ? ', lastEvaluatedKey: $lastEvaluatedKey, lastPublishDate: $lastPublishDate' : ''}){
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
        slug,
        lastEvaluatedKey,
        lastPublishDate
      }
    });
  } catch(e) {
    return undefined;
  }

  return res.data.getAuthorBySlug;
}