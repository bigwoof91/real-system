import React, { forwardRef, useCallback } from 'react';

import type { ButtonProps } from '@real-system/button';
import { Button } from '@real-system/button';
import { PopoverDismissPrimitive } from '@real-system/popover-primitive';
import { makeTestId } from '@real-system/utils-library';

import { usePopoverStoreContext } from './PopoverContext';

type PopoverDismissProps = Partial<Omit<ButtonProps, 'onClick' | 'as'>> & {
  /** Override the `PopoverDismiss` `onClick` callback. If used, you will have
   * to close the popover yourself with the `hide` callback provided by `onClick`
   * or with your own controlled state. */
  onClick?: (hide: () => void) => void;
};

const PopoverDismiss = forwardRef<HTMLButtonElement, PopoverDismissProps>(
  function PopoverDismiss({ children, onClick, ...restProps }, ref) {
    const { hide, ...restState } = usePopoverStoreContext();
    const handleHide = useCallback(() => {
      if (onClick) return onClick(hide);
      hide();
    }, [onClick, hide]);

    const store = {
      hide: handleHide,
      ...restState,
    };

    return (
      <PopoverDismissPrimitive
        store={store}
        render={(htmlProps) => <Button {...htmlProps} {...restProps} />}
        data-testid={makeTestId('popover-dismiss')}
        ref={ref}>
        {children}
      </PopoverDismissPrimitive>
    );
  }
);

export type { PopoverDismissProps };
export { PopoverDismiss };
