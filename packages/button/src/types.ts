import React from 'react';

import { BoxStyleProps } from '@real-system/box';
import { SpaceProps } from '@real-system/styling';

import { PaletteIntents } from '../../theme/src/palettes/types';

export type ButtonSizes = 'small' | 'default';
export type ButtonVariants = 'primary' | 'secondary' | 'ghost';
export type ButtonIntents =
  | 'default'
  | Extract<PaletteIntents, 'danger' | 'neutral'>;
export type ButtonStates = 'disabled' | 'loading' | 'default';
export type ButtonTabIndexes = 0 | -1;
type ButtonTypes = 'submit' | 'button' | 'reset';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Pick<BoxStyleProps, 'size'> &
  SpaceProps & {
    size?: ButtonSizes;
    children: React.ReactNode;
    /** @todo add fullwidth feature */
    // fullWidth?: boolean;
    tabIndex?: ButtonTabIndexes;
    disabled?: boolean;
    type?: ButtonTypes;
    variant?: ButtonVariants;
    intent?: ButtonIntents;
    loading?: boolean;
    leadingIcon?: React.ReactElement;
    trailingIcon?: React.ReactElement;
  };

export type InternalButtonProps = Omit<ButtonProps, 'variant'> & {
  buttonState: ButtonStates;
  ref?: any;
} & BoxStyleProps;
