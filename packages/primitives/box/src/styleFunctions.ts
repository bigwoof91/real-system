import { css } from '@real-system/styling';

import { PSEUDO_PROP_STYLES } from './pseudoPropStyles';
import { BoxProps } from './types';

/**
 * Take _ prefixed style props and convert them to custom style props for CSS pseudo selectors
 *
 * @param {BoxProps} props any prop that Box can take
 * @return {*}  {(((props?: Record<string, unknown> | undefined) => CSSObject) | Record<string, never>)}
 */
const getPseudoStyles = (
  props: BoxProps
): ReturnType<typeof css> | Record<string, any> => {
  const pseudoProps = Object.keys(props).filter((propName) =>
    propName.startsWith('_')
  ) as Array<keyof typeof PSEUDO_PROP_STYLES>;

  if (pseudoProps.length === 0) {
    return {};
  }

  const pseudoStyles: { [key: string]: any } = {};
  pseudoProps.forEach((pseudoProp) => {
    if (PSEUDO_PROP_STYLES[pseudoProp] != null) {
      pseudoStyles[PSEUDO_PROP_STYLES[pseudoProp]] = props[pseudoProp];
    }
  });

  return css(pseudoStyles);
};

export { getPseudoStyles };