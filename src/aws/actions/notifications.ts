import { client } from '../client';
import gql from 'graphql-tag';

export async function updateDevice({ 
  pushToken, 
  pref,
  os
}: {
  pushToken: string, 
  pref: number,
  os: string
}) {
  return await client.mutate({
    mutation: gql`
      mutation createDevice($pushToken: String!, $pref: Int!, $os: String) {
        createDevice(
          input: {
            push_token: $pushToken, preference: $pref, os: $os
          }
        ) {
          push_token
          preference
          os
        }
      }
    `,
    variables: {
      os,
      pushToken,
      pref
    }
  });
}


