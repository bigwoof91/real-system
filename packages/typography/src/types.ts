import { SpaceProps, TypographyProps } from '@realsystem/styling';

export type InternalTypographyProps = SpaceProps & TypographyProps;
export type TypographyVariants = 'paragraph' | 'inline';
export type TypographyAsTags = Extract<
  keyof JSX.IntrinsicElements,
  'p' | 'span' | 'div' | 'label'
>;
export type TypographyElement = HTMLParagraphElement | HTMLSpanElement;
export type HeadingVariants =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6';
export type HeadingAsTags =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div'
  | 'label'
  | 'span'
  | 'header';
export type HeadingElement =
  | HTMLDivElement
  | HTMLHeadingElement
  | HTMLSpanElement
  | HTMLLabelElement;
