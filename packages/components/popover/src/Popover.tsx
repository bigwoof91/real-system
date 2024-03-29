import React, { forwardRef } from 'react';

import type { FlexProps } from '@real-system/flex';
import { Flex } from '@real-system/flex';
import { Icon } from '@real-system/icon';
import type { PopoverPrimitiveProps } from '@real-system/popover-primitive';
import {
  PopoverArrowPrimitive,
  PopoverPrimitive,
} from '@real-system/popover-primitive';
import type { RealSystemElementProps } from '@real-system/styled-library';
import { makeTestId } from '@real-system/utils-library';

import { PopoverButton } from './PopoverButton';
import { PopoverContainer, usePopoverStoreContext } from './PopoverContext';
import { PopoverDescription } from './PopoverDescription';
import { PopoverDismiss } from './PopoverDismiss';
import { PopoverHeading } from './PopoverHeading';

type PopoverProps = Omit<PopoverPrimitiveProps, 'store' | 'as'> &
  RealSystemElementProps<'div'> & {
    hideCloseButton?: boolean;
    hideArrow?: boolean;
  } & Omit<FlexProps, 'as'>;

const StyledPopover = forwardRef<HTMLDivElement, FlexProps>(
  function StyledPopover(props, ref) {
    return (
      <Flex
        maxWidth="45rem"
        {...props}
        vertical
        xAlignContent="left"
        yAlignContent="top"
        border="weak"
        filter="popover"
        borderRadius={4}
        padding={10}
        _focus={{ outline: '0' }}
        bgColor="white"
        zIndex="popover"
        ref={ref}
      />
    );
  }
);

export interface PopoverComponent
  extends React.ForwardRefExoticComponent<PopoverProps> {
  Container: typeof PopoverContainer;
  Dismiss: typeof PopoverDismiss;
  Button: typeof PopoverButton;
  Heading: typeof PopoverHeading;
  Description: typeof PopoverDescription;
}

// @ts-expect-error Popover subcomponent properties are defined on the component object after this is defined
const Popover: PopoverComponent = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    {
      children,
      hideCloseButton,
      hideArrow = false,
      ...restProps
    }: PopoverProps,
    ref
  ) {
    const store = usePopoverStoreContext();
    return (
      <PopoverPrimitive
        store={store}
        data-testid={makeTestId('popover')}
        render={(htmlProps) => <StyledPopover {...htmlProps} {...restProps} />}
        ref={ref}>
        {hideArrow ? null : <PopoverArrowPrimitive store={store} />}
        {!hideCloseButton && (
          <PopoverDismiss
            variant="minimal"
            position="absolute"
            top={5}
            right={5}
            size="sm">
            <Icon icon="x" />
          </PopoverDismiss>
        )}
        {children}
      </PopoverPrimitive>
    );
  }
);

Popover.Button = PopoverButton;
Popover.Container = PopoverContainer;
Popover.Description = PopoverDescription;
Popover.Dismiss = PopoverDismiss;
Popover.Heading = PopoverHeading;

export type { PopoverProps };
export { Popover };
