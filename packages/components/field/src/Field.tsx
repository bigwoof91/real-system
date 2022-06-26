import * as React from 'react';

import { Flex, FlexProps } from '@real-system/flex';

import {
  FieldControlContext,
  FieldControlProvider,
} from './FieldControlContext';

type FieldProps = FieldControlContext & FlexProps;
/**
 * @description A Field control area for form components
 */
const Field = ({
  children,
  isInvalid,
  isRequired,
  isReadOnly,
  isDisabled,
  isInline,
  ...restProps
}: FieldProps) => {
  const contextValue = {
    isInvalid,
    isRequired,
    isReadOnly,
    isDisabled,
    isInline,
  };

  const alignmentProps = React.useMemo(
    () => (isInline ? {} : { vertical: true }),
    [isInline]
  );

  return (
    <FieldControlProvider value={contextValue}>
      <Flex {...alignmentProps} gap={2} {...restProps}>
        {children}
      </Flex>
    </FieldControlProvider>
  );
};

export type { FieldProps };
export { Field };
