/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { Meta } from '@storybook/react';

import { Button } from '@real-system/button';
import { Icon, ICONS_LIST } from '@real-system/icon';
import { Stack } from '@real-system/stack';
import { palettes } from '@real-system/styled-library';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    isLoading: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'select',
      options: ['outline', 'fill', 'ghost', 'floating'],
    },
    colorScheme: {
      control: 'select',
      options: Object.keys(palettes.realSystem),
    },
  },
  args: {
    children: 'Button',
    variant: 'outline',
  },
} as Meta;

export const Default = (args) => (
  <Stack.Horizontal spacing={8}>
    <Button {...args} width="auto" />
    <Button {...args} leadingIcon={<Icon icon="arrows-expand" />} width="auto">
      Leading Icon
    </Button>
    <Button {...args} trailingIcon={<Icon icon="chevron-down" />} width="auto">
      Trailing Icon
    </Button>
  </Stack.Horizontal>
);

export const Sizes = (args) => (
  <Stack.Horizontal spacing={8}>
    <Button variant="fill" colorScheme="blue" {...args} size="sm">
      Small
    </Button>
    <Button variant="fill" colorScheme="blue" {...args} size="md">
      Medium (default)
    </Button>
    <Button variant="fill" colorScheme="blue" {...args} size="lg">
      Large
    </Button>
  </Stack.Horizontal>
);

export const IconButton = (args) => (
  <Stack.Horizontal spacing={8}>
    <Button {...args}>
      <Icon icon={'cog'} />
    </Button>
  </Stack.Horizontal>
);

IconButton.argTypes = {
  icon: { control: { type: 'select', options: ICONS_LIST } },
};
