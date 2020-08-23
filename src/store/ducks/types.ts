import { navigationTypes, NavigationState } from './navigation';
import { podcastTypes, PodcastState } from './podcast';
import { videoTypes, VideoState } from './video';
import { Reducer } from 'redux';

type GetKeys<T> = keyof T;

export type Action = {
  type: GetKeys<
    typeof navigationTypes |
    typeof podcastTypes | 
    typeof videoTypes
  >,
  payload?: any
}

export type CombinedState = {
  navigation: NavigationState
  podcast: PodcastState
  video: VideoState
}

export type CombinedReducers = {
  [key in keyof CombinedState]: Reducer<CombinedState[key], any>
}