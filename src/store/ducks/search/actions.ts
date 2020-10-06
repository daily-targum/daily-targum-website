import types, { State } from './types';

export function setQuery(query: string) {
  return {
    type: types.UPDATE_QUERY,
    payload: query
  }
}

export function setFocused(focused: boolean) {
  return {
    type: types.SET_FOCUS,
    payload: focused
  }
}

export function search() {
  return async (dispatch: any, getState: () => { search: State }) => {
    const { search } = await import('../../../shared/src/client');
    const { query } = getState().search;
    const res = await search({ query });

    dispatch({
      type: types.SET_SEARCH_RESULTS,
      payload: res
    })
  }
}