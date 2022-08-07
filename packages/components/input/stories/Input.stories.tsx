import React, { useMemo, useState } from 'react';
import { Meta } from '@storybook/react';

import { Box } from '@real-system/box';
import { Button } from '@real-system/button';
import { Icon } from '@real-system/icon';
import { Input as RealInput } from '@real-system/input';
import { Text } from '@real-system/typography';

export default {
  title: 'Components/Input',
  component: RealInput,
} as Meta;

const isEmail = (value: string) =>
  value.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
const Container = (props) => <Box marginBottom={15} {...props} />;

export const Showcase = (args) => {
  return (
    <Box width="27rem">
      <Container>
        <Text.Label mb={4} htmlFor="input">
          Text (default)
        </Text.Label>
        <RealInput
          id="input"
          name="email-address"
          placeholder="Real System"
          {...args}
        />
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-1">
          Email
        </Text.Label>
        <RealInput
          type="email"
          id="input-1"
          name="email-address"
          placeholder="personal@realsystem.com"
          {...args}
        />
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-2">
          Number
        </Text.Label>
        <RealInput
          type="number"
          id="input-2"
          name="email-address"
          placeholder="23"
          {...args}
        />
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-3">
          With prefix
        </Text.Label>
        <RealInput
          type="email"
          id="input-3"
          name="email-address"
          placeholder="personal@realsystem.com"
          prefix={<Icon icon="mail" />}
          {...args}
        />
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-4">
          With suffix
        </Text.Label>
        <RealInput
          type="email"
          id="input-4"
          name="email-address"
          placeholder="personal@realsystem.com"
          suffix={
            <Button size="sm" variant="floating">
              <Icon icon="information-circle" />
            </Button>
          }
          {...args}
        />
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-5">
          Password with Readonly
        </Text.Label>
        <RealInput
          readOnly
          type="password"
          id="input-5"
          name="email-address"
          value="personal@realsystem.com"
          suffix={
            <Button size="sm" variant="floating">
              <Icon icon="clipboard-copy" />
            </Button>
          }
          {...args}
        />
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-6" disabled>
          Disabled
        </Text.Label>
        <RealInput
          disabled
          id="input-6"
          name="email-address"
          value="personal@realsystem.com"
          {...args}
        />
      </Container>
    </Box>
  );
};

export const Default = (args) => {
  return (
    <Container width="27rem">
      <RealInput
        type="email"
        id="input-1"
        name="email-address"
        placeholder="personal@realsystem.com"
        {...args}
      />
    </Container>
  );
};

export const Composition = (args) => {
  const [value, setValue] = useState('');
  const isEmpty = useMemo(() => !value, [value]);
  const isNotEmail = useMemo(() => !isEmail(value), [value]);

  return (
    <Box width="27rem">
      <Container>
        <Text.Label mb={4} htmlFor="input-1">
          Email (required)
        </Text.Label>
        <RealInput
          type="email"
          id="input-1"
          name="email-address"
          placeholder="personal@realsystem.com"
          {...args}
        />
        <Text.HelperText>Use your personal email address.</Text.HelperText>
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input" required>
          Email (required with error)
        </Text.Label>
        <RealInput
          type="email"
          id="input"
          name="email-address"
          placeholder="personal@realsystem.com"
          onChange={(e) => setValue(e.target.value)}
          invalid={isEmpty || isNotEmail}
          {...args}
        />
        <Text.HelperText
          errorText={
            isEmpty
              ? 'Field is required'
              : isNotEmail
              ? 'Must be a valid email'
              : ''
          }>
          Use your personal email address.
        </Text.HelperText>
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-2">
          Email (prefix)
        </Text.Label>
        <RealInput
          type="email"
          id="input-2"
          name="email-address"
          placeholder="personal@realsystem.com"
          prefix={<Icon icon="mail" />}
          {...args}
        />
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-3">
          Email (suffix)
        </Text.Label>
        <RealInput
          type="email"
          id="input-3"
          name="email-address"
          placeholder="personal@realsystem.com"
          suffix={
            <Button size="sm" variant="floating">
              <Icon icon="information-circle" />
            </Button>
          }
          {...args}
        />
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-4">
          Email (readonly)
        </Text.Label>
        <RealInput
          readOnly
          type="email"
          id="input-4"
          name="email-address"
          value="personal@realsystem.com"
          suffix={
            <Button
              size="sm"
              variant="floating"
              onClick={() => {
                const type = 'text/plain';
                window?.navigator?.clipboard?.write([
                  new ClipboardItem({
                    [type]: new Blob(['personal@realsystem.com'], { type }),
                  }),
                ]);
              }}>
              <Icon icon="clipboard-copy" />
            </Button>
          }
          {...args}
        />
      </Container>
      <Container>
        <Text.Label mb={4} htmlFor="input-5" disabled>
          Email (disabled)
        </Text.Label>
        <RealInput
          disabled
          type="email"
          id="input-5"
          name="email-address"
          value="personal@realsystem.com"
          {...args}
        />
      </Container>
    </Box>
  );
};
