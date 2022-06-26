import * as React from 'react';

import type { RealElementPrimitiveProps } from '@real-system/elements-primitive';
import { real } from '@real-system/elements-primitive';
import {
  preventSpreadingStyleProps,
  StylishProps,
} from '@real-system/styled-library';
import { makeTestId, merge } from '@real-system/utils-library';

import { Addon, AddonProps } from './Addon';

export type InputBoxTypes =
  | 'text'
  | 'email'
  | 'hidden'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'date'
  | 'time';

export type InputBoxProps = {
  children: NonNullable<React.ReactNode>;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  type: InputBoxTypes;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonProps?: Omit<AddonProps, 'children'>;
} & RealElementPrimitiveProps<'div'>;

type InputBoxStates =
  | 'isReadOnly'
  | 'hidden'
  | 'isDisabled'
  | 'default'
  | 'isInvalid';

const baseStyles: StylishProps = {
  display: 'flex',
  width: '100%',
  height: 'control',
  border: '1px solid',
  borderRadius: 4,
  transition: 'box-shadow 150ms ease-in, border-color 150ms ease-in',
  bgColor: 'white',
  cursor: 'text',
  outline: 'none',
  boxShadow: 'none',
  _hover: {},
  _focusWithin: {},
  _active: { boxShadow: 'none' },
};

const styles: Record<InputBoxStates, StylishProps> = {
  default: merge(baseStyles, {
    color: 'gray-500',
    borderColor: 'gray-200',
    _hover: {
      borderColor: 'gray-300',
    },
    _focusWithin: {
      borderColor: 'gray-400',
      boxShadow: 'focus-outline',
    },
    _active: {
      borderColor: 'gray-400',
    },
  }),
  isDisabled: merge(baseStyles, {
    color: 'gray-300',
    bgColor: 'gray-50',
    borderColor: 'gray-200',
    cursor: 'default',
  }),
  isReadOnly: merge(baseStyles, {
    color: 'gray-400',
    bgColor: 'gray-50',
    borderColor: 'gray-200',
    _hover: { borderColor: 'gray-300' },
    _focusWithin: {
      boxShadow: 'focus-outline',
      borderColor: 'gray-300',
    },
    _active: { borderColor: 'gray-300' },
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
  hidden: merge(baseStyles, {
    bgColor: 'none',
    border: 0,
    _hover: { border: 0 },
    _focusWithin: {
      border: 0,
    },
    _active: { border: 0 },
  }),
};

const InputBox = React.forwardRef<HTMLDivElement, InputBoxProps>(
  (
    {
      isDisabled: isDisabledProp,
      isInvalid = false,
      isReadOnly: isReadOnlyProp,
      children,
      type,
      suffix,
      prefix,
      addonProps,
      ...restProps
    },
    ref
  ) => {
    const isHidden = type === 'hidden';
    const isDisabled = isDisabledProp && !isHidden;
    const isDanger = isInvalid && !isHidden;
    const isReadOnly = isReadOnlyProp && !isHidden;
    let state: InputBoxStates = 'default';

    if (isDisabled) {
      state = 'isDisabled';
    } else if (isDanger) {
      state = 'isInvalid';
    } else if (isReadOnly) {
      state = 'isReadOnly';
    } else if (isHidden) {
      state = 'hidden';
    }

    return (
      <real.div
        ref={ref}
        {...styles[state]}
        data-testid={makeTestId('input-box')}
        {...preventSpreadingStyleProps(restProps, {
          display: true,
          height: true,
          width: true,
          border: true,
          borderRadius: true,
          transition: true,
          bgColor: true,
          backgroundColor: true,
          color: true,
          borderColor: true,
          boxShadow: true,
          cursor: true,
          _hover: true,
          _focusWithin: true,
          _active: true,
        })}>
        {prefix && (
          <Addon isDisabled={isDisabled} {...addonProps}>
            {prefix}
          </Addon>
        )}
        {children}
        {suffix && (
          <Addon isDisabled={isDisabled} {...addonProps} isSuffix>
            {suffix}
          </Addon>
        )}
      </real.div>
    );
  }
);

InputBox.displayName = 'InputBox';

export { InputBox };
