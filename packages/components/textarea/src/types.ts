import type * as React from 'react';

import type { RealSystemElementProps } from '@real-system/styled-library';

type TextareaProps = RealSystemElementProps<'textarea'> & {
  disabled?: boolean;
  hasError?: boolean;
  height?: never;
  id?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  name?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  size?: never;
  style?: never;
  width?: never;
};

export type { TextareaProps };
