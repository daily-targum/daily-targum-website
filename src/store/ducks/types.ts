import { navigationTypes, NavigationState } from './navigation';
import { Reducer } from 'redux';

type GetKeys<T> = keyof T;

export type Action = {
  type: GetKeys<
    typeof navigationTypes
  >,
  payload?: any
}

export type CombinedState = {
  navigation: NavigationState
}

export type CombinedReducers = {
  [key in keyof CombinedState]: Reducer<CombinedState[key], any>
}