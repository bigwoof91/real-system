import * as React from 'react';

import { DisclosurePrimitive } from '@real-system/disclosure-primitive';
import { Icon } from '@real-system/icon';
import type {
  RealSystemComponentProps,
  StylishProps,
} from '@real-system/styled-library';
import styled from '@real-system/styled-library';
import { merge } from '@real-system/utils-library';

import { useDisclosureContext } from './DisclosureContext';

const defaultStyles: StylishProps = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  p: 6,
  px: 6,
  border: 'none',
  color: 'gray-800',
  backgroundColor: 'white',
  cursor: 'pointer',
  transition: 'all .2s ease-in-out',
  _expanded: {
    backgroundColor: 'gray-50',
    color: 'gray-900',
  },
  _hover: {
    backgroundColor: 'gray-50',
    color: 'gray-900',
  },
  _active: {
    backgroundColor: 'gray-100',
    color: 'gray-900',
  },
  _focusVisible: {
    _after: {
      zIndex: 'docked',
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: '100%',
      boxShadow: 'focus-outline',
    },
    outline: 0,
  },
};

const containedStyles: StylishProps = merge(defaultStyles, {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'gray-100',
  borderRadius: 4,
  _expanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: 'transparent',
  },
});

const StyledDisclosureTrigger = styled('span')<{ contained?: boolean }>(
  ({ contained }) => (contained ? containedStyles : defaultStyles)
);

type DisclosureTriggerProps = RealSystemComponentProps<'div'> & {
  hideToggleIcon?: boolean;
};

/**
 * Can be used to create a custom Disclosure Toggle.
 * Is used internally, in conjunction with `DisclosureHeading` to create `DisclosureToggle`.
 */
const DisclosureTrigger = ({
  children,
  isDisabled,
  hideToggleIcon,
  ...restProps
}: DisclosureTriggerProps) => {
  const { state, ...restContext } = useDisclosureContext();
  const { visible } = state;

  return (
    <DisclosurePrimitive
      as={StyledDisclosureTrigger}
      disabled={isDisabled}
      state={state}
      {...restContext}
      {...restProps}
      data-disclosure-trigger>
      <>
        {!hideToggleIcon && (
          <Icon
            icon="chevron-right"
            transform={visible ? 'rotate(90deg)' : 'rotate(0deg)'}
            transition="transform .2s ease-in-out"
            mr={4}
            size="sm"
          />
        )}
        {children}
      </>
    </DisclosurePrimitive>
  );
};

export type { DisclosureTriggerProps };
export { DisclosureTrigger };
