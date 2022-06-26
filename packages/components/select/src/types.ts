import {
  SelectStatePrimitive,
  SelectStatePrimitiveProps,
} from '@real-system/select-primitive';
import type { StylishProps } from '@real-system/styled-library';

type SelectState = SelectStatePrimitive;
type SelectStateProps = SelectStatePrimitiveProps;
type InternalSelectProps = { state: SelectState };

type SelectFormStateProps = {
  isInvalid?: boolean;
  isDisabled?: boolean;
};

type OmitSelectPrivateProps<T> = Omit<T, 'state' | 'as'>;
type CommonSelectProps<T> = Omit<T, 'state' | 'as'> &
  Omit<StylishProps, keyof T | 'as'>;

export type {
  CommonSelectProps,
  InternalSelectProps,
  OmitSelectPrivateProps,
  SelectFormStateProps,
  SelectState,
  SelectStateProps,
};
