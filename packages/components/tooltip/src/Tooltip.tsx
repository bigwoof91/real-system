import React, { cloneElement, forwardRef, useMemo, useRef } from 'react';

import {
  useOverlayPosition,
  useTooltip,
  useTooltipTrigger,
  useTooltipTriggerState,
} from '@real-system/a11y-library';
import { useTransition } from '@real-system/animation-library';
import { Typography } from '@real-system/typography';
import {
  isReactText,
  makeTestId,
  useMergedRef,
} from '@real-system/utils-library';

import { TooltipPopup } from './components';
import { TRANSITIONS_CONFIG } from './constants';
import type { TooltipProps } from './types';

const Tooltip = forwardRef<HTMLElement, TooltipProps>(function Tooltip(
  {
    label,
    children,
    placement,
    'data-testid': dataTestid = 'tooltip',
    ...restProps
  },
  ref
) {
  const state = useTooltipTriggerState(restProps);
  const transitions = useTransition(state.isOpen, TRANSITIONS_CONFIG);

  const internalRef = useRef<HTMLElement>(null);
  const mergedRef = useMergedRef<HTMLElement>(ref, internalRef);
  const tipRef = useRef<HTMLElement>(null);

  // get overlay position props
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: mergedRef as React.RefObject<HTMLElement>,
    overlayRef: tipRef,
    placement: placement || 'top',
    offset: 5,
    isOpen: state.isOpen,
  });
  // Get props for the trigger and tooltip
  const { triggerProps, tooltipProps: tooltipPropsFromTrigger } =
    useTooltipTrigger(
      restProps,
      state,
      mergedRef as React.RefObject<HTMLElement>
    );
  const { tooltipProps } = useTooltip(tooltipPropsFromTrigger, state);

  // create the trigger if children is number, text or element
  const trigger = useMemo(() => {
    if (isReactText(children)) {
      return (
        <span {...triggerProps} ref={mergedRef}>
          {children}
        </span>
      );
    }
    return cloneElement(children as React.ReactElement, {
      ...triggerProps,
      ref: mergedRef,
    });
  }, [children, triggerProps, mergedRef]);

  return (
    <>
      {trigger}
      {transitions(
        (styles, isVisible) =>
          isVisible && (
            <TooltipPopup
              data-testid={makeTestId(dataTestid)}
              {...tooltipProps}
              {...positionProps}
              ref={tipRef}
              style={{ ...styles, ...positionProps.style }}>
              <Typography as="span" color="color-background-light">
                {label}
              </Typography>
            </TooltipPopup>
          )
      )}
    </>
  );
});

Tooltip.defaultProps = {
  delay: 50,
  placement: 'top',
};

export type { TooltipProps };
export { Tooltip };
