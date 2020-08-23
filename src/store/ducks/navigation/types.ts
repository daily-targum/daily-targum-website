
export default {
  SET_DARK_NAVBAR: 'SET_DARK_NAVBAR',
  TOGGLE_MOBILE_MENU: 'TOGGLE_MOBILE_MENU',
  OPEN_MOBILE_MENU: 'OPEN_MOBILE_MENU',
  CLOSE_MOBILE_MENU: 'CLOSE_MOBILE_MENU'
}

export interface State {
  mobileMenuVisible: boolean,
  darkNavbar: boolean
}