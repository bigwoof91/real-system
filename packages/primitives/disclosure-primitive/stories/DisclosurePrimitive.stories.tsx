import * as React from 'react';
import { Meta } from '@storybook/react';

import {
  DisclosureContentPrimitive,
  DisclosurePrimitive,
  useDisclosureStatePrimitive,
} from '@real-system/disclosure-primitive';
import { Icon } from '@real-system/icon';
import { Text } from '@real-system/typography';

export default {
  title: 'Primitives/Disclosure Primitive',
  component: DisclosurePrimitive,
} as Meta;

const Template = () => {
  const disclosure = useDisclosureStatePrimitive();
  return (
    <div className="wrapper">
      <DisclosurePrimitive
        display="inline-flex"
        state={disclosure}
        as={Text.Heading}
        size="h5"
        cursor="pointer">
        Info about vegetables
        <Icon
          ml={3}
          icon={disclosure.visible ? 'chevron-up' : 'chevron-down'}
        />
      </DisclosurePrimitive>
      <DisclosureContentPrimitive state={disclosure}>
        <Text>
          Vegetables are parts of plants that are consumed by humans or other
          animals as food. The original meaning is still commonly used and is
          applied to plants collectively to refer to all edible plant matter,
          including the flowers, fruits, stems, leaves, roots, and seeds.
        </Text>
      </DisclosureContentPrimitive>
    </div>
  );
};

export const Default = Template.bind({});
