import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import Divider from './Divider';

// This default export determines where your story goes in the story list
export default {
  title: 'Divider',
  component: Divider
};

const Template: Story<ComponentProps<typeof Divider>> = (args) => (
  <div style={{height: 400, width: 400}}>
    <Divider {...args} />
  </div>
);

export const Horizontal = Template.bind({});

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true
}