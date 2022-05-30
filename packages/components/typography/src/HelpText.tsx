import React, { forwardRef, useMemo } from 'react';

import { Icon } from '@real-system/icon';
import type {
  ColorSchemes,
  ColorTokens,
  ThemeStatuses,
} from '@real-system/styled-library';

import { BaseText } from './BaseText';
import type { CommonTextProps } from './types';

type HelpTextStatus = Extract<ThemeStatuses, 'danger'>;
export type HelpTextProps = {
  as?: Extract<keyof JSX.IntrinsicElements, 'span' | 'div'>;
  children?: React.ReactNode;
  id?: string;
  status?: HelpTextStatus;
  hideErrorIcon?: boolean;
  errorText?: string;
} & CommonTextProps;

const LABEL_COLORS: Partial<Record<ColorSchemes, ColorTokens>> = {
  red: 'red-500',
  gray: 'gray-500',
};

const HelpText = forwardRef<HTMLSpanElement, HelpTextProps>(function HelpText(
  {
    children,
    as = 'span',
    hideErrorIcon = false,
    errorText,
    status: statusProp = undefined,
    ...restProps
  },
  ref
) {
  const colorScheme = useMemo(
    () => (errorText ? 'red' : statusProp ? 'red' : 'gray'),
    [errorText, statusProp]
  );

  return (
    <BaseText
      as={as}
      display="flex"
      alignItems="center"
      padding={0}
      margin={0}
      marginTop={2}
      fontScale="help"
      fontWeight="help"
      color={LABEL_COLORS[colorScheme]}
      {...restProps}
      ref={ref}>
      {!hideErrorIcon && errorText && (
        <div>
          <Icon
            icon="exclamation-circle"
            solid
            colorScheme={colorScheme}
            marginRight={2}
          />
        </div>
      )}
      <span>{errorText ? errorText : children}</span>
    </BaseText>
  );
});

export { HelpText };
