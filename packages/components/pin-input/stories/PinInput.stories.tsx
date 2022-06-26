import * as React from 'react';
import { Meta } from '@storybook/react';

import { PinInput, PinInputField } from '@real-system/pin-input';

export default {
  title: 'Components/Pin Input',
  component: PinInput,
  subcomponents: { PinInputField },
} as Meta;

/**
 * @todo add docs for hook example
 */

export const Default = (args) => (
  <PinInput {...args}>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
);

export const Masked = () => (
  <PinInput mask>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
);

export const Controlled = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleComplete = (value: string) => {
    console.log(value);
  };

  return (
    <PinInput value={value} onChange={handleChange} onComplete={handleComplete}>
      <PinInputField />
      <PinInputField />
      <PinInputField />
      <PinInputField />
    </PinInput>
  );
};

export const Invalid = () => (
  <PinInput mask isInvalid>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
);
