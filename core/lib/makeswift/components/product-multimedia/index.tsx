import { type Streamable } from '@/vibes/soul/lib/streamable';
import { Component } from '~/lib/makeswift/component';

import { type ProductImage, PropsContextProvider } from './client';
import { COMPONENT_TYPE } from './register';

interface Props {
  productId: number;
  productName: string;
  productImages: Streamable<ProductImage[]>;
}

export const ProductMultimedia = ({ productId, productName, productImages }: Props) => (
  <PropsContextProvider value={{ productImages }}>
    <Component
      label={`Multimedia for ${productName}`}
      snapshotId={`product-multimedia-${productId}`}
      type={COMPONENT_TYPE}
    />
  </PropsContextProvider>
);
