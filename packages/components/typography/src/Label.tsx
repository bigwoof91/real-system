import React, { forwardRef, useMemo } from 'react';

import { Box, BoxStyleProps } from '@real-system/box-primitive';
import { TextPrimitive } from '@real-system/text-primitive';

import { RequiredDot } from './RequiredDot';
import { CommonTextProps } from './types';

export type LabelProps = {
  children?: React.ReactNode;
  htmlFor?: string;
  as?: 'label' | 'legend';
  disabled?: boolean;
  required?: boolean;
  containerProps?: BoxStyleProps;
  textProps?: BoxStyleProps;
} & CommonTextProps;

const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  {
    children,
    as = 'label',
    disabled,
    required,
    textProps,
    containerProps,
    cursor = 'pointer',
    ...restProps
  },
  ref
) {
  const dynamicStyles = useMemo(
    () => ({
      color: disabled ? 'gray-300' : 'gray-500',
      cursor: disabled ? 'not-allowed' : cursor,
    }),
    [cursor, disabled]
  );

  return (
    <TextPrimitive
      as={as}
      display="block"
      padding={0}
      margin={0}
      marginBottom={2}
      fontSize={1}
      fontWeight={3}
      lineHeight={1}
      color={dynamicStyles.color}
      cursor={dynamicStyles.cursor}
      {...restProps}
      ref={ref}>
      <Box
        as="span"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        {...containerProps}>
        {required ? (
          <RequiredDot disabled={disabled} cursor={dynamicStyles.cursor} />
        ) : null}
        <Box as="span" {...textProps}>
          {children}
        </Box>
      </Box>
    </TextPrimitive>
  );
});

export { Label };
