import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { AspectRatioView, AspectRatioImage } from './AspectRatioView';

// This default export determines where your story goes in the story list
export default {
  title: 'AspectRatio',
  subcomponents: { AspectRatioView, AspectRatioImage }
};

const ViewTemplate: Story<ComponentProps<typeof AspectRatioView>> = (args) => (
  <AspectRatioView {...args} />
);

export const Squre = ViewTemplate.bind({});
Squre.args = {
  aspectRatio: 1,
  style: {
    backgroundColor: '#0f0',
    width: 200
  }
};

export const Reactangle = ViewTemplate.bind({});
Reactangle.args = {
  aspectRatio: 2,
  style: {
    backgroundColor: '#0f0',
    width: 200
  }
};

const ImageTemplate: Story<ComponentProps<typeof AspectRatioImage>> = (args) => (
  <AspectRatioImage {...args} />
);

export const SquareImage = ImageTemplate.bind({});
SquareImage.args = {
  aspectRatio: 1,
  style: {
    width: 200
  },
  src: 'https://dailytargum.imgix.net/images/25606a48-1fb9-4395-86f9-050df31eca7c.jpg?ar=1:1&auto=compress&crop=faces,entropy&fit=crop&fm=webp&width=200'
};

export const RectangleImage = ImageTemplate.bind({});
RectangleImage.args = {
  aspectRatio: 2,
  style: {
    width: 200
  },
  src: 'https://dailytargum.imgix.net/images/25606a48-1fb9-4395-86f9-050df31eca7c.jpg?ar=1:1&auto=compress&crop=faces,entropy&fit=crop&fm=webp&width=200'
};