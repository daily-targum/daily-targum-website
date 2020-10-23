import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import ActivityIndicator from './ActivityIndicator';

// This default export determines where your story goes in the story list
export default {
  title: 'ActivityIndicator'
};

const SpinnerTemplate: Story<ComponentProps<typeof ActivityIndicator.Spinner>> = () => (
  <ActivityIndicator.Spinner />
);

export const Spinner = SpinnerTemplate.bind({});

const Template: Story<ComponentProps<typeof ActivityIndicator>> = (args) => (
  <ActivityIndicator {...args} />
);

export const Delayed = Template.bind({});
Delayed.args = {
  delay: 500
};

const ScreenTemplate: Story<ComponentProps<typeof ActivityIndicator.Screen>> = (args) => (
  <ActivityIndicator.Screen {...args} />
);

export const Screen = ScreenTemplate.bind({});
Screen.args = {
  delay: 0
};