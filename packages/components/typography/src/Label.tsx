import React, { forwardRef, useMemo } from 'react';

import { real } from '@real-system/elements-primitive';
import type { StylishProps } from '@real-system/styled-library';

import { BaseText } from './BaseText';
import { RequiredDot } from './RequiredDot';
import type { CommonTextProps } from './types';

export type LabelProps = {
  children?: React.ReactNode;
  htmlFor?: string;
  as?: 'label' | 'legend';
  isDisabled?: boolean;
  isRequired?: boolean;
  containerProps?: StylishProps;
  textProps?: StylishProps;
} & CommonTextProps;

const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  {
    children,
    as = 'label',
    isDisabled,
    isRequired,
    textProps,
    containerProps,
    cursor = 'pointer',
    ...restProps
  },
  ref
) {
  const dynamicStyles = useMemo(
    () => ({
      color: isDisabled ? 'gray-300' : 'gray-500',
      cursor: isDisabled ? 'default' : cursor,
    }),
    [cursor, isDisabled]
  );

  return (
    <BaseText
      as={as}
      display="block"
      padding={0}
      margin={0}
      fontScale="label"
      fontWeight="label"
      color={dynamicStyles.color}
      cursor={dynamicStyles.cursor}
      {...restProps}
      ref={ref}>
      <real.span
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        {...containerProps}>
        {isRequired ? (
          <RequiredDot isDisabled={isDisabled} cursor={dynamicStyles.cursor} />
        ) : null}
        <real.span {...textProps}>{children}</real.span>
      </real.span>
    </BaseText>
  );
});

export { Label };
