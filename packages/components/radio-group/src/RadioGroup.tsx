import * as React from 'react';
import { forwardRef } from 'react';

import { useRadioGroup, useRadioGroupState } from '@real-system/a11y-library';
import { Flex } from '@real-system/flex';
import { HelperText, Label } from '@real-system/typography';
import { makeTestId } from '@real-system/utils-library';

import { Radio } from './Radio';
import { RadioGroupContextProvider } from './RadioContext';
import type { RadioGroupProps } from './types';

export interface RadioGroupComponent
  extends React.ForwardRefExoticComponent<RadioGroupProps> {
  Radio: typeof Radio;
}

// @ts-expect-error Radio (component) property is defined on the fn object after this is defined
const RadioGroup: RadioGroupComponent = forwardRef<
  HTMLDivElement,
  RadioGroupProps
>(function RadioGroup(props, ref) {
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);
  const { invalid, label, helpText, required, children, orientation } = props;

  return (
    <Flex
      vertical
      {...radioGroupProps}
      data-testid={makeTestId('checkbox-group')}
      ref={ref}>
      <Label
        as="legend"
        required={required}
        marginBottom={helpText ? 2 : 6}
        cursor="default"
        {...labelProps}>
        {label}
      </Label>
      {helpText && <HelperText marginBottom={6}>{helpText}</HelperText>}
      <Flex vertical={orientation === 'vertical' ? true : false}>
        <RadioGroupContextProvider state={{ ...state, orientation, invalid }}>
          {children}
        </RadioGroupContextProvider>
      </Flex>
      {invalid && <HelperText invalid={invalid} marginBottom={8} mt={2} />}
    </Flex>
  );
});

RadioGroup.Radio = Radio;
RadioGroup.defaultProps = { orientation: 'vertical' };

export type { RadioGroupProps };
export { RadioGroup };
