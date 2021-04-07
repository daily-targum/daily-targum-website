import { client } from '../client';
import gql from 'graphql-tag';

export interface Podcast {
  id: string
  title: string
  show: string
  description: string
  audioFile: string
  coverArt: string
  pubDate: string
  published: boolean
}

export interface GetPodcast {
  items: Podcast[]
}

export async function getPodcast({
  show,
  // nextToken = '',
  limit = 20
}: {
  show: string,
  // nextToken?: string,
  limit?: number
}): Promise<GetPodcast> {
  const res: any = await client.query({
    query: gql`
      query getPodcasts($show: String!, $limit: Int!)  {
        getPodcasts(show: $show, limit: $limit) {
          items {
            id
            title
            description
            audioFile
            coverArt
            pubDate
            published
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      show,
      limit
    }
  });
  return {
    ...res.data.getPodcasts,
    items: res.data.getPodcasts.items.map((episode: any) => ({
      ...episode,
      show
    }))
  };
}