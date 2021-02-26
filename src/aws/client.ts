// ENVIRONMENT VARIABLES
import * as secrets from '../secrets';

import * as contentful from 'contentful';
export const createClient = contentful.createClient;

import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from "apollo-link-context";


export const previewClient = createClient({
  host: 'preview.contentful.com',
  space: secrets.CONTENTFUL_SPACE,
  accessToken: secrets.CONTENTFUL_ACCESS_TOKEN_DRAFTS
});

const httpLink = createHttpLink({ uri: secrets.AWS_APPSYNC_URL });

const link = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Api-Key': secrets.AWS_APPSYNC_API_KEY
    }
  }
});

export const client = new ApolloClient({
  link: link.concat(httpLink),
  cache: new InMemoryCache()
})