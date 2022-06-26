import * as React from 'react';

import type {
  ColorSchemes,
  RealSystemComponentProps,
  ThemeSizes,
} from '@real-system/styled-library';
import type { OmitAndJoinProps } from '@real-system/utils-library';

type ButtonVariants = 'outline' | 'fill' | 'ghost' | 'floating';
type ButtonSize = Extract<ThemeSizes, 'sm' | 'md' | 'lg'>;

type RealSystemButtonProps = RealSystemComponentProps<'button'>;
type CustomButtonProps = {
  /** If `true`, the button will be disabled. */
  isDisabled?: boolean;
  /** sets the isLoading state of the buttons */
  isLoading?: boolean;
  /** If true, the button will show a spinner. Will not apply a spinner to `floating` button variant. */
  leadingIcon?: React.ReactElement;
  /** inserts a trailing icon */
  trailingIcon?: React.ReactElement;
  /** controls button variant */
  variant?: ButtonVariants;
  /** controls the size of the button */
  size?: ButtonSize;
  /** sets color scheme of the button; color scheme is dictated by the `palette` which dictates the `theme` object from `ThemeProvider` */
  colorScheme?: ColorSchemes;
};

type ButtonProps = OmitAndJoinProps<RealSystemButtonProps, CustomButtonProps>;

export type { ButtonProps, ButtonSize, ButtonVariants };
