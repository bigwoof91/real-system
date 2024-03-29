import React, { useCallback, useMemo } from 'react';

import type { UseInteractionsReturnValue } from '@real-system/a11y-library';
import { real } from '@real-system/elements-primitive';
import { Flex } from '@real-system/flex';

type RadioControlProps = {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isSelected: boolean;
} & Pick<
  UseInteractionsReturnValue,
  'isPressed' | 'isFocusedWithin' | 'isHovered'
>;

/** @todo standardize transitions */
const transition =
  'box-shadow 150ms ease-in, background-color 150ms ease-in, border-color 100ms ease-in';

const getSelectedColor = (isHovered: boolean) =>
  isHovered ? 'blue-600' : 'blue-500';
const getErrorColor = (isHovered: boolean) =>
  isHovered ? 'red-600' : 'red-500';

const RadioControl = ({
  isDisabled,
  isSelected,
  isHovered,
  isPressed,
  isFocusedWithin,
  isInvalid,
}: RadioControlProps) => {
  const backgroundColor = useCallback(
    (isDot = false) => {
      const defaultColor = 'blue-500-readable';

      if (isDisabled) return 'gray-50';
      if (isSelected && !isDot) {
        const selectedColor = getSelectedColor(isHovered);

        if (isInvalid) {
          return getErrorColor(isHovered);
        }

        return selectedColor;
      }
      return defaultColor;
    },
    [isDisabled, isSelected, isInvalid, isHovered]
  );

  const borderColor = useMemo(() => {
    const defaultColor = isHovered ? 'gray-300' : 'gray-200';

    if (isDisabled) return 'gray-200';
    if (isInvalid) {
      return getErrorColor(isHovered);
    }
    if (isSelected) {
      return getSelectedColor(isHovered);
    }
    if (isFocusedWithin) {
      return 'gray-200';
    }

    return defaultColor;
  }, [isHovered, isDisabled, isInvalid, isSelected, isFocusedWithin]);

  return (
    <Flex
      as="span"
      shrink={0}
      xAlignContent="center"
      yAlignContent="center"
      width={9}
      height={9}
      marginRight={4}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={borderColor}
      borderRadius="circle"
      boxShadow={!isPressed && isFocusedWithin ? 'focus-outline' : 'none'}
      backgroundColor={backgroundColor()}
      transition={transition}>
      <real.span
        width={4}
        height={4}
        borderRadius="circle"
        backgroundColor={backgroundColor(true)}
      />
    </Flex>
  );
};

export { RadioControl };
