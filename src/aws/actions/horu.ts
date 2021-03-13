import { client } from '../client';
import gql from 'graphql-tag';

export type HoruItem = {
  id: string
  media: string[]
  quote: string
  title: string
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
      query listHORUS($nextToken: String!, $limit: Int!) {
        listHORUS(limit: $limit, nextToken: $nextToken){
          items {
            id
            media
            quote
            title
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
  return res.data.listHORUS;
}