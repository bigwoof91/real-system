import React, { forwardRef } from 'react';

import { ButtonPrimitive } from '@real-system/button-primitive';
import type { RealSystemComponentProps } from '@real-system/styled-library';
import styled from '@real-system/styled-library';

/**
 * @todo find a better way to merge base styles with Button component API styles i.e. _active style props; boxShadow
 */
const StyledBaseButton = styled(ButtonPrimitive)<RealSystemComponentProps>({
  appearance: 'none',
  color: 'gray-500',
  background: 'none',
  display: 'inline-flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'center',
  border: 1,
  borderRadius: 4,
  transition:
    'background-color 200ms ease-out, box-shadow 200ms ease-in, border-color 200ms ease-in, color 200ms ease-out',
  fontScale: 'button',
  fontFamily: 'body',
  fontWeight: 'button',
  textDecoration: 'none',
  position: 'relative',
  margin: 0,
  cursor: 'pointer',
  _hover: {},
  _focus: { boxShadow: 'focus-outline', outline: 'none' },
  _active: { boxShadow: 'none' },
  _disabled: {},
});

const BaseButton = forwardRef<HTMLButtonElement, RealSystemComponentProps>(
  function BaseButton({ children, ...restProps }, ref) {
    return (
      <StyledBaseButton {...restProps} ref={ref}>
        {children}
      </StyledBaseButton>
    );
  }
);

export { BaseButton };
