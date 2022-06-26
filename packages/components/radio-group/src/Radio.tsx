import React, { useRef } from 'react';
import { forwardRef } from 'react';

import { useInteractions, useRadio } from '@real-system/a11y-library';
import { Flex } from '@real-system/flex';
import { Label } from '@real-system/typography';
import { useMergedRef } from '@real-system/utils-library';
import { VisuallyHidden } from '@real-system/visually-hidden';

import { useRadioGroupContext } from './RadioContext';
import { RadioControl } from './RadioControl';
import { RadioLabel } from './RadioLabel';
import { RadioProps } from './types';

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  props,
  ref
) {
  const { value, isDisabled, children } = props;
  const state = useRadioGroupContext();
  const internalRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRef(internalRef, ref);
  const { inputProps } = useRadio(
    props,
    state,
    mergedRef as React.RefObject<HTMLInputElement>
  );
  const { hoverProps, pressProps, focusWithinProps, ...restInteractions } =
    useInteractions({ isDisabled });

  const isSelected = state.selectedValue === value;
  const isVertical = state.orientation === 'vertical' ? true : false;

  return (
    <Label
      display="inline-flex"
      isDisabled={isDisabled}
      mb={2}
      _notLast={isVertical ? { marginBottom: 5 } : { marginRight: 5 }}
      {...hoverProps}
      {...pressProps}
      {...focusWithinProps}>
      <Flex as="span" xAlignContent="center" yAlignContent="center">
        <VisuallyHidden>
          <input {...inputProps} ref={mergedRef} />
        </VisuallyHidden>
        <RadioControl
          errorText={state.errorText}
          isDisabled={isDisabled}
          isSelected={isSelected}
          {...restInteractions}
        />
        <RadioLabel isDisabled={isDisabled}>{children}</RadioLabel>
      </Flex>
    </Label>
  );
});

export type { RadioProps };
export { Radio };
