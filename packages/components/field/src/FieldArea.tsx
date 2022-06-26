import * as React from 'react';

import { Flex, FlexProps } from '@real-system/flex';

type FieldAreaProps = FlexProps;
const FieldArea = React.forwardRef<HTMLSpanElement, FieldAreaProps>(
  function FieldArea(props, ref) {
    return <Flex as="span" vertical {...props}></Flex>;
  }
);

export type { FieldAreaProps };
export { FieldArea };
