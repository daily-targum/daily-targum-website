import types from './types';

export function enableDynamicHeader() {
  return {
    type: types.ENABLE_DYNAMIC_HEADER
  }
}

export function disablewDynamicHeader() {
  return {
    type: types.DISABLE_DYNAMIC_HEADER
  }
}