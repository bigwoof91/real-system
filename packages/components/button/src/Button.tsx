import React, { forwardRef, useMemo } from 'react';

import { Spinner } from '@real-system/spinner';
import styled from '@real-system/styled-library';
import { makeTestId } from '@real-system/utils-library';

import { BaseButton } from './BaseButton';
import { ButtonProps } from './Button.model';
import { buttonStylesConfig } from './Button.styles';

type ButtonStates = 'disabled' | 'isLoading' | 'default';

const getButtonState = (
  disabled?: boolean,
  isLoading?: boolean
): ButtonStates => {
  if (disabled) {
    return 'disabled';
  }
  if (isLoading) {
    return 'isLoading';
  }
  return 'default';
};

const ButtonLabel = styled('span')({
  whiteSpace: 'nowrap',
});

const getLabelMarginX = (hasIcon: unknown) => (hasIcon ? 5 : 0);

/**
 * A Button is a clickable element which communicates that users can trigger an action.
 * It is commonly used to submit a form, open a Dialog, toggle a menu or perform a CRUD operation.
 *
 * @todo update sizes API with more variations
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    disabled,
    isLoading: isLoadingProp,
    variant = 'outline',
    size = 'md',
    leadingIcon,
    trailingIcon,
    colorScheme = 'gray',
    ...restProps
  },
  ref
): React.ReactElement {
  const { buttonState, isLoadingOrDisabled } = useMemo(() => {
    const state = getButtonState(disabled, isLoadingProp);
    return {
      buttonState: state,
      isLoadingOrDisabled: state !== 'default',
    };
  }, [disabled, isLoadingProp]);
  const { isLoading, buttonStyles } = useMemo(
    () => ({
      isLoading: buttonState === 'isLoading' && variant !== 'floating',
      buttonStyles: buttonStylesConfig[variant]({
        size,
        colorScheme,
      }),
    }),
    [buttonState, colorScheme, size, variant]
  );

  return (
    <BaseButton
      data-testid={makeTestId('button')}
      disabled={isLoadingOrDisabled}
      {...buttonStyles}
      {...restProps}
      ref={ref}>
      {leadingIcon ? leadingIcon : null}
      <ButtonLabel
        marginStart={getLabelMarginX(leadingIcon)}
        marginEnd={getLabelMarginX(trailingIcon)}>
        {isLoading ? (
          <Spinner size={size === 'lg' ? 'md' : 'sm'} color="gray-300" />
        ) : (
          children
        )}
      </ButtonLabel>
      {trailingIcon ? trailingIcon : null}
    </BaseButton>
  );
});

export { Button };
export type { ButtonProps };
