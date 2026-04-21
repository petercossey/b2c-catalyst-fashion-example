import { Group, Image, List, Select, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { MakeswiftProductMultimedia } from './client';

export const COMPONENT_TYPE = 'catalyst-makeswift-product-multimedia';

runtime.registerComponent(MakeswiftProductMultimedia, {
  type: COMPONENT_TYPE,
  label: 'Product Multimedia (private)',
  hidden: true,
  props: {
    items: List({
      label: 'Media',
      type: Group({
        label: 'Media item',
        props: {
          type: Select({
            label: 'Type',
            options: [
              { label: 'Image', value: 'image' },
              { label: 'Video', value: 'video' },
            ],
            defaultValue: 'image',
          }),
          image: Image({ label: 'Image' }),
          videoUrl: TextInput({ label: 'Video URL', defaultValue: '' }),
          altText: TextInput({ label: 'Alt text', defaultValue: 'Product multimedia image' }),
        },
      }),
      getItemLabel: (item) => {
        if (item == null) {
          return 'Media item';
        }

        return item.type === 'video' ? item.videoUrl || 'Video' : item.altText || 'Image';
      },
    }),
  },
});
