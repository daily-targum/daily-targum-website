import types, { State } from './types';

const initialState: State = {
  playState: 'stop',
  position: 0,
  duration: 0,
  persist: true
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.VIDEO_SET_PLAY_STATE: 
      return {
        ...state,
        playState: action.payload
      }
    case types.VIDEO_SET_POSITION: 
      return {
        ...state,
        position: action.payload
      }
    case types.VIDEO_SET_PERSIST: 
      return {
        ...state,
        persist: action.payload
      }
    case types.VIDEO_SET_DURATION: 
      return {
        ...state,
        duration: action.payload
      }
    case types.VIDEO_SET_PLAYER: 
      return {
        ...state,
        player: action.payload
      }
    case types.VIDEO_SET_VIDEO: 
      return {
        ...state,
        src: action.payload,
        position: 0,
        duration: 0,
        playState: 'stop'
      }
    default:
      return state;
  }
}