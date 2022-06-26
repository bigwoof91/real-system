import * as React from 'react';
import { Meta } from '@storybook/react';

import { Box } from '@real-system/box';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
  useIndeterminate,
} from '@real-system/checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  subcomponents: { CheckboxGroup: CheckboxGroup, CheckboxGroupItem },
  args: {
    children: 'Give this user "Owner" permissions',
  },
  argTypes: {
    errorText: { type: 'string' },
    helperText: { type: 'string' },
    isChecked: { type: 'boolean' },
    isRequired: { type: 'boolean' },
    isReadOnly: { type: 'boolean' },
    isIndeterminate: { type: 'boolean' },
    isDisabled: { type: 'boolean' },
  },
} as Meta;

export const Default = (args) => (
  <Checkbox
    helperText="Determines if the user has permission to add, edit and delete other users"
    {...args}
  />
);

export const CheckboxGroupStory = (args) => {
  return (
    <Box display="block" width="34rem">
      <CheckboxGroup
        label="What engineering level is the new team member?"
        defaultValue={['associate']}
        helperText="Select at least 1 level for the new engineer"
        {...args}>
        <CheckboxGroupItem value="architect">Architect</CheckboxGroupItem>
        <CheckboxGroupItem value="principle">Principle</CheckboxGroupItem>
        <CheckboxGroupItem value="staff">Staff</CheckboxGroupItem>
        <CheckboxGroupItem value="senior" isDisabled>
          Senior
        </CheckboxGroupItem>
        <CheckboxGroupItem value="mid" isDisabled>
          Mid
        </CheckboxGroupItem>
        <CheckboxGroupItem value="associate" isDisabled>
          Associate
        </CheckboxGroupItem>
      </CheckboxGroup>
    </Box>
  );
};

CheckboxGroupStory.storyName = 'Checkbox Group';

export const Indeterminate = () => {
  const [checkedItems, setCheckedItems] = React.useState(['associate']);

  const indeterminateValue = 'all';
  const values = ['principle', 'staff', 'senior', 'mid', 'associate'];
  const { indeterminateProps, checkBoxGroupProps } = useIndeterminate({
    values,
    indeterminateValue,
    checkedItems,
    setCheckedItems,
  });

  return (
    <CheckboxGroup
      label="What engineering level is the new team member?"
      value={checkedItems}
      helperText="Select at least 1 level for the new engineer"
      {...checkBoxGroupProps}>
      <CheckboxGroupItem value={indeterminateValue} {...indeterminateProps}>
        All
      </CheckboxGroupItem>
      <CheckboxGroupItem value={values[0]}>Principle</CheckboxGroupItem>
      <CheckboxGroupItem value={values[1]}>Staff</CheckboxGroupItem>
      <CheckboxGroupItem value={values[2]}>Senior</CheckboxGroupItem>
      <CheckboxGroupItem value={values[3]}>Mid</CheckboxGroupItem>
      <CheckboxGroupItem value={values[4]}>Associate</CheckboxGroupItem>
    </CheckboxGroup>
  );
};
