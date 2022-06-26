import * as React from 'react';

import { InputBox } from '@real-system/input';
import { preventSpreadingStyleProps } from '@real-system/styled-library';
import { makeTestId } from '@real-system/utils-library';

import { TextareaElement } from './TextareaElement';
import type { TextareaProps } from './types';

const addonProps = {
  height: 'unset',
  padding: 4,
  paddingTop: 5,
  alignItems: 'flex-start',
  'data-testid': makeTestId('text-area-input-box-addon'),
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { children, isDisabled, isInvalid, prefix, suffix, isReadOnly, ...props },
    ref
  ) {
    return (
      <InputBox
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        suffix={suffix}
        prefix={prefix}
        isReadOnly={isReadOnly}
        addonProps={addonProps}
        data-testid={makeTestId('text-area-input-box')}
        height="100%">
        <TextareaElement
          data-testid={makeTestId('text-area')}
          // size, height and width should never get passed down
          {...preventSpreadingStyleProps(props)}
          aria-invalid={isInvalid}
          aria-readonly={isReadOnly}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          ref={ref}
          rows={3}
          spellCheck>
          {children}
        </TextareaElement>
      </InputBox>
    );
  }
);

export { Textarea };
