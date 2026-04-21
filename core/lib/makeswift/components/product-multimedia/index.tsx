import { Component } from '~/lib/makeswift/component';

import { COMPONENT_TYPE } from './register';

interface Props {
  productId: number;
  productName: string;
}

export const ProductMultimedia = ({ productId, productName }: Props) => (
  <Component
    label={`Multimedia for ${productName}`}
    snapshotId={`product-multimedia-${productId}`}
    type={COMPONENT_TYPE}
  />
);
