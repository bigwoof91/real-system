import * as React from 'react';

import { real } from '@real-system/elements-primitive';
import type { RealSystemComponentProps } from '@real-system/styled-library';

type DisclosureHeadingAsTags = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type DisclosureHeadingProps = RealSystemComponentProps<'div'> & {
  as?: DisclosureHeadingAsTags;
  fontScale?: DisclosureHeadingAsTags | 'button';
};

const DisclosureHeading = ({
  children,
  as = 'h2',
  fontScale = 'button',
  ...restProps
}: DisclosureHeadingProps) => {
  const SpecifiedHeading = real[as];

  return (
    <SpecifiedHeading
      margin="0"
      padding="0"
      fontScale={fontScale}
      fontWeight="inherit"
      data-disclosure-heading
      {...restProps}>
      {children}
    </SpecifiedHeading>
  );
};

export type { DisclosureHeadingProps };
export { DisclosureHeading };
