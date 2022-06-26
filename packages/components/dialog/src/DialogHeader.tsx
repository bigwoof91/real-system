import React, { forwardRef, useCallback } from 'react';

import { Button } from '@real-system/button';
import type { RealElementPrimitiveProps } from '@real-system/elements-primitive';
import { real } from '@real-system/elements-primitive';
import { Flex } from '@real-system/flex';
import { Icon } from '@real-system/icon';
import { makeTestId } from '@real-system/utils-library';

import { useDialogContext } from './DialogContext';

type DialogHeaderProps = RealElementPrimitiveProps<'div'> & {
  hideCloseButton?: boolean;
};

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader(
    { children, hideCloseButton = false, ...restProps },
    ref
  ) {
    const { onDismiss } = useDialogContext();
    const handleOnClose = useCallback(
      () => (onDismiss ? onDismiss() : undefined),
      [onDismiss]
    );
    return (
      <real.header
        borderBottom="weak"
        margin={0}
        flexShrink={0}
        paddingY={8}
        paddingX={8}
        ref={ref}
        data-testid={makeTestId('dialog-header')}
        {...restProps}>
        <Flex yAlignContent="center" xAlignContent="between" wrap={false}>
          <Flex grow={1} marginRight={12}>
            {children}
          </Flex>
          {hideCloseButton ? null : (
            <Button
              tabIndex={0}
              variant="ghost"
              onClick={handleOnClose}
              data-testid={makeTestId('dialog-close-button')}>
              <Icon icon="x" title="close" />
            </Button>
          )}
        </Flex>
      </real.header>
    );
  }
);

export type { DialogHeaderProps };
export { DialogHeader };
