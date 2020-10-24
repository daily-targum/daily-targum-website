import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import GlobalCSS from '../src/components/GlobalCSS';

import { withKnobs } from "@storybook/addon-knobs";

import ThemeSelector from './theme';
 
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  },
});

export const decorators = [
  (Story) => (
    <>
      <ThemeSelector>
        <Story />
        <GlobalCSS/>
      </ThemeSelector>
    </>
  ),
  withKnobs
];