import * as React from 'react';

import { createDescendantContext } from '@real-system/descendants-library';
import { constate } from '@real-system/state-library';
import {
  callAllHandlers,
  mergeRefs,
  useControllableState,
} from '@real-system/utils-library';

import type {
  InputProps,
  UsePinInputFieldProps,
  UsePinInputProps,
} from './types';
import { toArray, validate } from './usePinInput.utils';

/**
 * -----------------------------
 * Context to manage descendants
 * -----------------------------
 **/

const [
  PinInputDescendantsProvider,
  usePinInputDescendantsContext,
  usePinInputDescendants,
  usePinInputDescendant,
] = createDescendantContext<HTMLInputElement>();

type PinInputContextValue = Omit<UsePinInputReturn, 'descendants'> & {
  /**
   * Sets the pin input component to the isDisabled state
   */
  isDisabled?: boolean;
  /**
   * Sets the pin input component to the invalid state
   */
  isInvalid?: boolean;
};

type PinInputContext = {
  value: PinInputContextValue;
};

/**
 * -----------------------------------
 * Context that stores pin-input logic
 * -----------------------------------
 **/

const [PinInputContextProvider, usePinInputContext] = constate(
  ({ value }: PinInputContext) => value
);

/**
 * @internal usePinInput
 * @description handles the general pin input logic
 */
const usePinInput = ({
  autoFocus,
  value,
  defaultValue,
  onChange,
  onComplete,
  placeholder = '○',
  manageFocus = true,
  otp = false,
  id: idProp,
  isDisabled,
  isInvalid,
  type = 'number',
  mask,
}: UsePinInputProps = {}) => {
  const uuid = React.useId();
  const id = idProp ?? `pin-input-${uuid}`;

  const descendants = usePinInputDescendants();

  const [moveFocus, setMoveFocus] = React.useState(true);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  const [values, setValues] = useControllableState<string[]>({
    defaultValue: toArray(defaultValue || value) || [],
    value: toArray(value),
    onChange: (values) => onChange?.(values.join('')),
  });

  React.useEffect(() => {
    if (autoFocus) {
      const first = descendants.first();
      if (first) {
        first.node.focus();
      }
    }
    // We don't want to listen for updates to `autoFocus` since it should only detect its initial value
    // eslint-disable-next-line
  }, [descendants]);

  const focusNext = React.useCallback(
    (index: number) => {
      if (!moveFocus || !manageFocus) return;
      const next = descendants.next(index, false);
      if (next) {
        next.node.focus();
      }
    },
    [moveFocus, manageFocus, descendants]
  );

  const setValue = React.useCallback(
    (value: string, index: number) => {
      const nextValues = [...values];
      nextValues[index] = value;
      setValues(nextValues);

      const isComplete =
        value !== '' &&
        nextValues.length === descendants.count() &&
        nextValues.every(
          (inputValue) => inputValue != null && inputValue !== ''
        );

      if (isComplete) {
        onComplete?.(nextValues.join(''));
      } else {
        focusNext(index);
      }
    },
    [values, setValues, focusNext, onComplete, descendants]
  );

  const clear = React.useCallback(() => {
    const values: string[] = Array(descendants.count()).fill('');
    setValues(values);
    const first = descendants.first();
    if (first) {
      first.node.focus();
    }
  }, [descendants, setValues]);

  const getNextValue = React.useCallback(
    (value: string, eventValue: string) => {
      let nextValue = eventValue;
      if (value?.length > 0) {
        if (value[0] === eventValue.charAt(0)) {
          nextValue = eventValue.charAt(1);
        } else if (value[0] === eventValue.charAt(1)) {
          nextValue = eventValue.charAt(0);
        }
      }
      return nextValue;
    },
    []
  );

  const getInputProps = React.useCallback(
    (props: InputProps & { index: number }): InputProps => {
      const { index, ...restProps } = props;

      /**
       * Improved from: https://github.com/uber/baseweb/blob/master/src/pin-code/pin-code.js
       */
      const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;
        const currentValue = values[index];
        const nextValue = getNextValue(currentValue, eventValue);

        // if the value was removed using backspace
        if (nextValue === '') {
          setValue('', index);
          return;
        }

        // in the case of an autocomplete or copy and paste
        if (eventValue.length > 2) {
          // see if we can use the string to fill out our values
          if (validate(eventValue, type)) {
            // Ensure the value matches the number of inputs
            const nextValue = eventValue
              .split('')
              .filter((_, index) => index < descendants.count());

            setValues(nextValue);

            // if pasting fills the entire input fields, trigger `onComplete`
            if (nextValue.length === descendants.count()) {
              onComplete?.(nextValue.join(''));
            }
          }
        } else {
          // only set if the new value is a number
          if (validate(nextValue, type)) {
            setValue(nextValue, index);
          }

          setMoveFocus(true);
        }
      };

      const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Backspace' && manageFocus) {
          if ((event.target as HTMLInputElement).value === '') {
            const prevInput = descendants.prev(index, false);
            if (prevInput) {
              setValue('', index - 1);
              prevInput.node.focus();
              setMoveFocus(true);
            }
          } else {
            setMoveFocus(false);
          }
        }
      };

      const onFocus = () => {
        setFocusedIndex(index);
      };

      const onBlur = () => {
        setFocusedIndex(-1);
      };

      const hasFocus = focusedIndex === index;
      const inputType = type === 'number' ? 'tel' : 'text';

      return {
        'aria-label': 'Please enter your pin code',
        inputMode: type === 'number' ? 'numeric' : 'text',
        type: mask ? 'password' : inputType,
        ...restProps,
        id: `${id}-${index}`,
        disabled: isDisabled,
        'aria-invalid': isInvalid ? true : false,
        onChange: callAllHandlers(restProps.onChange, onChange),
        onKeyDown: callAllHandlers(restProps.onKeyDown, onKeyDown),
        onFocus: callAllHandlers(restProps.onFocus, onFocus),
        onBlur: callAllHandlers(restProps.onBlur, onBlur),
        value: values[index] || '',
        autoComplete: otp ? 'one-time-code' : 'off',
        placeholder: hasFocus ? '' : placeholder,
      };
    },
    [
      focusedIndex,
      type,
      mask,
      id,
      isDisabled,
      isInvalid,
      values,
      otp,
      placeholder,
      getNextValue,
      setValue,
      setValues,
      descendants,
      onComplete,
      manageFocus,
    ]
  );

  return {
    // prop getter
    getInputProps,
    // state
    id,
    descendants,
    values,
    // actions
    setValue,
    setValues,
    clear,
  };
};

type UsePinInputReturn = ReturnType<typeof usePinInput>;

/**
 * @internal usePinInputField
 * @description generates props for each `PinInputField` nested as `children` inside `PinInput`
 */
const usePinInputField = (
  props: UsePinInputFieldProps = {},
  ref: React.Ref<any> = null
) => {
  const { getInputProps } = usePinInputContext();
  const { index, register } = usePinInputDescendant();

  const inputProps = getInputProps({
    ...props,
    ref: mergeRefs(register, ref),
    index,
  });

  return inputProps;
};

export type { PinInputContext, UsePinInputFieldProps, UsePinInputReturn };
export {
  PinInputContextProvider,
  PinInputDescendantsProvider,
  usePinInput,
  usePinInputContext,
  usePinInputDescendant,
  usePinInputDescendants,
  usePinInputDescendantsContext,
  usePinInputField,
};
