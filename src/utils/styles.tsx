import * as React from 'react';
import { ObjectKeys } from './array'
import { ReactChildren } from '../types'

function aspectRatioFullHeight(aspectRatio: number) {
  return {
    height: '100%',
    paddingTop: `${100 / aspectRatio}%`
  } as const;
}

function aspectRatioFullWidth(aspectRatio: number) {
  return `
    width: 100%;
    padding-top: ${100 / aspectRatio}%;
  `;
}


function lightTheme() {
  return `
    --colors-primary_main: #050505;
    --colors-primary_contrastText: #ffffff;
    --colors-primary_contrastTextMuted: rgba(255,255,255,0.8);
    --colors-accent_main: #cc0033;
    --colors-accent_contrastText: #fff;
    --colors-divider: rgba(0, 0, 0, 0.12);

    --colors-highlight: rgba(0,0,0,0.05);

    --colors-text: #000;
    --colors-textMuted: #555555;

    --colors-surface: #fff;

    --colors-navbar: rgba(255,255,255,0.92);

    --colors-background_dark: #f7f7f7;
    --colors-background_main: #ffffff;
    --colors-background_light: #ffffff;

    --colors-tooltip: #333;
    --colors-tooltip_contrastText: #fff;

    --colors-banner: var(--colors-primary_main);

    color: var(--colors-text);
  `;
}

function darkTheme() {
  return `
    --colors-primary_main: #000000;
    --colors-primary_contrastText: #ffffff;
    --colors-primary_contrastTextMuted: rgba(255,255,255,0.8);
    --colors-accent_main: #f70737;
    --colors-accent_contrastText: #fff;
    --colors-divider: #333;

    --colors-highlight: rgba(255,255,255,0.3);

    --colors-text: #fff;
    --colors-textMuted: #b9b9b9;

    --colors-surface: #222;

    --colors-navbar: rgba(0, 0, 0, 0.973);

    --colors-background_main: #131313;
    --colors-background_light: #111;

    --colors-tooltip: #fff;
    --colors-tooltip_contrastText: #000;

    --colors-banner: var(--colors-background_light);

    color: var(--colors-text);
  `;
}


function lockWidth(width: string | number) {
  if (typeof width === 'number') {
    width = width + 'px';
  }

  return `
    min-width: ${width};
    width: ${width};
    max-width: ${width};
  `;
}

function lockHeight(height: string | number) {
  if (typeof height === 'number') {
    height = height + 'px';
  }

  return `
    min-height: ${height};
    height: ${height};
    max-height: ${height};
  `;
}

function flex(direction: 'row' | 'column') {
  return `
    display: flex;
    flex-direction: ${direction};
  `;
}

function centerBackgroundImage() {
  return `
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `;
}

function absoluteFill() {
  return `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `;
}

function stickySidebar(navbarHeight: number) {
  return `
    position: sticky;
    top: calc(${spacing(1.25)} + 1vw + ${navbarHeight}px)
  `;
}

function page() {
  return `
    padding-top: calc(${spacing(1.25)} + 1vw);
    padding-bottom: calc(${spacing(1.25)} + 1vw);
    flex: 1;
  `;
}

function pageCompact() {
  return `
    padding-top: ${spacing(2)};
    padding-bottom: ${spacing(2)};
    flex: 1;
  `;
}

function card() {
  return `
    border-radius: ${roundness(1)};
    overflow: hidden;
    position: relative;
  `;
}

function cardBody() {
  return `
    padding: ${spacing(2)};
  `;
}

function unstyle() {
  return `
    border: none;
    margin: 0;
    padding: 0;
    background-color: transparent;
  `;
};

function accessibilityOutline() {
  return `
    outline: 1px dotted #212121;
    outline: 5px auto -webkit-focus-ring-color;
  `;
}

function hideLink() {
  return `
    text-decoration: none;
    color: ${color('text')};
  `;
}

function hideButton() {
  return `
    background: transparent;
    border: none;
    text-align: unset;
    padding: 0;
    margin: 0;
    font-size: 1rem;
  `;
}

function roundness(...multipliers: number[]) {
  return multipliers.map(m => (m * 6) + 'px').join(' ');
}

function spacing(...multipliers: number[]) {
  return multipliers.map(m => (m * 5) + 'px').join(' ');
}

function timing(multiplier: number) {
  return (0.2 * multiplier) + 's';
}

function color(color: string) {
  return `var(--colors-${color})`;
}

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 991,
  xl: 1350,
  xxl: 1600
};
type Breakpoint = keyof typeof breakpoints;

function breakpointToNumber(breakpoint: Breakpoint) {
  return breakpoints[breakpoint];
}

function mediaQuery(lower?: Breakpoint, upper?: Breakpoint) {
  let query = "only screen";

  if (lower) {
    query += ` and (min-width: ${breakpointToNumber(lower)}px)`;
  }

  if (upper) {
    query += ` and (max-width: ${breakpointToNumber(upper)}px)`;
  }

  return query;
}

function printMediaQuery(lower?: Breakpoint, upper?: Breakpoint) {
  let query = "print";

  if (lower) {
    query += ` and (min-width: ${breakpointToNumber(lower) * 0.3}px)`;
  }

  if (upper) {
    query += ` and (max-width: ${breakpointToNumber(upper) * 0.3}px)`;
  }

  return query;
}

export const styleHelpers = {
  lightTheme,
  darkTheme,
  lockWidth,
  lockHeight,
  hideLink,
  hideButton,
  aspectRatioFullHeight,
  aspectRatioFullWidth,
  absoluteFill,
  pageCompact,
  page,
  card,
  cardBody,
  flex,
  color,
  spacing,
  roundness,
  mediaQuery,
  printMediaQuery,
  unstyle,
  accessibilityOutline,
  timing,
  centerBackgroundImage,
  stickySidebar
}

type Styles<T, S> = {
  [P in keyof T]: S
}

export function buildStyleSheet<T>(
  styles: Styles<T, { className: string; styles: ReactChildren }>
): {
  classNames: Styles<T, string>;
  StyleSheet: JSX.Element;
} {
  const StyleSheets: any[] = [];
  const classNames: any = {};

  ObjectKeys(styles).forEach(key => {
    StyleSheets.push(styles[key].styles);
    classNames[key] = styles[key].className;
  });

  return {
    classNames,
    StyleSheet: (
      <>
        {StyleSheets.map((StyleSheet, i) => (
          <React.Fragment key={i}>
            {StyleSheet}
          </React.Fragment>
        ))}
      </>
    )
  };
}