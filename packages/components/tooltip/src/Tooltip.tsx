import React, { cloneElement, forwardRef, useMemo, useRef } from 'react';

import { animated, useTransition } from '@real-system/animation-library';
import styled from '@real-system/styled-library';
import {
  TooltipAnchorPrimitive,
  TooltipArrowPrimitive,
  TooltipPrimitive,
  useTooltipStatePrimitive,
} from '@real-system/tooltip-primitive';
import { Text } from '@real-system/typography';
import {
  isReactText,
  makeTestId,
  useMergedRef,
} from '@real-system/utils-library';

import { TRANSITIONS_CONFIG } from './constants';
import type { TooltipProps } from './types';

const StyledTooltip = styled(animated('div'))({
  zIndex: 'tooltip',
  pointerEvents: 'none',
  padding: 4,
  py: 3,
  boxShadow: 'tooltip',
  backgroundColor: 'black',
  border: 'border-1',
  borderRadius: 4,
  maxWidth: '30rem',
});

const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  {
    label,
    children,
    placement,
    isDisabled,
    visible,
    hideArrow = false,
    gutter = 2,
    ...restProps
  },
  ref
) {
  const internalRef = useRef<HTMLSpanElement>(null);
  const mergedRef = useMergedRef<HTMLSpanElement>(ref, internalRef);

  const state = useTooltipStatePrimitive({
    placement,
    visible: !isDisabled && visible,
    gutter,
    ...restProps,
  });
  const isVisible = useMemo(
    () => !isDisabled && state.visible,
    [isDisabled, state.visible]
  );
  const transitions = useTransition(isVisible, TRANSITIONS_CONFIG);

  // create the trigger if children is number, text or element
  const trigger = useMemo(() => {
    if (isReactText(children)) {
      return (
        <TooltipAnchorPrimitive as="span" state={state} ref={mergedRef}>
          {children}
        </TooltipAnchorPrimitive>
      );
    }
    // casted type because if it is not ReactText it will be ReactElement
    const Child = children as React.ReactElement;
    return (
      <TooltipAnchorPrimitive
        as="span"
        state={state}
        ref={mergedRef}
        {...Child.props}>
        {(anchorProps) =>
          cloneElement(children as React.ReactElement, anchorProps)
        }
      </TooltipAnchorPrimitive>
    );
  }, [children, state, mergedRef]);

  return (
    <>
      {trigger}
      {transitions(
        (style, item) =>
          item && (
            <TooltipPrimitive
              data-testid={makeTestId('tooltip')}
              {...restProps}
              state={state}
              as={StyledTooltip}
              style={style}>
              {hideArrow ? null : <TooltipArrowPrimitive state={state} />}
              <Text as="span" color="white">
                {label}
              </Text>
            </TooltipPrimitive>
          )
      )}
    </>
  );
});

Tooltip.defaultProps = {
  placement: 'top',
  'data-testid': 'tooltip',
};

export type { TooltipProps };
export { Tooltip };
