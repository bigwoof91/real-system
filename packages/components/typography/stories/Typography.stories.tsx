import * as React from 'react';
import { Meta } from '@storybook/react';

import { Box } from '@real-system/box';
import { Flex } from '@real-system/flex';
import { Text } from '@real-system/typography';

export default {
  title: 'Components/Typography',
  component: Text,
  subcomponents: {
    Heading: Text.Heading,
    HelperText: Text.HelperText,
    Label: Text.Label,
    Code: Text.Code,
    Truncate: Text.Truncate,
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
} as Meta;

const Template = (args) => {
  return (
    <>
      <Text {...args}>
        The quick brown fox jumps over the{' '}
        <Text {...args} inline fontWeight={5}>
          lazy
        </Text>{' '}
        dog.
      </Text>
    </>
  );
};

Template.storyName = 'Text';

export const Default = Template.bind({});

export const Heading = () => (
  <Box display="flex" flexDirection="column">
    <Text.Heading as="h1">Heading 1</Text.Heading>
    <Text.Heading as="h2">Heading 2</Text.Heading>
    <Text.Heading as="h3">Heading 3</Text.Heading>
    <Text.Heading as="h4">Heading 4</Text.Heading>
    <Text.Heading as="h5">Heading 5</Text.Heading>
    <Text.Heading as="h6">Heading 6</Text.Heading>
  </Box>
);

export const Label = () => (
  <Box display="flex" flexDirection="column">
    <Text.Label>Label</Text.Label>
    <Text.Label isDisabled>Disabled Label</Text.Label>
    <Text.Label isRequired>Required Label</Text.Label>
    <Text.Label isRequired isDisabled>
      Disabled Required Label
    </Text.Label>
  </Box>
);

export const HelperText = () => (
  <Box display="flex" flexDirection="column">
    <Text.HelperText id="help-text">Help text</Text.HelperText>
    <Text.HelperText id="help-text-danger" status="danger">
      Danger help text
    </Text.HelperText>
    <Text.HelperText
      id="help-text-error"
      status="danger"
      errorText="Error help text">
      Danger help text
    </Text.HelperText>
    <Text.HelperText
      id="help-text-error-without-icon"
      errorText="Error help text without icon"
      hideErrorIcon
    />
  </Box>
);

export const Code = () => (
  <Flex vertical gap={3}>
    <Flex>
      <Text.Code colorScheme="gray" width="auto">
        const RealSystem = 'Awesome!'
      </Text.Code>
    </Flex>
    <Flex>
      <Text.Code colorScheme="blue">const RealSystem = 'Intuitive!'</Text.Code>
    </Flex>
    <Flex>
      <Text.Code colorScheme="green">const RealSystem = 'Easy!'</Text.Code>
    </Flex>
    <Flex>
      <Text.Code colorScheme="purple">const RealSystem = 'Radical!'</Text.Code>
    </Flex>
    <Flex>
      <Text.Code colorScheme="red">
        const RealSystem = 'Not Installed!'
      </Text.Code>
    </Flex>
  </Flex>
);

export const TruncateText = (args) => (
  <Box maxWidth="17rem">
    <Text>
      <Text.Truncate {...args} />
    </Text>
  </Box>
);
