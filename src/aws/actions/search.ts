import queryString from 'query-string';
import { Article } from './articles';
import * as secrets from '../../secrets';

interface Source extends Pick<Article, 'id' | 'title' | 'publishDate' | 'updatedAt' | 'slug' | 'authors' | 'body' | 'tags' | 'abstract' | 'category'> {
  media: string[];
}

type SearchHit = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: Source;
}

export type SearchHits = {
  total: {
    value: number;
    relation: string;
  }
  max_score: number;
  hits: SearchHit[];
}

export async function search({
  query
}: {
  query: string
}): Promise<SearchHits> {
  const urlQuery = queryString.stringify({ q: query });

  const res: any = await fetch(`${secrets.AWS_ELASTICSEARCH_URL}?${urlQuery}`, {
    method: 'GET'
  }).then(response => response.json());

  return res.hits;
}