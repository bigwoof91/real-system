import * as React from 'react';

import { DisclosureContentPrimitive } from '@real-system/disclosure-primitive';
import { real } from '@real-system/elements-primitive';
import type {
  RealSystemComponentProps,
  StylishProps,
} from '@real-system/styled-library';
import { useSafeMeasure } from '@real-system/utils-library';

import { useDisclosureContext } from './DisclosureContext';

const defaultStyles: StylishProps = {
  position: 'relative',
  boxSizing: 'border-box',
  overflow: 'hidden',
  borderBottom: '1px solid',
  borderColor: 'transparent',
  height: 0,
  transition: 'height .25s ease, border-color .25s ease',
};

const containedStyles: StylishProps = {
  ...defaultStyles,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderTopWidth: 0,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
};

type DisclosureContentProps = RealSystemComponentProps<'div'>;

const DisclosureContent = React.forwardRef<
  HTMLDivElement,
  DisclosureContentProps
>(function DisclosureContent({ children, ...restProps }, ref) {
  const { contained, state } = useDisclosureContext();
  const [measureRef, { blockSize }] = useSafeMeasure();

  const transitionStyles = React.useMemo(() => {
    return {
      _enter: {
        height: `${blockSize}px`,
        borderColor: 'gray-100',
      },
      _leave: { height: 0, borderColor: 'transparent' },
    };
  }, [blockSize]);

  return (
    <DisclosureContentPrimitive
      ref={ref}
      as={real.div}
      overflow="hidden"
      {...(contained ? containedStyles : defaultStyles)}
      {...transitionStyles}
      state={state}>
      <real.div
        py={6}
        px={6}
        fontScale="body"
        color="gray-800"
        {...restProps}
        ref={measureRef}>
        {children}
      </real.div>
    </DisclosureContentPrimitive>
  );
});

export type { DisclosureContentProps };
export { DisclosureContent };
