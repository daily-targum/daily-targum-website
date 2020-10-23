import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import GlobalCSS from '../src/components/GlobalCSS';
 
addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
});

export const decorators = [
  (Story) => (
    <>
      <Story />
      <GlobalCSS/>
    </>
  ),
];