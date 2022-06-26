import type { FlexProps } from '@real-system/flex';
import type { HelperTextProps, LabelProps } from '@real-system/typography';

type CommonProps = FlexProps;

type NoBuiltInProps = {
  /** Disables opinionated props and favors passing components as children (e.g. `Label`, `HelperText`) as children.
   * Although it is not recommended for `Field`, set this to `false` to use a more declarative JSX pattern —
   * Then simply pass any components you want as children. */
  builtIns?: false;
  /** Field label */
  label?: never;
  /** `for` attribute for label element */
  labelFor?: never;
  errorText?: never;
  helpText?: never;
  isRequired?: never;
} & CommonProps;

type OptionalLabel = {
  /** Field label */
  label?: undefined;
  /** `for` attribute for label element */
  labelFor?: never;
};

type RequiredLabel = {
  /** Field label */
  label: string;
  /** `for` attribute for label element */
  labelFor: string;
};

type ConditionalLabel = OptionalLabel | RequiredLabel;

type BuiltInProps = {
  /** Enables props to be used instead of passing `Label` and `HelperText` (or other unexpected components) as children.
   * The `builtIns` approach is heavily opinionated by real system.
   * Although it is not reccommended, set this to `false` to follow your own field-composition opinions to use a more declartive JSX pattern
   * and simply pass any components you want as children (i.e. Label, HelperText, Input, etc.) */
  builtIns?: true;
  /** Displays error text for the field. Overrides help text if it is a truthy value */
  errorText?: HelperTextProps['errorText'];
  helpText?: HelperTextProps['children'];
  isRequired?: LabelProps['isRequired'];
} & CommonProps &
  ConditionalLabel;

type FieldProps = BuiltInProps | NoBuiltInProps;

type FieldGroupProps = CommonProps;

export type { FieldGroupProps, FieldProps };
