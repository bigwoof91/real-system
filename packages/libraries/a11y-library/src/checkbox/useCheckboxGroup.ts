import {
  useCheckboxGroup as useAriaCheckboxGroup,
  useCheckboxGroupItem as useAriaCheckboxGroupItem,
} from '@react-aria/checkbox';
import {
  CheckboxGroupState,
  useCheckboxGroupState as useAriaCheckboxGroupState,
} from '@react-stately/checkbox';

import {
  AriaCheckboxGroupItemProps,
  AriaCheckboxGroupProps,
  CustomCheckboxGroupProps,
  RestoredAriaCheckboxGroupItemProps,
  RestoredAriaCheckboxGroupProps,
} from './types';

const restoreCheckboxGroupProps = (
  props: AriaCheckboxGroupProps
): RestoredAriaCheckboxGroupProps & CustomCheckboxGroupProps => {
  const { isDisabled, isReadOnly, ...restProps } = props;

  return {
    isDisabled,
    isReadOnly,
    ...restProps,
  };
};

const useCheckboxGroupState = (props: AriaCheckboxGroupProps) => {
  const restoredProps = restoreCheckboxGroupProps(props);
  return useAriaCheckboxGroupState(restoredProps);
};

const useCheckboxGroup = (
  props: AriaCheckboxGroupProps,
  state: CheckboxGroupState
) => {
  const restoredProps = restoreCheckboxGroupProps(props);
  return useAriaCheckboxGroup(restoredProps, state);
};

const restoreCheckboxGroupItemProps = (
  props: AriaCheckboxGroupItemProps
): RestoredAriaCheckboxGroupItemProps => {
  const { isChecked, defaultChecked, ...restProps } = props;

  return {
    isSelected: isChecked,
    defaultSelected: defaultChecked,
    ...restProps,
  };
};

const useCheckboxGroupItem: typeof useAriaCheckboxGroupItem = (
  props,
  state,
  ref
) => {
  const restoredProps = restoreCheckboxGroupItemProps(props);
  return useAriaCheckboxGroupItem(restoredProps, state, ref);
};

export type { CheckboxGroupState };
export { useCheckboxGroup, useCheckboxGroupItem, useCheckboxGroupState };
