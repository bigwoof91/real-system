import React, { forwardRef, useMemo } from 'react';

import { real } from '@real-system/elements-primitive';
import styled, { useTokens } from '@real-system/styled-library';

import { ICON_SIZE_MAP } from './constants';
import { OutlineIcons, SolidIcons } from './icons';
import type { IconProps, Icons, InternalIconProps } from './types';

const StyledIcon = styled(({ Icon, ...restProps }: InternalIconProps) => {
  return <Icon {...(restProps as any)} />;
})<InternalIconProps>({
  height: ({ size }) => size,
  width: ({ size }) => size,
  color: ({ color }) => color,
});

/**
 * @todo make reusable fn in theme?
 */
const maybeOrange = (colorScheme: IconProps['colorScheme']) =>
  colorScheme === 'orange' ? '600' : '500';

/**
 * @todo add a11y props and functionality
 */
const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { size = 'sm', icon, solid = false, title = icon, colorScheme, ...restProps },
  ref
) {
  const Icon = useMemo(
    () => (solid ? SolidIcons[icon] : OutlineIcons[icon]),
    [icon, solid]
  );
  // eslint-disable-next-line prefer-const
  let [iconSize, iconColor] = useTokens(
    ['sizes', ICON_SIZE_MAP[size]],
    ['colors', `${colorScheme || 'gray'}-${maybeOrange(colorScheme)}`]
  );

  if (colorScheme === undefined) {
    if (!restProps.color) {
      iconColor = 'currentColor';
    } else {
      iconColor = restProps.color;
    }
  }

  return (
    <real.span
      display="flex"
      flexShrink={0}
      flexGrow={0}
      width={iconSize}
      height={iconSize}
      title={title}
      {...restProps}
      ref={ref}>
      <StyledIcon Icon={Icon} size={iconSize} color={iconColor} />
    </real.span>
  );
});

export { Icon };
export type { IconProps, Icons };
