import * as React from 'react';
import { Meta } from '@storybook/react';

import { Text } from '@real-system/typography';
import { VisuallyHidden } from '@real-system/visually-hidden';

export default {
  title: 'Utilities/VisuallyHidden',
  component: VisuallyHidden,
} as Meta;

export const Default = () => {
  return <Text.Label isRequired>First Name</Text.Label>;
};
