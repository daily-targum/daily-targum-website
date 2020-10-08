import { SearchHits } from '../../../shared/src/client';

export default {
  UPDATE_QUERY: 'UPDATE_QUERY',
  SET_FOCUS: 'SET_FOCUS',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  CLEAR_SEARCH_RESULTS: 'CLEAR_SEARCH_RESULTS'
}

export interface State {
  query: string;
  focused: boolean;
  hits: SearchHits | null;
  hitsQuery: string
}