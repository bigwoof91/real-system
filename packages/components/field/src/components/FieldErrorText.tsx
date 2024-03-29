import React from 'react';

import type { HelpTextProps } from '@real-system/typography';
import { Text } from '@real-system/typography';
import { makeTestId } from '@real-system/utils-library';

import { useFieldControl } from '../FieldControl';

type FieldErrorTextProps = Omit<HelpTextProps, 'hideIcon'>;

/**
 * @name Field.ErrorText
 * @description A modified `Text.Help` for `Field` components.
 */
const FieldErrorText = React.forwardRef<HTMLSpanElement, FieldErrorTextProps>(
  function FieldErrorText({ children, ...restProps }, ref) {
    const { hasError, errorMessage } = useFieldControl();

    if (!hasError) return null;

    return (
      <Text.Help
        data-testid={makeTestId('field-error-text')}
        variant="danger"
        {...restProps}
        ref={ref}>
        {errorMessage || children}
      </Text.Help>
    );
  }
);

export type { FieldErrorTextProps };
export { FieldErrorText };
