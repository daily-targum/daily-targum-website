import { client, previewClient } from '../client';
import gql from 'graphql-tag';

export interface GetPage {
  id: string;
  title: string;
  published: string;
  slug: string;
  content: string;
}

export async function getPage({
  slug
}: {
  slug: string
}): Promise<GetPage | undefined> {
  let res: any;
  
  try {
    res = await client.query({
      query: gql`
        query getPageBySlug($slug: String!) {
          getPageBySlug(slug: $slug){
            id
            title
            published
            slug
            content
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
  
  return res?.data?.getPageBySlug;
}

export async function getPagePreview({
  id
}: {
  id: string
}): Promise<GetPage | undefined> {
  
  let res: any;
  
  try {
    res = await previewClient.getEntry(id);
  } catch(err) {
    return undefined;
  }

  const { documentToHtmlString } = await import('@contentful/rich-text-html-renderer');

  const { fields, sys } = res;

  return {
    id: sys.id,
    title: fields.title,
    published: sys.publishedAt,
    slug: fields.slug,
    content: documentToHtmlString(fields.body),
  };

}
