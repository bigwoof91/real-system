import type { RealElementPrimitiveProps } from '@real-system/elements-primitive';
import type { ColorSchemes, ThemeSizes } from '@real-system/styled-library';

type BadgeSize = Extract<ThemeSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

type BadgeProps = {
  colorScheme?: ColorSchemes;
  /** Sets badge to a standard size. Use `fontSize` prop for more granular control over size of the badge */
  size?: BadgeSize;
} & Omit<RealElementPrimitiveProps<'span'>, 'size'>;

export type { BadgeProps, BadgeSize };
