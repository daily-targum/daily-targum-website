import types, { State } from './types';

const initialState: State = {
  dynamicHeaderEnabled: false
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.ENABLE_DYNAMIC_HEADER:
      return {
        ...state,
        dynamicHeaderEnabled: true
      };
    case types.DISABLE_DYNAMIC_HEADER:
      return {
        ...state,
        dynamicHeaderEnabled: false
      };
    default:
      return state;
  }
}