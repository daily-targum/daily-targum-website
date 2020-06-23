import { Theme } from '../types';

const BASE = 5;

export function spacing(): typeof BASE
export function spacing(multiplier: number): number
export function spacing(top: number, right: number): string
export function spacing(top: number, right: number, bottom: number): string
export function spacing(top: number, right: number, bottom: number, left: number): string
export function spacing(...args: number[]): number | string {
  if (args.length <= 1) {
    return (args[0] || 1) * BASE;
  }
  return args.map(num => `${BASE * num}px`).join(' ');
}

export function roundness(multiplier: number = 1) {
  return multiplier * BASE;
}

const light: Theme = {
  colors: {
    primary: '#050505',
    accent: '#cc0033',
    text: '#000',
    textMuted: '#999',
    spinner: '#bbb',
    background: '#fafafa',
    surface: '#fff',
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
  roundness,
  spacing
}

const dark: Theme = {
  ...light,
  dark: true
}

export const themes = {
  dark,
  light
}