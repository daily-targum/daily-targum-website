import { client } from '../client';
import gql from 'graphql-tag';

type Media = {
  id: string
  title: string
  url: string
}

export type HoruItem = {
  id: string
  title: string
  slug: string
  media: Media[]
  altText: string
  quote: string
  createdAt: number
  updatedAt: number
}

export interface GetHoru {
  items: HoruItem[]
  nextToken: string;
}

export async function getHoru({
  nextToken = '',
  limit = 20
}: {
  nextToken?: string,
  limit?: number
}): Promise<GetHoru> {
  const res: any = await client.query({
    query: gql`
      query getHORUs($nextToken: String!, $limit: Int!) {
        getHORUs(device: 1, limit: $limit, nextToken: $nextToken){
          items {
            id
            title
            slug
            media {
              id
              title
              url
            }
            quote
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      nextToken,
      limit
    }
  });
  return res.data.getHORUs;
}