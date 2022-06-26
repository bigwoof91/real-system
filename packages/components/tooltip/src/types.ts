import * as React from 'react';

import type { RealSystemElementProps } from '@real-system/styled-library';
import { TooltipStatePrimitiveProps } from '@real-system/tooltip-primitive';

type StateProps = Pick<
  TooltipStatePrimitiveProps,
  'visible' | 'timeout' | 'placement' | 'gutter'
>;
type TooltipProps = {
  children: React.ReactNode;
  label: string;
  isDisabled?: boolean;
  /**
   * Whether to show the tooltip's arrow or not
   * @default false
   */
  hideArrow?: boolean;
} & Partial<StateProps> &
  RealSystemElementProps<'span'>;

export type { TooltipProps };
