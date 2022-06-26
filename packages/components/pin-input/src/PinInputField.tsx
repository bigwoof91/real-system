import React, { forwardRef } from 'react';

import { InputBox } from '@real-system/input';
import type { RealSystemComponentProps } from '@real-system/styled-library';
import styled from '@real-system/styled-library';

import { usePinInputField } from './usePinInput';

const StyledInput = styled('input')({
  appearance: 'none',
  display: 'block',
  size: '100%',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  fontScale: 'input',
  fontWeight: 'input',
  textAlign: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 4,
  boxShadow: 'none',
  color: 'inherit',
  outline: 'none',
  resize: 'none',
  _placeholder: {
    color: 'gray-200',
    transition: 'all 0.15s ease-in',
    fontWeight: 'placeholder',
  },
  _hover_placeholder: {
    color: 'gray-300',
  },
  _focus_placeholder: {
    color: 'gray-300',
  },
  _focus: { outline: 'none' },
  _disabled: { cursor: 'default' },
  transition: 'all 0.2s ease-out',
});

type PinInputFieldProps = RealSystemComponentProps<'input'>;

const PinInputField = forwardRef<HTMLInputElement, PinInputFieldProps>(
  function PinInputField(props, ref) {
    const inputProps = usePinInputField(props, ref);
    return (
      <InputBox
        width="control"
        height="control"
        isInvalid={inputProps['aria-invalid'] as boolean}>
        <StyledInput {...inputProps} />
      </InputBox>
    );
  }
);

export type { PinInputFieldProps };
export { PinInputField };
