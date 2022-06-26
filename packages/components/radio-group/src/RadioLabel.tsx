import * as React from 'react';

import { real } from '@real-system/elements-primitive';

type RadioLabelProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
};

const RadioLabel = ({ children, isDisabled }: RadioLabelProps) => {
  return (
    <real.span
      color={isDisabled ? 'gray-300' : 'gray-500'}
      fontFamily="body"
      fontScale="body"
      fontWeight={3}
      marginBottom={0}>
      {children}
    </real.span>
  );
};

export { RadioLabel };
