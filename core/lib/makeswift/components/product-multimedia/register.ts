import { Group, Image, List, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { MakeswiftProductMultimedia } from './client';

export const COMPONENT_TYPE = 'catalyst-makeswift-product-multimedia';

runtime.registerComponent(MakeswiftProductMultimedia, {
  type: COMPONENT_TYPE,
  label: 'Product Multimedia (private)',
  hidden: true,
  props: {
    items: List({
      label: 'Images',
      type: Group({
        label: 'Image',
        props: {
          image: Image({ label: 'Image' }),
          altText: TextInput({ label: 'Alt text', defaultValue: 'Product multimedia image' }),
        },
      }),
      getItemLabel: (item) => item?.altText || 'Image',
    }),
  },
});
