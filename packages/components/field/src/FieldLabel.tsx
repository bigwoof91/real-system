import React, { forwardRef } from 'react';

import { Label, LabelProps } from '@real-system/typography';

import { useFieldControlContext } from './FieldControlContext';
import type { FieldProps } from './types';

type FieldLabelProps = LabelProps;

/**
 * @description A label component for Fields.
 */
const FieldLabel = forwardRef<HTMLLabelElement, FieldProps>(function FieldLabel(
  { children, htmlFor, isRequired: isRequiredProp, ...restProps },
  ref
) {
  const { isRequired } = useFieldControlContext();
  return (
    <Label
      htmlFor={htmlFor}
      isRequired={isRequiredProp || isRequired}
      whiteSpace="nowrap"
      {...restProps}
      ref={ref}>
      {children}
    </Label>
  );
});

export type { FieldLabelProps };
export { FieldLabel };
