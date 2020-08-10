import types from './types';

export function setPlayState(playState: 'stop' | 'pause' | 'play') {
  return {
    type: types.VIDEO_SET_PLAY_STATE,
    payload: playState
  };
}

export function setDuration(duration: number) {
  return {
    type: types.VIDEO_SET_DURATION,
    payload: duration
  };
}

export function setPosition(position: number) {
  return {
    type: types.VIDEO_SET_POSITION,
    payload: position
  };
}

export function setPersist(persist: boolean) {
  return {
    type: types.VIDEO_SET_PERSIST,
    payload: persist
  };
}

export function loadVideo(src: string) {
  return {
    type: types.VIDEO_SET_VIDEO,
    payload: src
  };
}