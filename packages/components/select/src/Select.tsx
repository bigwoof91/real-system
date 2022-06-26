import React, { forwardRef } from 'react';

import type { SelectPrimitiveOptions } from '@real-system/select-primitive';
import { SelectPrimitive } from '@real-system/select-primitive';
import type {
  RealSystemComponentProps,
  StylishProps,
} from '@real-system/styled-library';
import styled from '@real-system/styled-library';
import { merge } from '@real-system/utils-library';

import { useSelectStateContext } from './SelectContext';
import { SelectPopover } from './SelectPopover';

const StyledSelect = styled(SelectPrimitive)<SelectPrimitiveOptions>();

const resetStyles = {
  bg: 'none',
  border: 'none',
};

const baseStyles: StylishProps = {
  ...resetStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: 'control',
  paddingX: 6,
  margin: 0,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: 4,
  outline: 'none',
  boxShadow: 'none',
  bgColor: 'white',
  color: 'gray-500',
  cursor: 'text',
  fontScale: 'input',
  fontWeight: 'input',
  transition: 'box-shadow 150ms ease-in, border-color 150ms ease-in',
  boxSizing: 'border-box',
  _hover: {},
  _focusWithin: {},
  _active: { boxShadow: 'none' },
};

const selectStyles: Record<'default' | 'isInvalid', StylishProps> = {
  default: merge(baseStyles, {
    borderColor: 'gray-200',
    _hover: {
      borderColor: 'gray-300',
    },
    _focusWithin: {
      borderColor: 'gray-300',
      boxShadow: 'focus-outline',
    },
    _expanded: {
      borderColor: 'gray-300',
    },
    _disabled: {
      color: 'gray-300',
      bgColor: 'gray-50',
      borderColor: 'gray-200',
      cursor: 'default',
    },
  }),
  isInvalid: merge(baseStyles, {
    borderColor: 'red-500',
    _hover: { borderColor: 'red-600' },
    _focusWithin: {
      boxShadow: 'focus-outline',
      borderColor: 'red-600',
    },
    _active: { borderColor: 'red-600' },
  }),
};

type SelectProps = RealSystemComponentProps;

const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { children, ...restProps },
  ref
) {
  const state = useSelectStateContext();
  const styles = state.isInvalid
    ? selectStyles['isInvalid']
    : selectStyles['default'];

  return (
    <>
      <StyledSelect {...styles} state={state} ref={ref} {...restProps} />
      <SelectPopover>{children}</SelectPopover>
    </>
  );
});

export type { SelectProps };
export { Select };
