import type { StylePropScaleNames } from '../../system/config/_types';

import type { borders, colors, filters, shadows } from './tokens.dynamic';
import type {
  borderWidths,
  breakpoints,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  sizes,
  space,
  zIndices,
} from './tokens.static';

export type OrdinalTokens =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

// dynamic tokens
export type ColorTokens = keyof ReturnType<typeof colors>;
export type BorderTokens = keyof ReturnType<typeof borders>;
export type FilterTokens = keyof ReturnType<typeof filters>;
export type ShadowTokens = keyof ReturnType<typeof shadows>;

// static tokens
export type BorderWidthTokens = keyof typeof borderWidths;
export type BreakpointTokens = keyof typeof breakpoints;
export type FontTokens = keyof typeof fonts;
export type FontSizeTokens = keyof typeof fontSizes;
export type FontWeightTokens = keyof typeof fontWeights;
export type LetterSpacingTokens = keyof typeof letterSpacings;
export type LineHeightTokens = keyof typeof lineHeights;
export type RadiiTokens = keyof typeof radii;
export type SpaceTokens = keyof typeof space;
export type SizeTokens = keyof typeof sizes;
export type ZIndexTokens = keyof typeof zIndices;

// all token typings
export type ThemeTokens =
  | BorderWidthTokens
  | BreakpointTokens
  | FontTokens
  | FontSizeTokens
  | FontWeightTokens
  | LetterSpacingTokens
  | LineHeightTokens
  | RadiiTokens
  | SpaceTokens
  | SizeTokens
  | ZIndexTokens
  | BorderTokens
  | ShadowTokens
  | OrdinalTokens
  | FilterTokens
  | ColorTokens;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExtendedThemeTokens<T> = ThemeTokens | T;
export type WildCardThemeToken = string | number;

export type ThemeScales = StylePropScaleNames;
