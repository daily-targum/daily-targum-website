import types, { State } from './types';

const initialState: State = {
  mobileMenuVisible: false,
  darkNavbar: false
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.SET_DARK_NAVBAR:
      return {
        ...state,
        darkNavbar: action.payload
      };
    case types.TOGGLE_MOBILE_MENU: 
      return {
        ...state,
        mobileMenuVisible: !state.mobileMenuVisible
      }
    case types.OPEN_MOBILE_MENU: 
      return {
        ...state,
        mobileMenuVisible: true
      }
    case types.CLOSE_MOBILE_MENU: 
      return {
        ...state,
        mobileMenuVisible: false
      }
    default:
      return state;
  }
}