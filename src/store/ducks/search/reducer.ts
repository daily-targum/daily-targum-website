import types, { State } from './types';

const initialState: State = {
  query: '',
  focused: false,
  hits: null,
  hitsQuery: ''
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.UPDATE_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case types.SET_FOCUS:
      return {
        ...state,
        focused: action.payload
      };
    case types.SET_SEARCH_RESULTS:
      return {
        ...state,
        hits: action.payload,
        hitsQuery: state.query
      };
    default:
      return state;
  }
}