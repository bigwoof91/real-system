/**
 * @todo figure out safe way to pass style props
 */
import React, { forwardRef } from 'react';

import { InputBox, InputBoxTypes } from './InputBox';
import { InputElement } from './InputElement';
import { InputProps } from './types';

type InputTypeProps = {
  type: InputBoxTypes;
  inputmode?: string;
  pattern?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    isReadOnly,
    isDisabled,
    isInvalid,
    suffix,
    prefix,
    placeholder,
    id,
    value,
    isRequired,
    name,
    ...restProps
  },
  ref
) {
  const inputTypeProps: InputTypeProps = { type };

  if (type === 'number') {
    inputTypeProps.type = 'text';
    inputTypeProps.inputmode = 'numeric';
    inputTypeProps.pattern = '[0-9]*';
  }

  return (
    <InputBox
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      suffix={suffix}
      prefix={prefix}
      isReadOnly={isReadOnly}
      type={type}
      {...restProps}>
      <InputElement
        aria-invalid={isInvalid}
        aria-readonly={isReadOnly}
        isDisabled={isDisabled}
        id={id}
        name={name}
        placeholder={placeholder}
        isRequired={isRequired}
        value={value}
        ref={ref}
        {...restProps}
        {...inputTypeProps}
      />
    </InputBox>
  );
});

export { Input };
export type { InputProps };
