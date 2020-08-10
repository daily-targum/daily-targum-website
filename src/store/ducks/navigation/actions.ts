import types from './types';

export function enableDarkNavbar() {
  return {
    type: types.SET_DARK_NAVBAR,
    payload: true
  }
}

export function disableDarkNavbar() {
  return {
    type: types.SET_DARK_NAVBAR,
    payload: false
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