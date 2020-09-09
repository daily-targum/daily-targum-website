import { Theme } from '../types';

const BASE = 5;

export const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
} as const;
type BreakPoint = keyof typeof breakPoints;

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

export function roundness(): typeof BASE
export function roundness(multiplier: number): number
export function roundness(top: number, right: number): string
export function roundness(top: number, right: number, bottom: number): string
export function roundness(top: number, right: number, bottom: number, left: number): string
export function roundness(...args: number[]): number | string {
  if (args.length <= 1) {
    return (args[0] || 1) * BASE;
  }
  return args.map(num => `${BASE * num}px`).join(' ');
}

export function mediaQuery(min?: BreakPoint, max?: BreakPoint) {
	const bounds: string[] = [];
	if (min) {
		bounds.push(`(min-width: ${breakPoints[min]}px)`);
	}
	if (max) {
		bounds.push(`(max-width: ${breakPoints[max]}px)`);
	}
	return `@media only screen and ${bounds.join(' and ')}`
}

export function timing(multiplier: number) {
  return `${0.2 * multiplier}s`;
}

const main: Theme = {
  colors: {
    primary: {
      main: 'var(--primary-color)',
      contrastText: 'var(--primary-contrastText-color)',
      contrastTextMuted: 'var(--primary-contrastTextMuted-color)'
    },
    accent: 'var(--accent-color)',
    text: 'var(--text-color)',
    textMuted: 'var(--text-muted-color)',
    spinner: 'var(--spinner-color)',
    background: 'var(--background-color)',
    surface: 'var(--surface-color)',
    divider: 'var(--divider-color)',
    touchableHighlight: 'var(--touchable-highlight-color)',
    button: 'var(--button-color)',
    navbar: 'var(--navbar-color)'
  },
  font: {
    light: '',
    regular: '',
    medium: '',
    bold: ''
  },
  roundness,
  spacing,
  mediaQuery,
  timing
}

export const themes = {
  main
}

export const theme = main;