import React from 'react';

import { HelperText, HelperTextProps } from '@real-system/typography';

import { useFieldControlContext } from './FieldControlContext';

type FieldHelperTextProps = HelperTextProps;

/**
 * Helper text for Fields.
 */
const FieldHelperText = React.forwardRef<HTMLSpanElement, FieldHelperTextProps>(
  function FieldHelperText({ children, errorText, ...restProps }, ref) {
    const { isInvalid } = useFieldControlContext();
    return (
      <HelperText
        errorText={isInvalid ? errorText : ''}
        {...restProps}
        ref={ref}>
        {children}
      </HelperText>
    );
  }
);

export type { FieldHelperTextProps };
export { FieldHelperText };
