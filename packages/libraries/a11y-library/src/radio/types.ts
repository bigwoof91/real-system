import type { RadioGroupState as AriaRadioGroupState } from '@react-stately/radio';
import type {
  AriaRadioGroupProps as OriginalAriaRadioGroupProps,
  AriaRadioProps as OriginalAriaRadioProps,
} from '@react-types/radio';

/** Radio */
type AriaRadioProps = OriginalAriaRadioProps;

/** Radio Group */
type AriaRadioGroupProps = OriginalAriaRadioGroupProps;

export type {
  // real system props
  AriaRadioGroupProps,
  AriaRadioGroupState,
  AriaRadioProps,
};
