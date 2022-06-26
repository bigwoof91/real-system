import React, { forwardRef } from 'react';

import {
  useCheckboxGroup,
  useCheckboxGroupState,
} from '@real-system/a11y-library';
import { Flex } from '@real-system/flex';
import { HelperText, Label } from '@real-system/typography';
import { makeTestId } from '@real-system/utils-library';

import { CheckboxGroupContextProvider } from './CheckboxContext';
import { CheckboxGroupItem } from './CheckboxGroupItem';
import { CheckboxGroupProps } from './types';

export interface CheckboxGroupComponent
  extends React.ForwardRefExoticComponent<CheckboxGroupProps> {
  Item: typeof CheckboxGroupItem;
}

/**
 * @description CheckboxGroup component.
 */
// @ts-expect-error Item (component) property is defined on the fn object after this is defined
const CheckboxGroup: CheckboxGroupComponent = forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(function CheckboxGroup(props, ref) {
  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps } = useCheckboxGroup(props, state);
  const {
    children,
    helperText,
    errorText,
    isRequired,
    canSelectAll,
    orientation,
  } = props;

  return (
    <Flex
      vertical
      {...groupProps}
      data-testid={makeTestId('checkbox-group')}
      ref={ref}>
      <Label
        as="legend"
        marginBottom={helperText ? 2 : 6}
        isRequired={isRequired}
        cursor="default"
        {...labelProps}>
        {props.label}
      </Label>
      {helperText && <HelperText marginBottom={7}>{helperText}</HelperText>}
      <Flex
        vertical={orientation === 'vertical' ? true : false}
        xAlignContent="left"
        yAlignContent={orientation === 'vertical' ? 'top' : 'center'}>
        <CheckboxGroupContextProvider
          state={{ ...state, errorText, canSelectAll, orientation }}>
          {children}
        </CheckboxGroupContextProvider>
      </Flex>
      {errorText && <HelperText errorText={errorText} marginBottom={8} />}
    </Flex>
  );
});

CheckboxGroup.Item = CheckboxGroupItem;
CheckboxGroup.defaultProps = { orientation: 'vertical' };

export type { CheckboxGroupProps };
export { CheckboxGroup };
