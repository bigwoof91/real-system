import React, { forwardRef, useMemo, useRef } from 'react';

import type { AriaCheckboxGroupItemProps } from '@real-system/a11y-library';
import {
  useCheckboxGroupItem,
  useInteractions,
} from '@real-system/a11y-library';
import type { FlexProps } from '@real-system/flex';
import { useMergeRefs } from '@real-system/utils-library';
import { VisuallyHidden } from '@real-system/visually-hidden';

import { useCheckboxGroupContext } from './Checkbox.context';
import type { CustomProps } from './Checkbox.model';
import { CheckboxControl, CheckboxLabel, CheckboxWrapper } from './components';

type CheckboxGroupItemProps = AriaCheckboxGroupItemProps & CustomProps;

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
    const { children, helpText, value, disabled: disabledProp } = props;

    const interactionProps = useInteractions({ disabled: disabledProp });
    const { canSelectAll, hasError, orientation, state } =
      useCheckboxGroupContext();
    const internalRef = useRef<HTMLInputElement>(null);
    const mergeRefs = useMergeRefs(internalRef, ref);
    const { inputProps } = useCheckboxGroupItem(props, state, internalRef);
    const disabled = state.isDisabled || props.disabled;
    const isSelected = state.isSelected(value);

    const dynamicStyles = useMemo((): FlexProps => {
      const maybeCanSelectAll = canSelectAll ? canSelectAllStyles : {};

      if (orientation === 'vertical') {
        return {
          ...maybeCanSelectAll,
          _notLast: { marginBottom: 5 },
          _notFirst: { marginLeft: canSelectAll ? 11 : 4 },
        };
      }
      return {
        ...maybeCanSelectAll,
        _notLast: { marginRight: 5 },
      };
    }, [orientation, canSelectAll]);

    return (
      <CheckboxWrapper
        disabled={disabled}
        helpText={helpText}
        marginLeft={4}
        {...dynamicStyles}
        {...interactionProps}>
        <VisuallyHidden>
          <input {...inputProps} ref={mergeRefs} />
        </VisuallyHidden>
        <CheckboxControl
          disabled={disabled}
          isSelected={isSelected}
          indeterminate={props.indeterminate}
          isInvalid={hasError}
          {...interactionProps}
        />
        <CheckboxLabel disabled={disabled}>{children}</CheckboxLabel>
      </CheckboxWrapper>
    );
  }
);

export type { CheckboxGroupItemProps };
export { CheckboxGroupItem };
