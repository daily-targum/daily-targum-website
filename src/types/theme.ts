import { spacing, roundness, mediaQuery } from '../constants/theme';

export interface Theme {
  colors: {
    primary: string,
    accent: string,
    text: string,
    textMuted: string,
    spinner: string,
    background: string,
    surface: string,
    divider: string,
    touchableHighlight: string,
    button: string
  },
  font: {
    light: string,
    regular: string,
    medium: string,
    bold: string
  },
  /**
   * Insets set by safe area view context
   */
  roundness: typeof roundness,
  spacing: typeof spacing,
  mediaQuery: typeof mediaQuery
}

export interface ComputedTheme extends Theme {}