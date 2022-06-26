import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { Box } from '@real-system/box';
import { Icon } from '@real-system/icon';
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemCheckbox,
  MenuItemCommand,
  MenuItemIcon,
  MenuItemLink,
  MenuItemRadio,
  MenuList,
  MenuSeparator,
} from '@real-system/menu';

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: {
    MenuButton,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuItemCheckbox,
    MenuItemCommand,
    MenuItemIcon,
    MenuItemLink,
    MenuItemRadio,
    MenuList,
    MenuSeparator,
  },
} as Meta;

export const Default = () => (
  <Box height="24rem">
    <Menu>
      <MenuButton variant="ghost">
        <Icon icon="menu" />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <MenuItemIcon icon="pencil-alt" />
          Edit
          <MenuItemCommand>E</MenuItemCommand>
        </MenuItem>
        <MenuItem>
          <MenuItemIcon icon="share" />
          Share
          <MenuItemCommand>S</MenuItemCommand>
        </MenuItem>
        <MenuItem>
          <MenuItemIcon icon="archive" />
          Archive
          <MenuItemCommand>A</MenuItemCommand>
        </MenuItem>
        <MenuItem isDisabled>
          <MenuItemIcon icon="trash" />
          Delete
          <MenuItemCommand>D</MenuItemCommand>
        </MenuItem>
        <MenuSeparator />
        <MenuItemLink
          href="https://system.themikewolf.com"
          external
          showExternal>
          Report
        </MenuItemLink>
      </MenuList>
    </Menu>
  </Box>
);

export const MenuGroups = () => (
  <Box height="24rem">
    <Menu>
      <MenuButton variant="ghost">
        <Icon icon="menu" />
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <MenuGroupLabel>Profile Actions</MenuGroupLabel>
          <MenuItem>My Account</MenuItem>
          <MenuItem>Billing</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Help</MenuGroupLabel>
          <MenuItem>Docs</MenuItem>
          <MenuItemLink
            href="https://system.themikewolf.com"
            external
            showExternal>
            FAQ
          </MenuItemLink>
        </MenuGroup>
      </MenuList>
    </Menu>
  </Box>
);

export const CheckboxMenu = () => {
  const [values, setValues] = useState({
    watching: ['issues'],
  });

  return (
    <Box height="24rem">
      <Menu values={values} setValues={setValues}>
        <MenuButton
          size="sm"
          variant="outline"
          leadingIcon={<Icon icon="eye" size="xs" />}>
          Watch
        </MenuButton>
        <MenuList>
          <MenuItemCheckbox name="watching" value="issues">
            Issues
          </MenuItemCheckbox>
          <MenuItemCheckbox name="watching" value="pull-requests">
            Pull requests
          </MenuItemCheckbox>
          <MenuItemCheckbox name="watching" value="releases">
            Releases
          </MenuItemCheckbox>
          <MenuItemCheckbox name="watching" value="discussions">
            Discussions
          </MenuItemCheckbox>
          <MenuItemCheckbox name="watching" value="security-alerts">
            Security alerts
          </MenuItemCheckbox>
        </MenuList>
      </Menu>
    </Box>
  );
};

export const RadioMenu = () => {
  const [values, setValues] = useState({
    sortBy: 'name',
  });

  return (
    <Box height="24rem">
      <Menu values={values} setValues={setValues}>
        <MenuButton
          size="sm"
          variant="outline"
          leadingIcon={<Icon icon="sort-descending" size="xs" />}>
          Sort by: {values.sortBy}
        </MenuButton>
        <MenuList>
          <MenuItemRadio name="sortBy" value="name">
            Name
          </MenuItemRadio>
          <MenuItemRadio name="sortBy" value="description">
            Description
          </MenuItemRadio>
          <MenuItemRadio name="sortBy" value="release">
            Release
          </MenuItemRadio>
          <MenuItemRadio name="sortBy" value="color">
            Color
          </MenuItemRadio>
        </MenuList>
      </Menu>
    </Box>
  );
};
