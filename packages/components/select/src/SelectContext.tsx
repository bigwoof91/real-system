import type { SelectStatePrimitive } from '@real-system/select-primitive';
import { constate } from '@real-system/state-library';

type CustomState = { isInvalid: boolean; isDisabled?: boolean };
type State = SelectStatePrimitive & CustomState;
type SelectContext = {
  state: State;
};

const useSelect = ({ state }: SelectContext): State => state;

const [SelectContextProvider, useSelectStateContext] = constate(useSelect);

export type { SelectContext };
export { SelectContextProvider, useSelectStateContext };
