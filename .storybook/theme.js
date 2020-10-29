import React from "react";
import { select } from "@storybook/addon-knobs";
import { styleHelpers } from '../src/utils';

export default ({ children }) => {
  const theme = select(
    "Theme",
    ['light', 'dark'],
    localStorage.theme ?? 'light',
    "Themes"
  );

  React.useEffect(() => {
    localStorage.theme = theme;
  }, [theme]);

  const vars = (() => {
    switch (theme) {
      case 'dark':
        return styleHelpers.darkTheme();
      default:
        return styleHelpers.lightTheme();
    }
  })();

  return (
    <>
      <div>
        {children}
      </div>
      <style jsx>
        {`
          div {
            display: inline-block;
            ${vars}
          }
        `}
      </style>
    </>
  );
};