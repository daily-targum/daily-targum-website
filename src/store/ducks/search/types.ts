import { SearchHits } from '../../../aws';

export default {
  SEARCH_UPDATE_QUERY: 'SEARCH_UPDATE_QUERY',
  SEARCH_SET_FOCUS: 'SEARCH_SET_FOCUS',
  SEARCH_SET_RESULTS: 'SEARCH_SET_RESULTS',
  SEARCH_CLEAR_RESULTS: 'SEARCH_CLEAR_RESULTS',
  SEARCH_LOADING: 'SEARCH_LOADING',
  SEARCH_SET_HIJACKED: 'SEARCH_SET_HIJACKED',
  SEARCH_HYDRATE: 'SEARCH_HYDRATE'
}

export interface State {
  query: string;
  focused: boolean;
  hits: SearchHits | null;
  hitsQuery: string;
  loading: boolean;
  hijacked: boolean;
  hydrated: boolean;
}