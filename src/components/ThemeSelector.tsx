import * as React from 'react';
import { styleHelpers, nextUtils } from '../utils';
import { hyphenatedToCapitalized } from '../shared/src/utils';
import { useAmp } from 'next/amp';

const themes = [
  'light',
  'dark',
  'system'
];

export function ThemeSelector() {
  const [theme, setTheme] = React.useState<string | null>(null);
  const isAmp = useAmp();

  React.useEffect(() => {
    if (nextUtils.isBrowser() && localStorage.theme) {
      setTheme(localStorage.theme);
    }
  }, []);

  React.useEffect(() => {
    if (theme !== null) {
      localStorage.theme = theme;
    }
  }, [theme]);

  return isAmp ? null : (
    <>
      <select 
        value={theme ?? themes[0]}
        onChange={e => setTheme(e.target.value)}
      >
        {themes.map(theme => (
          <option 
            key={theme} 
            value={theme}
          >
            {hyphenatedToCapitalized(theme)} Theme 
          </option>
        ))}
      </select>
      <style jsx global>
        {`
          @media only screen {
            :root,
            body,
            body,
            #next-app {
              ${theme === 'dark' ? styleHelpers.darkTheme() : ''}
            }
          }

          @media only screen and (prefers-color-scheme: dark) {
            :root,
            body,
            #next-app {
              ${theme === 'system' ? styleHelpers.darkTheme() : ''}
            }
          }
        `}
      </style>
    </>
  )
}

export default ThemeSelector;