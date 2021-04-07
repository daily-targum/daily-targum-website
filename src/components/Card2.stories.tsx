import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ARTICLE } from '../aws/actions/__mocks__/articles';
import { imgix } from '../utils';
import { formatDateAbriviated, extractTextFromHTML } from '../utils';

import Card from './Card2';

// This default export determines where your story goes in the story list
export default {
  title: 'Card'
};

const StackedTemplate: Story<ComponentProps<typeof Card.Stacked>> = (args) => (
  <div style={{maxWidth: 400}}>
    <Card.Stacked {...args} />
  </div>
);

export const StackedCard = StackedTemplate.bind({});
StackedCard.args = {
  tag: ARTICLE.category,
  title: ARTICLE.title,
  imageData: imgix(ARTICLE.media[0]?.url ?? '', {
    xs: imgix.presets.md('16:9')
  }),
  date: formatDateAbriviated(ARTICLE.publishDate),
  aspectRatio: 16 / 9,
  description: extractTextFromHTML(ARTICLE.abstract ?? '')
};