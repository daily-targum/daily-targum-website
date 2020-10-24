import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ARTICLE } from '../shared/src/client/actions/__mocks__/articles';

import Byline from './Byline';

// This default export determines where your story goes in the story list
export default {
  title: 'Byline'
};

const AuthorsTemplate: Story<ComponentProps<typeof Byline.Authors>> = (args) => (
  <Byline.Authors {...args} />
);

export const Article = AuthorsTemplate.bind({});
Article.args = {
  authors: ARTICLE.authors
};