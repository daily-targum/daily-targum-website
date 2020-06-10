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
  dark: boolean,
  roundness: (multiplier?: number) => number,
  spacing: (multiplier?: number) => number,
}

export interface ComputedTheme extends Theme {}