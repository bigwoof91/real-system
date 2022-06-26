import React, { forwardRef } from 'react';

import { BaseText } from './BaseText';
import { Code } from './Code';
import { Heading } from './Heading';
import { HelperText } from './HelperText';
import { Label } from './Label';
import { Truncate } from './Truncate';
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
  HelperText: typeof HelperText;
  Code: typeof Code;
  Truncate: typeof Truncate;
}

/**
 * Typography component for real system
 */
// @ts-expect-error Text component properties are defined on the fn object after this is defined
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
Text.HelperText = HelperText;
Text.Code = Code;
Text.Truncate = Truncate;

export { Text };
