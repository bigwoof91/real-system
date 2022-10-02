import type { FieldControlValidation } from '@real-system/field';

type CustomProps = {
  disabled?: boolean;
  hasError?: FieldControlValidation['hasError'];
};

export type { CustomProps };
