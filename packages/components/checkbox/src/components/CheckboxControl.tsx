import React, { useMemo } from 'react';

import type { UseInteractionsReturnValue } from '@real-system/a11y-library';
import { real } from '@real-system/elements-primitive';
import { Icon } from '@real-system/icon';

type CheckboxIconProps = {
  isSelected: boolean;
  isDisabled?: boolean;
  isIndeterminate: boolean | undefined;
};

const CheckboxIcon = ({
  isSelected,
  isDisabled,
  isIndeterminate,
}: CheckboxIconProps) => {
  return (
    <Icon
      icon={isIndeterminate ? 'minus' : 'check'}
      size="xs"
      solid
      color={
        isSelected
          ? isDisabled
            ? 'gray-400'
            : 'blue-500-readable'
          : 'transparent'
      }
    />
  );
};

type CheckboxControlProps = {
  isDisabled?: boolean;
  isSelected: boolean;
  isIndeterminate?: boolean;
  errorText?: string;
} & UseInteractionsReturnValue;

const transition =
  'box-shadow 150ms ease-in, background-color 150ms ease-in, border-color 100ms ease-in';

const getSelectedColor = (isHovered: boolean) =>
  isHovered ? 'blue-600' : 'blue-500';
const getErrorColor = (isHovered: boolean) =>
  isHovered ? 'red-600' : 'red-500';

const CheckboxControl = ({
  isDisabled,
  isSelected,
  isHovered,
  isPressed,
  isFocusedWithin,
  errorText,
  isIndeterminate,
}: CheckboxControlProps) => {
  const backgroundColor = useMemo(() => {
    const defaultColor = 'blue-500-readable';

    if (isDisabled) return 'gray-50';
    if (isSelected) {
      if (errorText) {
        return getErrorColor(isHovered);
      }
      return getSelectedColor(isHovered);
    }
    return defaultColor;
  }, [isDisabled, isSelected, errorText, isHovered]);

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
    <real.span
      width={8}
      height={8}
      marginRight={5}
      borderStyle="solid"
      borderWidth={1}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={4}
      transition={transition}
      boxShadow={!isPressed && isFocusedWithin ? 'focus-outline' : 'none'}>
      <CheckboxIcon
        isSelected={isSelected}
        isDisabled={isDisabled}
        isIndeterminate={isIndeterminate}
      />
    </real.span>
  );
};

export { CheckboxControl };
