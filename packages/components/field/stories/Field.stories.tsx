import * as React from 'react';
import { Meta } from '@storybook/react';

import { Button } from '@real-system/button';
import {
  Field,
  FieldArea,
  FieldGroup,
  FieldHelperText,
  FieldLabel,
} from '@real-system/field';
import { Input } from '@real-system/input';
import { Select, SelectContainer, SelectItem } from '@real-system/select';

export default {
  title: 'Components/Field',
  component: Field,
  subcomponents: { FieldGroup, FieldArea, FieldHelperText, FieldLabel },
} as Meta;

export const Default = (args) => (
  <Field isRequired width="250px">
    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
    <Input type="text" id="firstName" />
    <FieldHelperText errorText="Your first name is required">
      Please provide your first name
    </FieldHelperText>
  </Field>
);

export const InlineField = (args) => (
  <Field isInline isRequired width="400px" {...args}>
    <FieldArea flex={4}>
      <FieldLabel htmlFor="fullName">Full name</FieldLabel>
      <FieldHelperText errorText="Your first name is required">
        First, middle and/or last
      </FieldHelperText>
    </FieldArea>
    <FieldArea flex={5}>
      <Input type="text" id="fullName" />
    </FieldArea>
  </Field>
);

// export const WithError = () => (
//   <Field
//     inline
//     label="First name"
//     labelFor="firstName"
//     helpText="Provide your first name"
//     errorText="This field is required"
//     required>
//     <Input type="text" id="firstName" error />
//   </Field>
// );

// export const FieldGroupStory = () => (
//   <form>
//     <FieldGroup marginBottom={8} width="200px">
//       <Field label="First name" labelFor="firstName" width="100%" required>
//         <Input type="text" id="firstName" />
//       </Field>
//       <Field label="Last name" labelFor="lastName" width="100%" required>
//         <Input type="text" id="lastName" />
//       </Field>
//       <Field label="Phone number" width="100%" labelFor="phoneNumber">
//         <Input type="tel" id="phoneNumber" />
//       </Field>
//       <Field builtIns={false} width="100%">
//         <SelectContainer>
//           <Label>Engineering Level</Label>
//           <Select>
//             <SelectItem value="L1">L1 (Associate)</SelectItem>
//             <SelectItem value="L2">L2 (Mid)</SelectItem>
//             <SelectItem value="L3">L3 (Senior)</SelectItem>
//             <SelectItem value="L4">L4 (Staff)</SelectItem>
//           </Select>
//         </SelectContainer>
//       </Field>
//     </FieldGroup>
//     <Button type="reset" variant="fill">
//       Submit
//     </Button>
//   </form>
// );

// FieldGroupStory.storyName = 'Field Group';

// export const InlineFieldGroup = () => (
//   <form>
//     <FieldGroup inline marginBottom={8} width="100%">
//       <Field label="First name" labelFor="firstName" width="20%" required>
//         <Input type="text" id="firstName" />
//       </Field>
//       <Field label="Last name" labelFor="lastName" width="20%" required>
//         <Input type="text" id="lastName" />
//       </Field>
//       <Field label="Phone number" labelFor="phoneNumber" width="20%">
//         <Input type="tel" id="phoneNumber" />
//       </Field>
//       <Field builtIns={false} width="20%">
//         <SelectContainer>
//           <Label>Engineering Level</Label>
//           <Select>
//             <SelectItem value="L1">L1 (Associate)</SelectItem>
//             <SelectItem value="L2">L2 (Mid)</SelectItem>
//             <SelectItem value="L3">L3 (Senior)</SelectItem>
//             <SelectItem value="L4">L4 (Staff)</SelectItem>
//           </Select>
//         </SelectContainer>
//       </Field>
//     </FieldGroup>
//     <Button type="reset" variant="fill">
//       Submit
//     </Button>
//   </form>
// );

// export const WithoutBuiltins = () => (
//   <form>
//     <FieldGroup width="200px">
//       <Field builtIns={false} width="100%">
//         <Label htmlFor="firstName" required>
//           First name
//         </Label>
//         <Input type="text" id="firstName" />
//         <HelperText>Provide your first name</HelperText>
//       </Field>
//       <Field builtIns={false} width="100%">
//         <Label htmlFor="lastName" required>
//           Last name
//         </Label>
//         <Input type="text" id="lastName" />
//         <HelperText>Provide your last name</HelperText>
//       </Field>
//       <Field builtIns={false} width="100%">
//         <Label htmlFor="phoneNumber">Phone number</Label>
//         <Input type="tel" id="phoneNumber" />
//       </Field>
//       <Field builtIns={false} width="100%">
//         <SelectContainer>
//           <Label>Engineering Level</Label>
//           <Select>
//             <SelectItem value="L1">L1 (Associate)</SelectItem>
//             <SelectItem value="L2">L2 (Mid)</SelectItem>
//             <SelectItem value="L3">L3 (Senior)</SelectItem>
//             <SelectItem value="L4">L4 (Staff)</SelectItem>
//           </Select>
//         </SelectContainer>
//       </Field>
//       <Button type="reset" variant="fill">
//         Submit
//       </Button>
//     </FieldGroup>
//   </form>
// );

// WithoutBuiltins.storyName = 'Without Built-ins';
