import React, { forwardRef } from 'react';

import { AlertPrimitive } from '@real-system/alert-primitive';
import type { ButtonProps } from '@real-system/button';
import { Button } from '@real-system/button';
import { Flex } from '@real-system/flex';
import { Icon } from '@real-system/icon';
import { Text } from '@real-system/typography';
import { makeTestId } from '@real-system/utils-library';

import type { CommonAlertProps } from './types';
import { ICON_MAP, INTENT_COLOR_MAP } from './utils';

type AlertProps = {
  description?: string;
  children: React.ReactNode;
  onDismiss?: ButtonProps['onClick'];
  dismissRef?: React.Ref<HTMLButtonElement>;
} & CommonAlertProps;

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    children,
    status = 'info',
    description,
    onDismiss = undefined,
    type = 'polite',
    dismissRef,
    ...restProps
  },
  ref
) {
  const bgColor = `${INTENT_COLOR_MAP[status]}-100`;
  const borderColor = bgColor;
  const iconColor = `${INTENT_COLOR_MAP[status]}-500`;

  return (
    <Flex
      inline
      yAlignContent="top"
      xAlignContent="left"
      width="100%"
      padding={7}
      borderRadius={4}
      borderStyle="solid"
      borderWidth={1}
      borderColor={borderColor}
      backgroundColor={bgColor}
      data-testid={makeTestId('alert')}
      {...restProps}
      ref={ref}>
      <Icon
        size="md"
        solid
        icon={ICON_MAP[status]}
        color={iconColor}
        marginRight={5}
        title={`${status} ${children ? ': ' + children : ''}`}
      />
      <Flex
        vertical
        yAlignContent="center"
        xAlignContent="left"
        marginRight={20}>
        <AlertPrimitive type={type}>
          {children && (
            <Text.Heading as="h5" marginTop={1}>
              {children}
            </Text.Heading>
          )}
          {description && <Text>{description}</Text>}
        </AlertPrimitive>
      </Flex>

      {onDismiss && (
        <Button
          ref={dismissRef}
          marginRight={0}
          marginTop={1}
          marginLeft="auto"
          onClick={onDismiss}
          variant="floating">
          <Icon icon="x" size="md" />
        </Button>
      )}
    </Flex>
  );
});

export type { AlertProps };
export { Alert };
