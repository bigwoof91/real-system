import React, { useCallback, useMemo } from 'react';

import { UseInteractionsReturnValue } from '@real-system/a11y-library';
import { real } from '@real-system/elements-primitive';
import { Flex } from '@real-system/flex';

type RadioControlProps = {
  isDisabled?: boolean;
  isSelected: boolean;
  errorText?: string;
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
  errorText,
}: RadioControlProps) => {
  const backgroundColor = useCallback(
    (isDot = false) => {
      const defaultColor = 'blue-500-readable';

      if (isDisabled) return 'gray-50';
      if (isSelected && !isDot) {
        if (errorText) {
          return getErrorColor(isHovered);
        }
        return getSelectedColor(isHovered);
      }
      return defaultColor;
    },
    [isDisabled, isSelected, errorText, isHovered]
  );

  const borderColor = useMemo(() => {
    const defaultColor = isHovered ? 'gray-300' : 'gray-200';

    if (isDisabled) return 'gray-200';
    if (errorText) {
      return getErrorColor(isHovered);
    }
    if (isSelected) {
      return getSelectedColor(isHovered);
    }
    if (isFocusedWithin) {
      return 'gray-200';
    }

    return defaultColor;
  }, [isHovered, isDisabled, errorText, isSelected, isFocusedWithin]);

  return (
    <Flex
      as="span"
      shrink={0}
      xAlignContent="center"
      yAlignContent="center"
      width={8}
      height={8}
      marginRight={4}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={borderColor}
      borderRadius="circle"
      boxShadow={!isPressed && isFocusedWithin ? 'focus-outline' : 'none'}
      backgroundColor={backgroundColor()}
      transition={transition}>
      <real.span
        width={3}
        height={3}
        borderRadius="circle"
        backgroundColor={backgroundColor(true)}
      />
    </Flex>
  );
};

export { RadioControl };
