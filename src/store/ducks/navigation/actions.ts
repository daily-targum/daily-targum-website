import types from './types';

export function disablewDynamicHeader() {
  return {
    type: types.DISABLE_DYNAMIC_HEADER
  }
}

export function toggleMobileMenu() {
  return {
    type: types.TOGGLE_MOBILE_MENU
  }
}

export function closeMobileMenu() {
  return {
    type: types.CLOSE_MOBILE_MENU
  }
}

export function openMobileMenu() {
  return {
    type: types.OPEN_MOBILE_MENU
  }
}