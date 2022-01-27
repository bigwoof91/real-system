import React from 'react';
import { Meta } from '@storybook/react';

import { Button } from '@real-system/button';
import { Flex } from '@real-system/flex';
import { Toast, Toaster, useToaster } from '@real-system/toaster';

export default {
  title: 'Components/Toaster',
  component: Toaster,
  subcomponents: { Toast },
} as Meta;

export const Showcase = (args) => {
  const toaster = useToaster();
  return (
    <Flex vertical>
      <Button
        mb={4}
        intent="primary"
        onPress={() =>
          toaster.notify('12 new messages', {
            description: 'Hi, my name is Bond, James Bond... Hello',
          })
        }>
        Notify toaster
      </Button>
      <Button
        mb={4}
        intent="primary"
        onPress={() =>
          toaster.notify('Successfully installed Real System', {
            dismissAfter: false,
            description:
              'You have now have full access to components that make sense.',
          })
        }>
        Notify toaster with no timer
      </Button>
      <Button
        mb={4}
        onPress={() =>
          toaster.warning('You forgot to enter some details', {
            description:
              'Fill in your first name, last name and date of birth.',
          })
        }>
        Warning toaster
      </Button>
      <Button
        intent="danger"
        mb={4}
        onPress={() =>
          toaster.danger('Verification failed', {
            description: 'Contact customer support for assistance.',
            onDismiss: () => {
              // eslint-disable-next-line no-console
              console.log('custom dismiss');
            },
          })
        }>
        Danger toaster
      </Button>
      <Button
        mb={4}
        intent="success"
        onPress={() =>
          toaster.success('Successfully installed Real System', {
            description:
              'You have now have full access to components that make sense.',
          })
        }>
        Success toaster
      </Button>
      <Toaster {...toaster} />
    </Flex>
  );
};