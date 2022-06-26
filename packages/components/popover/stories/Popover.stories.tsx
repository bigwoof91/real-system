import * as React from 'react';
import { Meta } from '@storybook/react';

import { Flex } from '@real-system/flex';
import { Link } from '@real-system/link';
import {
  Popover,
  PopoverButton,
  PopoverContainer,
  PopoverDescription,
  PopoverDismiss,
  PopoverHeading,
  PopoverTrigger,
} from '@real-system/popover';

export default {
  title: 'Components/Popover',
  component: Popover,
  subcomponents: {
    PopoverButton,
    PopoverContainer,
    PopoverDescription,
    PopoverDismiss,
    PopoverHeading,
  },
  argTypes: {
    hideCloseButton: { type: 'boolean' },
    hideArrow: { type: 'boolean' },
  },
} as Meta;

export const Default = (args) => {
  return (
    <Flex padding={10} xAlignContent="center">
      <PopoverContainer placement="bottom">
        <PopoverButton variant="ghost">Open Popover</PopoverButton>
        <Popover
          hideCloseButton={args.hideCloseButton}
          hideArrow={args.hideArrow}>
          <PopoverHeading marginBottom={8}>Meet Popover</PopoverHeading>
          <PopoverDescription marginBottom={8}>
            Hello there. I am a popover! Use me as a non-modal dialog to display
            additional rich content above your UI.
          </PopoverDescription>
          <PopoverDismiss variant="fill" colorScheme="blue">
            Confirm
          </PopoverDismiss>
        </Popover>
      </PopoverContainer>
    </Flex>
  );
};

export const CustomTrigger = (args) => {
  return (
    <Flex padding={10} xAlignContent="center">
      <PopoverContainer placement="bottom">
        <PopoverTrigger>
          <Link as="div" showExternal>
            External Link
          </Link>
        </PopoverTrigger>
        <Popover
          maxW="35rem"
          hideCloseButton={args.hideCloseButton}
          hideArrow={args.hideArrow}>
          <PopoverHeading marginBottom={8}>Heads 🆙</PopoverHeading>
          <PopoverDescription marginBottom={10}>
            I acknowledge I am leaving the real system storybook and I trust
            this link.
          </PopoverDescription>
          <Flex>
            <PopoverDismiss
              mr={4}
              variant="fill"
              colorScheme="blue"
              onClick={(hide) => {
                window.open('https://system.themikewolf.com');
                hide();
              }}>
              Confirm
            </PopoverDismiss>
            <PopoverDismiss variant="ghost">Cancel</PopoverDismiss>
          </Flex>
        </Popover>
      </PopoverContainer>
    </Flex>
  );
};
