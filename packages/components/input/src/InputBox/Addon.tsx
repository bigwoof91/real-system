import React, { useMemo } from 'react';

import type { RealElementPrimitiveProps } from '@real-system/elements-primitive';
import { real } from '@real-system/elements-primitive';
import type { StylishProps } from '@real-system/styled-library';
import { makeTestId } from '@real-system/utils-library';

const makePositionalStyles = (isSuffix = false) => {
  let styles: StylishProps = {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderRight: 1,
  };
  if (isSuffix) {
    styles = {
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
      borderLeft: 1,
    };
  }
  return styles;
};

const makeColorStyles = (isDisabled = false) => {
  const styles = {
    backgroundColor: 'gray-50',
    borderColor: 'gray-100',
  };
  if (isDisabled) {
    styles.backgroundColor = 'none';
  }
  return styles;
};

export type AddonProps = {
  children: NonNullable<React.ReactNode>;
  isDisabled?: boolean;
  isSuffix?: boolean;
} & RealElementPrimitiveProps<'div'>;

const Addon = React.forwardRef<HTMLDivElement, AddonProps>(function Addon(
  { children, isDisabled, isSuffix = false, ...restProps },
  ref
) {
  const colorStyles = useMemo(() => makeColorStyles(isDisabled), [isDisabled]);
  const positionalStyles = useMemo(
    () => makePositionalStyles(isSuffix),
    [isSuffix]
  );

  if (children == null) return null;

  return (
    <real.div
      data-testid={makeTestId('input-box-addon')}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="auto"
      paddingX={4}
      {...positionalStyles}
      {...colorStyles}
      {...restProps}
      ref={ref}>
      {children}
    </real.div>
  );
});

export { Addon };
