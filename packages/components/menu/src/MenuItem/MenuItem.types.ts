import type { RealElementPrimitiveProps } from '@real-system/elements-primitive';
import type { MenuItemPrimitiveProps } from '@real-system/menu-primitive';
import type { As } from '@real-system/styled-library';

type CommonMenuItemProps<T extends As = 'div'> = RealElementPrimitiveProps<T> &
  Pick<
    MenuItemPrimitiveProps,
    'hideOnClick' | 'focusOnHover' | 'preventScrollOnKeyDown' | 'children'
  > & { isDisabled?: boolean };

export type { CommonMenuItemProps };
