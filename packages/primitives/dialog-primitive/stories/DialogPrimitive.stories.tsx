import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { animated } from '@real-system/animation-library';
import { Button } from '@real-system/button';
import {
  DialogContentPrimitive,
  DialogOverlayPrimitive,
} from '@real-system/dialog-primitive';
import styled, { polished } from '@real-system/styling-library';
import { getToken, majorScale } from '@real-system/theme-library';
import { Typography } from '@real-system/typography';

const { transparentize } = polished;

const DialogOverlay = styled(animated(DialogOverlayPrimitive))`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) =>
    transparentize(0.6, getToken('color-background-neutral')({ theme }))};
`;

const DialogContent = styled(animated(DialogContentPrimitive))`
  position: relative;
  box-shadow: ${getToken('overlay-shadow-1', 'shadows')};
  outline: 0;
  width: 100%;
  max-width: ${majorScale(65)};
  min-height: 150px;
  background-color: ${getToken('color-background')};
  border-radius: ${getToken(2, 'radii')};
  display: flex;
  flex-direction: column;
  z-index: ${getToken(3, 'zIndices')};
  opacity: 1;
`;

export default {
  title: 'Primitives/Dialog Primitive',
  component: DialogOverlayPrimitive,
} as Meta;

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="primary">
        Open Dialog Primitive
      </Button>
      <DialogOverlay isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <DialogContent>
          <Typography.Heading variant="heading3" mb={10}>
            Dialog Primitive
          </Typography.Heading>
          <Button onClick={() => setIsOpen(false)} width={20}>
            Close
          </Button>
        </DialogContent>
      </DialogOverlay>
    </>
  );
};

export const Default = Template.bind({});
