import * as React from 'react';

import { runIfFn } from '../helpers';

import { useCallbackRef } from './useCallbackRef';

const useControllableProp = <T>(prop: T | undefined, state: T) => {
  const isControlled = prop !== undefined;
  const value = isControlled && typeof prop !== 'undefined' ? prop : state;
  return [isControlled, value] as const;
};

export type UseControllableStateProps<T> = {
  /**
   * The value to used in controlled mode
   */
  value?: T;
  /**
   * The initial value to be used, in uncontrolled mode
   */
  defaultValue?: T | (() => T);
  /**
   * The callback fired when the value changes
   */
  onChange?: (value: T) => void;
  /**
   * The function that determines if the state should be updated
   */
  shouldUpdate?: (prev: T, next: T) => boolean;
};

/**
 * Use optionally-controlled local/component state.
 */
const useControllableState = <T>(props: UseControllableStateProps<T>) => {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = (prev, next) => prev !== next,
  } = props;
  const onChangeProp = useCallbackRef(onChange);
  const shouldUpdateProp = useCallbackRef(shouldUpdate);

  const [valueState, setValueState] = React.useState(defaultValue as T);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? (valueProp as T) : valueState;

  const updateValue = React.useCallback(
    (next: React.SetStateAction<T>) => {
      const nextValue = runIfFn(next, value);

      if (!shouldUpdateProp(value, nextValue)) {
        return;
      }

      if (!isControlled) {
        setValueState(nextValue);
      }

      onChangeProp(nextValue);
    },
    [isControlled, onChangeProp, value, shouldUpdateProp]
  );

  return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>];
};

export { useControllableProp, useControllableState };
