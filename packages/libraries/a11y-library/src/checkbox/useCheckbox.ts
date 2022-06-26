import { useCheckbox as useAriaCheckbox } from '@react-aria/checkbox';
import { useToggleState as useAriaToggleState } from '@react-stately/toggle';

import { AriaCheckboxProps, RestoredAriaCheckboxProps } from './types';

const restoreCheckboxProps = (
  props: AriaCheckboxProps
): RestoredAriaCheckboxProps => {
  const { isChecked, defaultChecked, ...restProps } = props;

  return {
    isSelected: isChecked,
    defaultSelected: defaultChecked,
    ...restProps,
  };
};

const useCheckbox: typeof useAriaCheckbox = (props, state, ref) => {
  const restoredProps = restoreCheckboxProps(props);
  return useAriaCheckbox(restoredProps, state, ref);
};

const useToggleState = (props: AriaCheckboxProps) => {
  const restoredProps = restoreCheckboxProps(props);
  return useAriaToggleState(restoredProps);
};

export { useCheckbox, useToggleState };
