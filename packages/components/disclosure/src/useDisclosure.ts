import type { DisclosureStatePrimitiveProps } from '@real-system/disclosure-primitive';
import {
  DisclosureContentPrimitive,
  DisclosurePrimitive,
  useDisclosureStatePrimitive,
} from '@real-system/disclosure-primitive';

type UseDisclosureProps = DisclosureStatePrimitiveProps;

/**
 * @name useDisclosure
 * @description Disclosure hook to compose components within a disclosure pattern.
 */
const useDisclosure = (stateProps: UseDisclosureProps = {}) =>
  useDisclosureStatePrimitive(stateProps);

export type { UseDisclosureProps };
export { useDisclosure };
