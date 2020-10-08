import types from './types';
import { podcastActions } from '../podcast';

export function setPlayState(playState: 'stop' | 'pause' | 'play') {
  return async (dispatch: any) => {

    if (playState === 'play') {
      dispatch(podcastActions.pause());
      dispatch(podcastActions.setPersist(false));
    }

    dispatch({
      type: types.VIDEO_SET_PLAY_STATE,
      payload: playState
    });
  }
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

export function loadVideo({
  src,
  title,
  description,
  thumbnail,
  createdAt
}: {
  src: string
  title: string
  description: string
  thumbnail: string
  createdAt: number
}) {
  return {
    type: types.VIDEO_SET_VIDEO,
    payload: {
      src,
      title,
      description,
      thumbnail,
      createdAt
    }
  };
}