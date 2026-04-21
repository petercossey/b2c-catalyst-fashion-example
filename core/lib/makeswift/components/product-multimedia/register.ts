import { Group, Image, List, Number, Select, TextInput } from '@makeswift/runtime/controls';

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
          kind: Select({
            label: 'Source',
            options: [
              { label: 'Makeswift image', value: 'makeswift-image' },
              { label: 'Video', value: 'video' },
              { label: 'Product image', value: 'product-image' },
            ],
          }),
          image: Image({ label: 'Makeswift image' }),
          imageIndex: Number({ label: 'Product image index' }),
          videoUrl: TextInput({ label: 'Video URL', defaultValue: '' }),
          altText: TextInput({ label: 'Alt text', defaultValue: '' }),
        },
      }),
      getItemLabel: (item) => {
        if (item == null) {
          return 'Media item';
        }

        switch (item.kind) {
          case 'video':
            return item.videoUrl || 'Video';

          case 'product-image':
            return item.imageIndex != null ? `Product image ${item.imageIndex}` : 'Product image';

          case 'makeswift-image':
          default:
            return item.altText || 'Makeswift image';
        }
      },
    }),
  },
});
