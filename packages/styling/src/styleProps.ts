import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps as SSColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  system,
  typography,
  TypographyProps,
} from 'styled-system';
import { Property } from 'csstype';

const textWrap = system({
  whiteSpace: true,
});

const cursor = system({
  cursor: true,
});

const transition = system({
  transition: true,
});

const outline = system({
  outlineColor: {
    property: 'outlineColor',
    scale: 'colors',
  },
  outlineWidth: {
    property: 'outlineWidth',
    scale: 'sizes',
  },
  outlineStyle: true,
  outlineOffset: true,
});

const composeStyleProps = () =>
  compose(
    background,
    space,
    flexbox,
    border,
    layout,
    color,
    shadow,
    position,
    typography,
    textWrap,
    cursor,
    transition,
    outline
  );

export type TextWrapProps = {
  whiteSpace?:
    | 'normal'
    | 'nowrap'
    | 'pre'
    | 'pre-line'
    | 'pre-wrap'
    | 'initial'
    | 'inherit';
};

export type CursorProps = {
  cursor?: Property.Cursor;
};

export type TransitionProps = {
  transition?: Property.Transition;
};

export type OutlineProps = {
  outlineOffset?: Property.OutlineOffset;
  outlineStyle?: Property.OutlineStyle;
  outlineColor?: Property.OutlineColor;
  outlineWidth?: Property.OutlineWidth;
};
/** Workaround for color prop typing issue.
 * More info: https://spectrum.chat/styled-system/general/types-of-property-color-are-incompatible~9227ce42-00f2-473a-8924-f476f0ce6ae1
 * */
export type SafeColorProps = Omit<SSColorProps, 'color'> & { color?: any };
export type StyleProps = Partial<
  SpaceProps &
    FlexboxProps &
    BackgroundProps &
    BorderProps &
    LayoutProps &
    ShadowProps &
    SafeColorProps &
    PositionProps &
    TypographyProps &
    TextWrapProps &
    CursorProps &
    TransitionProps &
    OutlineProps
>;

const STYLE_PROPS = composeStyleProps().propNames!;

export { composeStyleProps, STYLE_PROPS, textWrap };
