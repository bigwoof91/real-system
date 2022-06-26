import * as React from 'react';

import { Flex, FlexProps } from '@real-system/flex';
import { makeTestId } from '@real-system/utils-library';

type FieldGroupProps = FlexProps;
/**
 * @description A flex wrapper for multiple Fields.
 */
const FieldGroup = ({ children, inline, ...restProps }: FieldGroupProps) => {
  const dynamicProps = inline ? {} : { vertical: true };
  return (
    <Flex
      {...dynamicProps}
      space={8}
      data-testid={makeTestId('field-group')}
      {...restProps}>
      {children}
    </Flex>
  );
};

export { FieldGroup };
