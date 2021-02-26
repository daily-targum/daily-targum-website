import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ARTICLE } from '../aws/actions/__mocks__/articles';

import Byline from './Byline';

// This default export determines where your story goes in the story list
export default {
  title: 'Byline'
};

const Template: Story<ComponentProps<typeof Byline.Authors>> = (args) => (
  <Byline.Authors {...args} />
);

export const WithAuthorPicture = Template.bind({});
WithAuthorPicture.args = {
  authors: ARTICLE.authors
};

export const WithoutAuthorPicture = Template.bind({});
WithoutAuthorPicture.args = {
  authors: ARTICLE.authors.map(author => ({
    ...author,
    headshot: undefined
  }))
};