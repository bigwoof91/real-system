import { useRadioGroup as useAriaRadioGroup } from '@react-aria/radio';
import { useRadioGroupState as useAriaRadioGroupState } from '@react-stately/radio';

const useRadioGroupState: typeof useAriaRadioGroupState = (props) => {
  return useAriaRadioGroupState(props);
};

const useRadioGroup: typeof useAriaRadioGroup = (props, state) => {
  return useAriaRadioGroup(props, state);
};

export { useRadioGroup, useRadioGroupState };
