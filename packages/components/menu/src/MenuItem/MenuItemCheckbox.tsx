import React, { forwardRef } from 'react';

import {
  MenuItemCheckboxPrimitive,
  MenuItemCheckboxPrimitiveProps,
  MenuItemCheckPrimitive,
} from '@real-system/menu-primitive';
import type { StylishProps } from '@real-system/styled-library';
import { makeTestId } from '@real-system/utils-library';

import type { CommonMenuProps, OmitMenuState } from '../types';

import { RealMenuItem } from './MenuItem';

type MenuItemCheckboxProps = OmitMenuState<MenuItemCheckboxPrimitiveProps> &
  CommonMenuProps;

const styleProps: StylishProps = {
  display: 'flex',
  alignItems: 'center',
  scrollMargin: '1rem',
  gap: 4,
};

const MenuItemCheckbox = forwardRef<HTMLDivElement, MenuItemCheckboxProps>(
  function MenuItemCheckbox(
    { children, isDisabled, onClick, value, name, ...restProps },
    ref
  ) {
    return (
      <MenuItemCheckboxPrimitive
        as={RealMenuItem}
        disabled={isDisabled}
        onClick={onClick}
        name={name}
        value={value}
        data-testid={makeTestId('menu-item-checkbox')}
        {...styleProps}
        {...restProps}
        ref={ref}>
        <>
          <MenuItemCheckPrimitive />
          {children}
        </>
      </MenuItemCheckboxPrimitive>
    );
  }
);

export type { MenuItemCheckboxProps };
export { MenuItemCheckbox };
