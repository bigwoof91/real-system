import * as React from 'react';

import { real } from '@real-system/elements-primitive';

import { RequiredDot } from './RequiredDot';

type CheckboxLabelProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  isRequired?: boolean;
};

const CheckboxLabel = ({
  children,
  isDisabled,
  isRequired,
}: CheckboxLabelProps) => {
  return (
    <>
      {isRequired && <RequiredDot isDisabled={isDisabled} />}
      <real.span
        color={isDisabled ? 'gray-300' : 'gray-500'}
        fontFamily="body"
        fontScale="input"
        fontWeight="input"
        marginBottom={0}>
        {children}
      </real.span>
    </>
  );
};

export { CheckboxLabel };
