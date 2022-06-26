import { makeContext } from '@real-system/state-library';

type FieldControlContext = {
  isInvalid?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
};

const [FieldControlProvider, useFieldControlContext] =
  makeContext<FieldControlContext>({
    strict: false,
    name: 'FieldControlContext',
  });

export type { FieldControlContext };
export { FieldControlProvider, useFieldControlContext };
