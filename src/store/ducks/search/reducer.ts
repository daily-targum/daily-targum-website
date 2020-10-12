import types, { State } from './types';

const initialState: State = {
  query: '',
  focused: false,
  hits: null,
  hitsQuery: '',
  loading: false,
  hijacked: false,
  hydrated: false
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.SEARCH_UPDATE_QUERY:
      return {
        ...state,
        query: action.payload,
        loading: action.payload !== '',
        // blank query clears search
        ...(action.payload === '' ? {
          hits: null,
          hitsQuery: '',
        } : null)
      };
    case types.SEARCH_SET_FOCUS:
      return {
        ...state,
        focused: action.payload
      };
    case types.SEARCH_SET_RESULTS:
      return {
        ...state,
        hits: action.payload,
        hitsQuery: state.query,
        loading: false
      };
    case types.SEARCH_CLEAR_RESULTS:
      return {
        ...state,
        hits: null,
        hitsQuery: '',
        loading: false
      };
    case types.SEARCH_LOADING:
      return {
        ...state,
        loading: true
      }
    case types.SEARCH_SET_HIJACKED:
      return {
        ...state,
        hijacked: action.payload
      }
    case types.SEARCH_HYDRATE:
      return {
        ...state,
        query: action.payload.query,
        hitsQuery: action.payload.query,
        hits: action.payload.hits,
        hydrated: true
      }
    default:
      return state;
  }
}