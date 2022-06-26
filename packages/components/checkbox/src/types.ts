import type {
  AriaCheckboxGroupItemProps,
  AriaCheckboxGroupProps,
  AriaCheckboxProps,
} from '@real-system/a11y-library';

/** should match keys of values in RenamedCheckboxProps */

type CustomProps = {
  helperText?: string;
  errorText?: string;
};

type CheckboxProps = AriaCheckboxProps & CustomProps;

type CheckboxGroupProps = AriaCheckboxGroupProps & CustomProps;

/** Checkbox Group Item */
type CheckboxGroupItemProps = AriaCheckboxGroupItemProps & CustomProps;

export type {
  // real system props
  CheckboxGroupItemProps,
  CheckboxGroupProps,
  CheckboxProps,
  CustomProps,
};
