import types, { State } from './types';
import { SearchHits } from '../../../aws';

export function setQuery(query: string) {
  return {
    type: types.SEARCH_UPDATE_QUERY,
    payload: query
  }
}

export function setFocused(focused: boolean) {
  return {
    type: types.SEARCH_SET_FOCUS,
    payload: focused
  }
}

export function setHijacked(hijacked: boolean) {
  return {
    type: types.SEARCH_SET_HIJACKED,
    payload: hijacked
  }
}

export function search() {
  return async (dispatch: any, getState: () => { search: State }) => {
    dispatch({
      type: types.SEARCH_LOADING
    });

    const { search } = await import('../../../aws');
    const { query } = getState().search;
    const res = await search({ query });

    dispatch({
      type: types.SEARCH_SET_RESULTS,
      payload: res
    })
  }
}

export function clearSearchResults() {
  return {
    type: types.SEARCH_CLEAR_RESULTS
  }
}

export function hydrate({ 
  query,
  hits 
}: {
  query: string,
  hits: SearchHits
}) {
  return {
    type: types.SEARCH_HYDRATE,
    payload: {
      query,
      hits
    }
  }
}