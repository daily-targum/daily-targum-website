import { Theme } from '../types';

const light: Theme = {
  colors: {
    primary: '#1b1b1b',
    accent: '#cc0033',
    text: '#000',
    textMuted: '#999',
    spinner: '#bbb',
    background: '#fff',
    surface: '#555',
    divider: 'rgba(0,0,0,0.1)',
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