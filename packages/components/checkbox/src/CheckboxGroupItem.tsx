import React, { forwardRef, useMemo, useRef } from 'react';

import {
  useCheckboxGroupItem,
  useInteractions,
} from '@real-system/a11y-library';
import type { FlexProps } from '@real-system/flex';
import { useMergedRef } from '@real-system/utils-library';
import { VisuallyHidden } from '@real-system/visually-hidden';

import { useCheckboxGroupContext } from './CheckboxContext';
import { CheckboxControl, CheckboxLabel, CheckboxWrapper } from './components';
import { CheckboxGroupItemProps } from './types';

const canSelectAllStyles = {
  _first: {
    paddingY: 2,
    paddingX: 3,
    borderRadius: 3,
    backgroundColor: 'blue-50',
  },
};

const CheckboxGroupItem = forwardRef<HTMLInputElement, CheckboxGroupItemProps>(
  function CheckboxGroupItem(props, ref) {
    const { children, helperText, value, isDisabled } = props;

    const interactionProps = useInteractions({ isDisabled });
    const state = useCheckboxGroupContext();
    const internalRef = useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRef(internalRef, ref);
    const { inputProps } = useCheckboxGroupItem(
      props,
      state,
      mergedRef as React.RefObject<HTMLInputElement>
    );
    const isDefinitelyDisabled =
      state.isDisabled ||
      props.isDisabled ||
      state.isReadOnly ||
      props.isReadOnly;
    const isSelected = state.isSelected(value);

    const dynamicStyles = useMemo((): FlexProps => {
      const maybeCanSelectAll = state.canSelectAll ? canSelectAllStyles : {};

      if (state.orientation === 'vertical') {
        return {
          ...maybeCanSelectAll,
          _notLast: { marginBottom: 5 },
          _notFirst: { marginLeft: state.canSelectAll ? 11 : 4 },
        };
      }
      return {
        ...maybeCanSelectAll,
        _notLast: { marginRight: 5 },
      };
    }, [state.orientation, state.canSelectAll]);

    return (
      <CheckboxWrapper
        isDisabled={isDefinitelyDisabled}
        helperText={helperText}
        marginLeft={4}
        {...dynamicStyles}
        {...interactionProps}>
        <VisuallyHidden as="div">
          <input {...inputProps} ref={mergedRef} />
        </VisuallyHidden>
        <CheckboxControl
          isDisabled={isDefinitelyDisabled}
          isSelected={isSelected}
          isIndeterminate={props.isIndeterminate}
          errorText={state.errorText}
          {...interactionProps}
        />
        <CheckboxLabel isDisabled={isDefinitelyDisabled}>
          {children}
        </CheckboxLabel>
      </CheckboxWrapper>
    );
  }
);

export type { CheckboxGroupItemProps };
export { CheckboxGroupItem };
