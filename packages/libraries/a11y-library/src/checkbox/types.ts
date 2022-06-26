/**
 * Renamed props to make prop api consistent with other component prop names
 */
import * as React from 'react';
import type { CheckboxGroupState as AriaCheckboxGroupState } from '@react-stately/checkbox';
import type {
  AriaCheckboxGroupItemProps as OriginalAriaCheckboxGroupItemProps,
  AriaCheckboxGroupProps as OriginalAriaCheckboxGroupProps,
  AriaCheckboxProps as OriginalAriaCheckboxProps,
} from '@react-types/checkbox';
import type { Orientation } from '@react-types/shared';

type RenamedCheckboxProps = {
  isChecked?: OriginalAriaCheckboxProps['isSelected'];
  defaultChecked?: OriginalAriaCheckboxProps['defaultSelected'];
};

/** should match keys of values in RenamedCheckboxProps */
type PropsToRename = 'isSelected' | 'defaultSelected';

/** Checkbox */
type AriaCheckboxProps = RenamedCheckboxProps &
  Omit<OriginalAriaCheckboxProps, PropsToRename>;

type RestoredAriaCheckboxProps = OriginalAriaCheckboxProps;

/** Checkbox Group */
type CustomCheckboxGroupProps = {
  children: React.ReactNode;
  canSelectAll?: boolean;
  isRequired?: boolean;
  orientation?: Orientation;
};

type AriaCheckboxGroupProps = OriginalAriaCheckboxGroupProps &
  CustomCheckboxGroupProps;

type RestoredAriaCheckboxGroupProps = OriginalAriaCheckboxGroupProps;

/** Checkbox Group Item */
type AriaCheckboxGroupItemProps = RenamedCheckboxProps &
  Omit<OriginalAriaCheckboxGroupItemProps, PropsToRename>;

type RestoredAriaCheckboxGroupItemProps = AriaCheckboxGroupItemProps &
  // we've altered the react-aria CheckboxGroupItem api to also accept 'isChecked' which needs to get renamed to `isSelected`
  Pick<OriginalAriaCheckboxProps, 'isSelected' | 'defaultSelected'>;

export type {
  // real system props
  AriaCheckboxGroupItemProps,
  AriaCheckboxGroupProps,
  AriaCheckboxGroupState,
  AriaCheckboxProps,
  CustomCheckboxGroupProps,
  // react aria props
  RestoredAriaCheckboxGroupItemProps,
  RestoredAriaCheckboxGroupProps,
  RestoredAriaCheckboxProps,
};
