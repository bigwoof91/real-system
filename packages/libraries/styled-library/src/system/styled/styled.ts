import _styled, { FunctionInterpolation } from '@emotion/styled';

import { getPseudoProps, getStyleProps, isNotStylishProp } from '../props';

import type {
  CSSObject,
  RealSystemComponent,
  StyleObjectOrFn,
} from './styled.types';
import type { As, StyledDict } from './styled.types.helpers';
import { objectFilter, shouldForwardProp } from './styled.utils';

type StyleResolverProps = CSSObject & {
  sx?: StyleObjectOrFn;
  theme: any;
};

type GetCSSObject = FunctionInterpolation<StyleResolverProps>;

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
type ToCSSObject = (
  styles: StyleObjectOrFn,
  baseStyles?: StyleObjectOrFn
) => GetCSSObject;

const toCSSObject: ToCSSObject = (styledStyles, baseStyles) => (props) => {
  const { sx = {}, ...rest } = props;

  const allProps = { ...baseStyles, ...styledStyles, ...rest, ...sx };
  const styleProps = getStyleProps(allProps);
  const pseudoProps = getPseudoProps(allProps);
  const styles = objectFilter({ ...styledStyles, ...sx }, isNotStylishProp);

  return { ...styles, ...styleProps, ...pseudoProps };
};

type RealSystemStyledOptions = {
  label?: string;
  /** Utility only forwarding specific props to the DOM element itself. By default will forward all props except `StylishProps` */
  shouldForwardProp?(propName: string): boolean;
  /** The elements base styles. Useful for reusing a `CreateStyledComponent` instead of reusing the `Component` itself */
  baseStyles?: StyleObjectOrFn;
  target?: string;
};

function styled<T extends As>(component: T, options?: RealSystemStyledOptions) {
  return function createStyledComponent<P extends StyledDict = StyledDict>(
    /** @todo allow passing of multiple args/string literal */
    styles: StyleObjectOrFn<P> = {}
  ) {
    const { baseStyles, ...styledOptions } = options ?? {};

    if (!styledOptions.shouldForwardProp) {
      styledOptions.shouldForwardProp = shouldForwardProp.ifNotStylishProp;
    }

    return _styled(
      component as React.ComponentType<any>,
      styledOptions
    )(toCSSObject(styles, baseStyles)) as RealSystemComponent<T, P>;
  };
}

export type { RealSystemStyledOptions };
export { styled };
