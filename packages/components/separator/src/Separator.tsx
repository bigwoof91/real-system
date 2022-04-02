import * as React from 'react';

import {
  AriakitSeparator,
  AriakitSeparatorProps,
} from '@real-system/ariakit-library';
import { boxAs, BoxStyleProps } from '@real-system/box-primitive';
import type { BorderProps, StylishProps } from '@real-system/styling-library';
import { makeTestId, RealSystemElementProps } from '@real-system/utils-library';

type SeparatorProps = Pick<AriakitSeparatorProps, 'orientation'> &
  RealSystemElementProps &
  Omit<BoxStyleProps, keyof BorderProps> & {
    /**
     * Controls the width of the separator (`borderWidth` CSS property) — intelligently applies the border width to the correct border e.g. `borderLeftWidth` or `borderBottomWidth`
     *
     */
    borderWidth?: BoxStyleProps['borderWidth'];
    /**
     * Controls the style of the separator ('borderStyle' CSS property)
     */
    borderStyle?: BoxStyleProps['borderStyle'];
    /**
     * Controls the color of the separator ('borderColor' CSS property)
     */
    borderColor?: BoxStyleProps['borderStyle'];
  };

const BoxAsHR = boxAs('hr');

type DividerStyles = {
  vertical: StylishProps;
  horizontal: StylishProps;
};

const makeDividerStyles = ({
  borderColor,
  borderWidth,
  borderStyle,
}: SeparatorProps): DividerStyles => ({
  vertical: {
    borderLeftWidth: borderWidth || '1px',
    width: 0,
    height: '100%',
    borderStyle,
    borderColor,
  },
  horizontal: {
    borderBottomWidth: borderWidth || '1px',
    width: '100%',
    height: 0,
    borderStyle,
    borderColor,
  },
});

/**
 * Layout component used to visually separate content in a list or group.
 * It renders the semantic `hr` HTML element by default and leverages borders
 * to display a horizontal or vertical line.
 * */
const Separator = React.forwardRef<HTMLElement, SeparatorProps>(
  function Separator(
    {
      orientation = 'horizontal',
      borderColor = 'inherit',
      borderWidth = '1px',
      borderStyle = 'solid',
      ...restProps
    },
    ref
  ) {
    const dividerStyles = makeDividerStyles({
      borderColor,
      borderWidth,
      borderStyle,
    });

    return (
      <AriakitSeparator
        as={BoxAsHR}
        data-testid={makeTestId('separator')}
        borderWidth={0}
        {...dividerStyles[orientation]}
        {...restProps}
        ref={ref}
      />
    );
  }
);

export type { SeparatorProps };
export { Separator };
