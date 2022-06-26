import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';

import { Box } from '@real-system/box';
import { Button } from '@real-system/button';
import { Icon } from '@real-system/icon/src';
import { Input } from '@real-system/input';
import { Tooltip } from '@real-system/tooltip';

export default {
  title: 'Recipes/Copy Button',
  args: {
    label: 'Copied!',
    placement: 'top',
    isDisabled: false,
  },
  argTypes: {
    isDisabled: { type: 'boolean' },
    isOpen: { type: 'boolean' },
    delay: { type: 'number' },
  },
} as Meta;

export const CopyInputText = (args) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeout: any = () =>
      setTimeout(() => {
        setCopied(false);
      }, 1500) as any;

    if (copied) {
      timeout = timeout();
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Box padding={20} width="30rem">
      <Input
        isReadOnly
        type="email"
        id="input-4"
        name="email-address"
        value="personal@realsystem.com"
        suffix={
          <Tooltip {...args} visible={copied} hideArrow gutter={4}>
            <Button
              size="sm"
              variant="floating"
              onClick={() => {
                const type = 'text/plain';
                window?.navigator?.clipboard
                  ?.write([
                    new ClipboardItem({
                      [type]: new Blob(['personal@realsystem.com'], { type }),
                    }),
                  ])
                  ?.then(() => setCopied(true));
              }}>
              <Icon icon="clipboard-copy" />
            </Button>
          </Tooltip>
        }
        {...args}
      />
    </Box>
  );
};
