import React, { forwardRef, useMemo } from 'react';

import { Spinner } from '@real-system/spinner';
import styled from '@real-system/styling';
import { organScale } from '@real-system/theme';

import { DefaultButton } from './DefaultButton';
import { FloatingButton } from './FloatingButton';
import { MinimalButton } from './MinimalButton';
import { PrimaryButton } from './PrimaryButton';
import { getSizeStyles } from './styles';
import { ButtonProps, ButtonStates, ButtonVariants } from './types';
import { InternalButtonProps } from './types';

const getButtonState = (
  disabled?: boolean,
  loading?: boolean
): ButtonStates => {
  if (disabled) {
    return 'disabled';
  }
  if (loading) {
    return 'loading';
  }
  return 'default';
};

const BUTTON_VARIANTS: {
  [key in ButtonVariants]: React.FC<InternalButtonProps>;
} = {
  default: DefaultButton,
  primary: PrimaryButton,
  minimal: MinimalButton,
  floating: FloatingButton,
};

type LabelProps = {
  ml: number | string;
  mr: number | string;
};

const Label = styled.span<LabelProps>((props) => ({
  marginLeft: props.ml,
  marginRight: props.mr,
}));

/**
 * @todo update sizes API with more variations
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    disabled,
    loading,
    variant = 'default',
    size = 'md',
    leadingIcon,
    trailingIcon,
    ...restProps
  },
  ref
): React.ReactElement {
  const buttonState = useMemo(
    () => getButtonState(disabled, loading),
    [disabled, loading]
  );
  const sizeStyles = useMemo(
    () => getSizeStyles(variant)[size],
    [variant, size]
  );
  const isLoading = useMemo(
    () => buttonState === 'loading' && variant !== 'floating',
    [buttonState, variant]
  );
  const isDisabled = buttonState !== 'default';
  const ButtonVariant = BUTTON_VARIANTS[variant];
  return (
    <ButtonVariant
      {...restProps}
      {...sizeStyles}
      loading={isLoading}
      buttonState={buttonState}
      disabled={isDisabled}
      ref={ref}>
      {leadingIcon ? leadingIcon : null}
      <Label
        ml={leadingIcon ? organScale(5) : 0}
        mr={trailingIcon ? organScale(5) : 0}>
        {isLoading ? (
          <Spinner size="sm" color="color-text-neutral-weak-3" />
        ) : (
          children
        )}
      </Label>
      {trailingIcon ? trailingIcon : null}
    </ButtonVariant>
  );
});

export { Button };
export type { ButtonProps };
