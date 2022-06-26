import * as React from 'react';

import { DisclosureHeading, DisclosureHeadingProps } from './DisclosureHeading';
import { DisclosureTrigger, DisclosureTriggerProps } from './DisclosureTrigger';

type DisclosureToggleProps = DisclosureHeadingProps &
  Pick<DisclosureTriggerProps, 'hideToggleIcon'>;

/**
 * A semantic toggle component for `Disclosure`. Should be used to toggle `DisclosureContent`.
 * By default, renders an `h2` element — This can be overriden by the `as` prop
 */
const DisclosureToggle = ({
  children,
  as = 'h2',
  fontScale,
  hideToggleIcon,
  ...restProps
}: DisclosureToggleProps) => {
  return (
    <DisclosureHeading as={as} fontScale={fontScale}>
      <DisclosureTrigger hideToggleIcon={hideToggleIcon} {...restProps}>
        {children}
      </DisclosureTrigger>
    </DisclosureHeading>
  );
};

export type { DisclosureToggleProps };
export { DisclosureToggle };
