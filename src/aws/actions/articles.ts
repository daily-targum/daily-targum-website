import { client, previewClient } from '../client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import gql from 'graphql-tag';


type Media = {
  id: string
  title: string | null
  url: string
  description: string
  altText: string | null
  credits: string
}

type CompactMedia = Pick<Media, 'url' | 'altText' | 'description'>;

export type Author = {
  id: string
  displayName: string
  slug: string
  headshot?: string
}

export type Article<M = Media> = {
  abstract: string | null;
  authors: Author[];
  body: string;
  category?: string;
  id: string;
  media: (M | undefined)[];
  publishDate: number;
  slug: string;
  subcategory: string;
  tags: string[] | null;
  title: string;
  updatedAt: number;
}

/**
 * CompactArticle is used for pages that give an overview
 * of lots of articles and don't need the body of the article
 */
export type CompactArticle = Pick<Article<CompactMedia>, 'authors' | 'category' | 'id' | 'media' | 'publishDate' | 'slug' | 'subcategory' | 'tags' | 'title' | 'abstract'>;

export interface GetArticles {
  columnists: Author[]
  subcategories: string[]
  items: {
    name: string
    articles: CompactArticle[]
  }[]
  nextToken: string;
}

export async function getArticles({
  category,
  limit = 50,
  lastEvaluatedKey = '',
  lastPublishDate = 0
}: {
  category: string
  limit?: number
  lastEvaluatedKey?: string
  lastPublishDate?: number
}): Promise<GetArticles> {
  const res: any = await client.query({
    query: gql`
      query getArticles($category: String!, $limit: Int! ${lastEvaluatedKey ? ', $lastEvaluatedKey: String!, $lastPublishDate: Int!' : ''}) {
        getArticles(category: $category, limit: $limit ${lastEvaluatedKey ? ', lastEvaluatedKey: $lastEvaluatedKey, lastPublishDate: $lastPublishDate' : ''}){
          columnists {
            displayName
            headshot
            id
            slug
          }
          items {
            articles {
              authors {
                displayName
              }
              category
              abstract
              id
              media {
                altText
                description
                url
              }
              publishDate
              slug
              subcategory
              tags
              title
            }
            name
          }
          subcategories
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      category,
      limit,
      lastEvaluatedKey,
      lastPublishDate
    }
  });
  return res.data.getArticles;
}



export interface GetArtcileById {
  id: string;
  slug?: string;
}

export interface GetArtcileBySlug {
  slug: string;
  id?: string;
}

export type GetArticle = Article;


export async function getArticle({
  id,
  slug
}: GetArtcileById | GetArtcileBySlug): Promise<Article> {
  const res: any = await client.query({
    query: id ? (
      // Get article by id
      gql`
        query getArticle($id: ID!) {
          getArticle(id: $id) {
            abstract
            authors {
              id
              displayName
              slug
              headshot
            }
            body
            category
            id
            media {
              altText
              credits
              description
              url
            }
            publishDate
            slug
            subcategory
            tags
            title
            updatedAt
          }
        }
      `
    ) : (
      // Get artcile by slug
      gql`
        query getArticleBySlug($slug: String!) {
          getArticleBySlug(slug: $slug) {
            abstract
            authors {
              id
              displayName
              slug
              headshot
            }
            body
            category
            id
            media {
              altText
              credits
              description
              url
            }
            publishDate
            slug
            subcategory
            tags
            title
            updatedAt
          }
        }
      `
    ),
    fetchPolicy: 'no-cache',
    variables: {
      id,
      slug
    }
  });
  return id ? res.data.getArticle : res.data.getArticleBySlug;
}

export async function getArticlePreview({
  id
}: {
  id: string
}): Promise<GetArticle> {
  const res: any = await previewClient.getEntry(id);

  const { documentToHtmlString } = await import('@contentful/rich-text-html-renderer');

  const imgFields = res.fields.image?.fields;

  let img = '';
  if (imgFields && imgFields.file) {
    img = JSON.parse(imgFields.file).url;
  }

  return {
    id: res.sys.id,
    title: res.fields.title,
    authors: res.fields.authors?.map((a: any) => ({
      id: a.sys.id,
      displayName: a.fields.displayName,
      slug: '',
    })),
    media: [{
      id: res.fields.image?.sys.id ?? '',
      url: img ?? '',
      title: imgFields?.title,
      description: imgFields?.caption,
      altText: null,
      credits: imgFields?.credits
    }],
    publishDate: dayjs(res.sys.updatedAt, {utc: true}).valueOf() / 1000,
    updatedAt: dayjs(res.sys.updatedAt, {utc: true}).valueOf() / 1000,
    slug: res.fields.slug,
    body: documentToHtmlString(res.fields.body),
    category: '',
    abstract: '',
    tags: [],
    subcategory: ''
  }
}

export interface GetHomepage {
  high: CompactArticle[];
  insideBeat: CompactArticle[];
  opinions: CompactArticle[];
  sports: CompactArticle[];
  news: CompactArticle[];
}

// export type CompactArticle = Pick<Article, 'id' | 'slug' | 'tags' | 'title' | 'publishDate' | 'subcategory' | 'media' | 'authors' | 'category'>;

export async function getHomepage(): Promise<GetHomepage> {
  const res: any = await client.query({
    query: gql`
      query {
        getHomepage(device: 0){
          high {
            authors {
              displayName
            }
            category
            id
            media {
              altText
              description
              url
            }
            publishDate
            slug
            subcategory
            tags
            title
          }
          insideBeat {
            authors {
              displayName
            }
            category
            id
            media {
              altText
              description
              url
            }
            publishDate
            slug
            subcategory
            tags
            title
          }
          opinions {
            authors {
              displayName
            }
            category
            id
            media {
              altText
              description
              url
            }
            publishDate
            slug
            subcategory
            tags
            title
          }
          sports {
            authors {
              displayName
            }
            category
            id
            media {
              altText
              description
              url
            }
            publishDate
            slug
            subcategory
            tags
            title
          } 
          news {
            authors {
              displayName
            }
            category
            id
            media {
              altText
              description
              url
            }
            publishDate
            slug
            subcategory
            tags
            title
          } 
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {}
  });

  return res.data.getHomepage;
}


export type GetArticlesBySubcategory = CompactArticle[];

export async function getArticlesBySubcategory({
  subcategory,
  limit = 50,
  lastEvaluatedKey = '',
  lastPublishDate = 0
}: {
  subcategory: string
  limit?: number
  lastEvaluatedKey?: string
  lastPublishDate?: number
}): Promise<GetArticlesBySubcategory> {
  const res: any = await client.query({
    query: gql`
      query getArticles($subcategory: String!, $limit: Int! ${lastEvaluatedKey ? ', $lastEvaluatedKey: String!, $lastPublishDate: Int!' : ''}) {
        getArticlesBySubcategory(subcategory: $subcategory, limit: $limit ${lastEvaluatedKey ? ', lastEvaluatedKey: $lastEvaluatedKey, lastPublishDate: $lastPublishDate' : ''}){
          authors {
            displayName
          }
          category
          id
          media {
            altText
            description
            url
          }
          publishDate
          slug
          subcategory
          tags
          title
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      subcategory,
      limit,
      lastEvaluatedKey,
      lastPublishDate
    }
  });
  return res.data.getArticlesBySubcategory;
}