import { useCallback, useMemo } from 'react';

/** useIndeterminate hook */
type UseIndeterminateParams<V extends string, A extends string> = {
  values: V[];
  indeterminateValue: A;
  checkedItems: V[];
  setCheckedItems: React.Dispatch<any> | ((value: (V | A)[]) => void);
};

const emptyValues = [];

const useIndeterminate = <V extends string, A extends string>({
  values,
  indeterminateValue,
  checkedItems,
  setCheckedItems,
}: UseIndeterminateParams<V, A>) => {
  const allChecked = useMemo(
    () => values.every((value) => checkedItems.includes(value)),
    [checkedItems, values]
  );
  const isIndeterminate = useMemo(
    () => values.some((value) => checkedItems.includes(value)) && !allChecked,
    [allChecked, checkedItems, values]
  );

  const setValues = useCallback(
    (value: (V | A)[]) => [...new Set([indeterminateValue, ...value])],
    [indeterminateValue]
  );

  const onCheckboxGroupChange = useCallback(
    (value: (V | A)[]) => {
      const indeterminateWithoutValueSelected =
        value.length === 1 && value[0] === indeterminateValue;

      return setCheckedItems(
        indeterminateWithoutValueSelected
          ? emptyValues
          : value.length
          ? setValues(value)
          : value
      );
    },
    [indeterminateValue, setCheckedItems, setValues]
  );
  const onIndeterminateChange = useCallback(
    (value: boolean) =>
      setCheckedItems(
        isIndeterminate
          ? setValues(values)
          : value
          ? setValues(values)
          : emptyValues
      ),
    [isIndeterminate, setCheckedItems, values, setValues]
  );
  return {
    indeterminateProps: { isIndeterminate, onChange: onIndeterminateChange },
    checkBoxGroupProps: { onChange: onCheckboxGroupChange, canSelectAll: true },
  };
};

export type { UseIndeterminateParams };
export { useIndeterminate };
