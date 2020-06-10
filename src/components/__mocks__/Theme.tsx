import React from 'react';
import { Provider as ContextThemeProvider } from 'react-context-theming/lib/index';
import * as WebTheming from 'react-context-theming/lib/web';
import { StyleCreatorFunction, GenerateStylesFunction, NamedStyles, generateCSS } from 'react-context-theming/lib/web';
import { themes } from '../../constants';
import { ComputedTheme } from '../../types';

export function Provider({ children }: {children: React.ReactNode}) {
  return ( 
    <ContextThemeProvider<any> theme={themes.light}>
      {children}
    </ContextThemeProvider>
  );
}

export const useTheme = (): ComputedTheme => themes.light;

export function makeStyleCreator<
  T = ComputedTheme, 
  S extends NamedStyles<S> | NamedStyles<any> = never
>(
  styleFn: StyleCreatorFunction<T, S> | GenerateStylesFunction<T, S>
): GenerateStylesFunction<T, S> {
  return WebTheming.makeStyleCreator<T, S>(styleFn);
}

export function useStyleCreator(
  styleFn: GenerateStylesFunction<ComputedTheme, never>,
  ...extraData: any[]
) {
  return styleFn(useTheme(), ...extraData);
};

export function withStyleCreator<
  T = ComputedTheme,
  S = never
>(
  Component: any, 
  styleFn: GenerateStylesFunction<T, S>,
  ...extraData: any[]
): any {
  return WebTheming.withStyleCreator<T, S>(Component, styleFn, ...extraData)
}

export function useStyleCreatorClassNames(
  styleFn: GenerateStylesFunction<ComputedTheme, never>
) {
  return generateCSS(useStyleCreator(styleFn));;
}

export function withTheme(Component: any): any {
  return class WrappedComponent extends React.Component<{}, null> {
    render() {
      return <Component {...this.props} theme={themes.light}/>;
    }
  };
}

export const Theme = {
  Provider,
  useTheme,
  makeStyleCreator,
  useStyleCreator,
  withStyleCreator,
  useStyleCreatorClassNames,
  withTheme
};
export default Theme;