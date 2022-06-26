import { useRadio as useAriaRadio } from '@react-aria/radio';

const useRadio: typeof useAriaRadio = (props, state, ref) => {
  return useAriaRadio(props, state, ref as React.RefObject<HTMLInputElement>);
};

export { useRadio };
