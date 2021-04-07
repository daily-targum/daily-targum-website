import types, { State } from './types';

const initialState: State = {
  playState: 'stop',
  position: 0,
  duration: 0,
  persist: false
};

export default function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case types.SET_PLAY_STATE: 
      return {
        ...state,
        playState: action.payload
      }
    case types.SET_POSITION: 
      return {
        ...state,
        position: action.payload
      }
    case types.SET_DURATION: 
      return {
        ...state,
        duration: action.payload
      }
    case types.SET_PLAYER: 
      return {
        ...state,
        player: action.payload
      }
    case types.SET_PERSIST: 
      return {
        ...state,
        persist: action.payload
      }
    case types.SET_EPISODE: 
      return {
        ...state,
        playState: 'stop',
        position: 0,
        duration: 0,
        persist: false,
        episode: action.payload
      }
    default:
      return state;
  }
}