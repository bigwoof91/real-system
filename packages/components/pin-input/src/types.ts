import * as React from 'react';

type UsePinInputProps = {
  /**
   * If `true`, the pin input receives focus on mount
   */
  autoFocus?: boolean;
  /**
   * The value of the pin input. This is the value
   * that will be returned when the pin input is filled
   */
  value?: string;
  /**
   * The default value of the pin input
   */
  defaultValue?: string;
  /**
   * Function called on input change
   */
  onChange?: (value: string) => void;
  /**
   * Function called when all inputs have valid values
   */
  onComplete?: (value: string) => void;
  /**
   * The placeholder for the pin input
   */
  placeholder?: string;
  /**
   * If `true`, focus will move automatically to the next input once filled
   * @default true
   */
  manageFocus?: boolean;
  /**
   * If `true`, the pin input component signals to its fields that they should
   * use `autocomplete="one-time-code"`.
   */
  otp?: boolean;
  /**
   * The root-level id string that will be applied to the input fields.
   * The index of the input will be appended to this `id`.
   */
  id?: string;
  /**
   * If `true`, the pin input fields will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true`, the pin input fields will persist an `aria-invalid` attribute
   */
  isInvalid?: boolean;
  /**
   * The type of values the pin-input should allow
   */
  type?: 'alphanumeric' | 'number';
  /**
   * If `true`, the input's value will be masked just like `type=password`
   */
  mask?: boolean;
};

type PinInputProps = UsePinInputProps & {
  children: React.ReactNode;
};

type InputProps = Omit<
  React.ComponentPropsWithRef<'input'>,
  'color' | 'height' | 'width'
>;

type UsePinInputFieldProps = InputProps & {
  ref?: React.Ref<HTMLInputElement>;
};

export type {
  InputProps,
  PinInputProps,
  UsePinInputFieldProps,
  UsePinInputProps,
};
