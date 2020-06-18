import { Theme } from '../types';

const light: Theme = {
  colors: {
    primary: '#050505',
    accent: '#cc0033',
    text: '#000',
    textMuted: '#999',
    spinner: '#bbb',
    background: '#fff',
    surface: '#fafafa',
    divider: 'rgba(0,0,0,0.06)',
    touchableHighlight: '#eee',
    button: '#eee'
  },
  font: {
    light: '',
    regular: '',
    medium: '',
    bold: ''
  },
  dark: false,
  roundness: (multiplier: number = 1) => 5 * multiplier,
  spacing: (multiplier: number = 1) => 5 * multiplier
}

const dark: Theme = {
  ...light,
  dark: true
}

export const themes = {
  dark,
  light
}