import React, { forwardRef } from 'react';

import type { StyledComponent } from '@real-system/styling';
import styled from '@real-system/styling';
import { makeTestId } from '@real-system/utils';

import { getPseudoStyles } from './styleFunctions';
import { composeBoxStyleProps } from './styleProps';
import type { BoxProps } from './types';

/**
 * `Box` primitive component. Used to create all block-level styles and elements in Real System.
 */
const StyledBox = styled.div<BoxProps>(
  { boxSizing: 'border-box' },
  composeBoxStyleProps(),
  getPseudoStyles
) as StyledComponent<
  Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    'color'
  >,
  BoxProps,
  Record<string, unknown>
>;

const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { children, ...props },
  ref
) {
  return (
    <StyledBox ref={ref} {...props}>
      {children}
    </StyledBox>
  );
});

Box.defaultProps = { 'data-testid': makeTestId('box') };

type ElTag = keyof JSX.IntrinsicElements | React.ComponentType<any>;

function BoxAs<T = Record<string | number, any>>(elTag: ElTag) {
  return forwardRef<HTMLElement, BoxProps & T>(function BoxAsComponent(
    props,
    ref
  ): React.ReactElement {
    return (
      <Box as={elTag} data-testid={makeTestId('box-as')} ref={ref} {...props} />
    );
  });
}

export { Box, BoxAs };
