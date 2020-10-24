import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Banner } from './Banner';

// This default export determines where your story goes in the story list
export default {
  title: 'Banner',
  component: Banner,
};

const Template: Story<ComponentProps<typeof Banner>> = (args) => (
  <Banner {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  text: 'News'
};

export const AccentText = Template.bind({});
AccentText.args = {
  text: 'Inside',
  accentText: 'Beat'
};

export const Legacy = Template.bind({});
Legacy.args = {
  text: 'News',
  legacy: true
};