import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Button, ButtonText } from './Button';

// This default export determines where your story goes in the story list
export default {
  title: 'Button'
};

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Button'
};

const LinkTemplate: Story<ComponentProps<typeof ButtonText>> = (args) => (
  <ButtonText {...args} />
);

export const Link = LinkTemplate.bind({});
Link.args = {
  children: 'Link'
};