import React, { forwardRef } from 'react';

import type { UseInteractionsReturnValue } from '@real-system/a11y-library';
import type { FlexProps } from '@real-system/flex';
import { Flex } from '@real-system/flex';
import { HelperText, Label } from '@real-system/typography';

type CheckboxWrapperProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  helperText?: string;
  errorText?: string;
} & UseInteractionsReturnValue;

const CheckboxWrapper = forwardRef<
  HTMLLabelElement,
  CheckboxWrapperProps & FlexProps
>(function CheckboxWrapper(
  {
    children,
    isDisabled,
    hoverProps,
    pressProps,
    focusWithinProps,
    helperText,
    errorText,
    ...restProps
  },
  ref
) {
  return (
    <Flex inline vertical {...restProps}>
      <Label
        display="inline-flex"
        ref={ref}
        isDisabled={isDisabled}
        {...hoverProps}
        {...pressProps}
        {...focusWithinProps}>
        <Flex as="span" xAlignContent="center" yAlignContent="center">
          {children}
        </Flex>
      </Label>
      {(helperText || errorText) && (
        <HelperText marginTop={2} marginLeft={14} errorText={errorText}>
          {helperText}
        </HelperText>
      )}
    </Flex>
  );
});

export { CheckboxWrapper };
