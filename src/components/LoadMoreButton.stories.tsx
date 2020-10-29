import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import LoadMoreButton from './LoadMoreButton';

// This default export determines where your story goes in the story list
export default {
  title: 'LoadMoreButton',
  component: LoadMoreButton,
};

const Template: Story<ComponentProps<typeof LoadMoreButton>> = (args) => (
  
  <LoadMoreButton {...args} />
);

export const Idle = Template.bind({});
Idle.args = {
  handleLoad: () => {},
  loading: false
};

export const Loading = Template.bind({});
Loading.args = {
  handleLoad: () => {},
  loading: true
};