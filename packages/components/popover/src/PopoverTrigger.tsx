import React, { forwardRef, useCallback, useMemo } from 'react';

import { PopoverDisclosurePrimitive } from '@real-system/popover-primitive';
import { makeTestId } from '@real-system/utils-library';

import { usePopoverStoreContext } from './PopoverContext';

type ConditionalProps =
  | {
      onShow?: (show: () => void) => void;
      onToggle?: never;
      onHide?: (hide: () => void) => void;
      children: React.ReactElement;
    }
  | {
      onShow?: never;
      onToggle?: (toggle: () => void) => void;
      onHide?: never;
      children: React.ReactElement;
    };

type PopoverTriggerProps = ConditionalProps;

/**
 * Similar to `PopoverButton` but allows (and ***requires***) any react element to be passed as a child.
 * This enables consumers to compose any element as a popover trigger.
 */
const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  function PopoverTrigger(
    { children, onShow, onHide, onToggle, ...restProps },
    ref
  ) {
    const { show, toggle, hide, ...restState } = usePopoverStoreContext();
    const handleShow = useCallback(() => {
      if (onShow) return onShow(show);
      show();
    }, [show, onShow]);
    const handleHide = useCallback(() => {
      if (onHide) return onHide(hide);
      hide();
    }, [hide, onHide]);
    const handleToggle = useCallback(() => {
      if (onToggle) return onToggle(toggle);
      toggle();
    }, [toggle, onToggle]);

    const store = {
      ...restState,
      show: handleShow,
      hide: handleHide,
      toggle: handleToggle,
    };

    const disclosure = useMemo(() => children, [children]);

    return (
      <PopoverDisclosurePrimitive
        store={store}
        data-testid={makeTestId('popover-disclosure')}
        render={(htmlProps) =>
          React.cloneElement(disclosure, {
            ...htmlProps,
            ...restProps,
            ...disclosure.props,
          })
        }
        /** @ts-ignore ref will exist on ReactElement */
        ref={ref ?? disclosure.ref}
      />
    );
  }
);

export type { PopoverTriggerProps };
export { PopoverTrigger };
