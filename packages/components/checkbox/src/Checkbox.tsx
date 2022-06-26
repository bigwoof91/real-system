import React, { forwardRef, useRef } from 'react';

import {
  useCheckbox,
  useInteractions,
  useToggleState,
} from '@real-system/a11y-library';
import { useMergedRef } from '@real-system/utils-library';
import { VisuallyHidden } from '@real-system/visually-hidden';

import { CheckboxControl, CheckboxLabel, CheckboxWrapper } from './components';
import { CheckboxProps } from './types';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  props,
  ref
) {
  const interactionProps = useInteractions({ isDisabled: props.isDisabled });
  const state = useToggleState(props);
  const internalRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRef(internalRef, ref);

  const { inputProps } = useCheckbox(
    props,
    state,
    mergedRef as React.RefObject<HTMLInputElement>
  );

  const { errorText, helperText } = props;
  const isDisabled = props.isDisabled || props.isReadOnly;

  return (
    <CheckboxWrapper
      isDisabled={isDisabled}
      helperText={helperText}
      errorText={errorText}
      {...interactionProps}>
      <VisuallyHidden as="div">
        <input {...inputProps} ref={mergedRef} />
      </VisuallyHidden>
      <CheckboxControl
        isDisabled={isDisabled}
        isSelected={state.isSelected}
        isIndeterminate={props.isIndeterminate}
        errorText={errorText}
        {...interactionProps}
      />
      <CheckboxLabel isDisabled={isDisabled} isRequired={props.isRequired}>
        {props.children}
      </CheckboxLabel>
    </CheckboxWrapper>
  );
});

export type { CheckboxProps };
export { Checkbox };
