import { Image, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { MakeswiftProductMultimedia } from './client';

export const COMPONENT_TYPE = 'catalyst-makeswift-product-multimedia';

runtime.registerComponent(MakeswiftProductMultimedia, {
  type: COMPONENT_TYPE,
  label: 'Product Multimedia (private)',
  hidden: true,
  props: {
    image: Image({ label: 'Image' }),
    altText: TextInput({ label: 'Alt text', defaultValue: 'Product multimedia image' }),
  },
});
