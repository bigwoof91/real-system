import React, { forwardRef } from 'react';

import type { SelectItemPrimitiveProps } from '@real-system/select-primitive';
import { SelectItemPrimitive } from '@real-system/select-primitive';
import styled from '@real-system/styled-library';

import { OmitSelectPrivateProps } from './types';

type SelectItemProps = OmitSelectPrivateProps<SelectItemPrimitiveProps> & {
  isDisabled?: boolean;
};

const StyledItem = styled(SelectItemPrimitive)<SelectItemPrimitiveProps>({});

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem({ isDisabled, ...restProps }, ref) {
    return (
      <StyledItem
        outline="none"
        display="flex"
        scrollMargin={4}
        alignItems="center"
        gap={4}
        paddingX={7}
        paddingY={5}
        color="gray-500"
        fontScale="select-item"
        fontWeight="select-item"
        cursor="pointer"
        disabled={isDisabled}
        _hover={{ bgColor: 'gray-50' }}
        _focus={{ bgColor: 'gray-50', color: 'gray-600' }}
        _focusVisible={{ bgColor: 'gray-50', color: 'gray-600' }}
        _active={{ bgColor: 'gray-100', color: 'gray-700' }}
        _disabled={{ backgroundColor: 'none', color: 'gray-300' }}
        {...restProps}
        ref={ref}
      />
    );
  }
);

export type { SelectItemProps };
export { SelectItem };
