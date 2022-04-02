import React, { forwardRef } from 'react';

import { BaseText } from './BaseText';
import { Code } from './Code';
import { Heading } from './Heading';
import { HelpText } from './HelpText';
import { Label } from './Label';
import { CommonTextProps, TextAsTags } from './types';

export type TextProps = {
  children?: React.ReactNode;
  inline?: boolean;
  as?: TextAsTags;
} & CommonTextProps;

export interface TextComponent
  extends React.ForwardRefExoticComponent<TextProps> {
  Heading: typeof Heading;
  Label: typeof Label;
  HelpText: typeof HelpText;
  Code: typeof Code;
}

// @ts-expect-error Heading (component) property is defined on the fn object after this is defined
const Text: TextComponent = forwardRef<
  HTMLParagraphElement | HTMLSpanElement,
  TextProps
>(function Text(
  { children, as, inline = false, ...restProps },
  ref
): React.ReactElement {
  return (
    <BaseText
      lineHeight={2}
      marginBottom={2}
      {...restProps}
      as={as || inline ? 'span' : 'p'}
      ref={ref}>
      {children}
    </BaseText>
  );
});

Text.Heading = Heading;
Text.Label = Label;
Text.HelpText = HelpText;
Text.Code = Code;

export { Text };
