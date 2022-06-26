import * as React from 'react';
import { Meta } from '@storybook/react';

import { RadioGroup } from '@real-system/radio-group';

export default {
  title: 'Components/Radio Group',
  component: RadioGroup,
  subcomponents: { Radio: RadioGroup.Radio },
  args: { helpText: 'Choose your single most favorite pet' },
  argTypes: {
    helpText: { type: 'string' },
    errorText: { type: 'string' },
  },
} as Meta;

export const Default = (args) => (
  <RadioGroup label="Favorite pet" {...args}>
    <RadioGroup.Radio value="dog">Dog</RadioGroup.Radio>
    <RadioGroup.Radio value="cat">Cat</RadioGroup.Radio>
    <RadioGroup.Radio value="fish">Fish</RadioGroup.Radio>
    <RadioGroup.Radio value="hamster" isDisabled>
      Hamster
    </RadioGroup.Radio>
  </RadioGroup>
);
