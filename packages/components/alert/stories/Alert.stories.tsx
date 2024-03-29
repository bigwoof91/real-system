import * as React from 'react';
import type { Meta } from '@storybook/react';

import { Alert, InlineAlert as RealInlineAlert } from '@real-system/alert';
import { Box } from '@real-system/box';
import { Text } from '@real-system/typography';

export default {
  title: 'Components/Alert',
  component: Alert,
  subcomponents: { InlineAlert: RealInlineAlert },
  args: {
    children: 'There are over 200 integrations available',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dod eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
} as Meta;

export const Showcase = (args) => (
  <>
    <Alert {...args} onDismiss={undefined} status="info" marginBottom={8} />
    <Alert {...args} onDismiss={undefined} status="success" marginBottom={8} />
    <Alert {...args} onDismiss={undefined} status="warning" marginBottom={8} />
    <Alert {...args} onDismiss={undefined} status="danger" marginBottom={8} />
    <RealInlineAlert {...args} status="info" marginBottom={8}>
      There are over 5000 integrations available
    </RealInlineAlert>
    <RealInlineAlert {...args} status="success" marginBottom={8}>
      There are over 5000 integrations available
    </RealInlineAlert>
    <RealInlineAlert {...args} status="warning" marginBottom={8}>
      There are over 5000 integrations available
    </RealInlineAlert>
    <RealInlineAlert {...args} status="danger" marginBottom={8}>
      There are over 5000 integrations available
    </RealInlineAlert>
  </>
);

export const Default = (args) => <Alert {...args} onDismiss={undefined} />;

export const DismissableAlert = (args) => (
  <Alert {...args} onDismiss={() => window.alert('Alert dismissed.')} />
);

export const InlineAlert = (args) => (
  <Box width="40rem">
    <Text.Heading as="h4">Short text</Text.Heading>
    <RealInlineAlert {...args} marginBottom={8} />
    <Text.Heading as="h4">Long text</Text.Heading>
    <RealInlineAlert {...args} />
  </Box>
);
