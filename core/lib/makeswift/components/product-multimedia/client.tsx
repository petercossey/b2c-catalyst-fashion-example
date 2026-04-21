'use client';

import React, { createContext, type PropsWithChildren, useContext } from 'react';

import { Stream, type Streamable } from '@/vibes/soul/lib/streamable';
import { Image } from '~/components/image';

export interface ProductImage {
  src: string;
  alt: string | null;
}

export interface MakeswiftImageMediaItem {
  kind?: 'makeswift-image';
  image?: string;
  altText?: string;
}

export interface VideoMediaItem {
  kind?: 'video';
  videoUrl?: string;
}

export interface ProductImageMediaItem {
  kind?: 'product-image';
  imageIndex?: number;
}

export type MediaItem = MakeswiftImageMediaItem | VideoMediaItem | ProductImageMediaItem;

export interface Props {
  productImages: Streamable<ProductImage[]>;
}

interface EditableProps {
  items?: MediaItem[];
}

type ResolvedMediaItem =
  | {
      kind: 'video';
      videoUrl: string;
    }
  | {
      kind: 'product-image' | 'makeswift-image';
      src: string;
      altText: string;
    };

const PropsContext = createContext<Props | null>(null);

export const PropsContextProvider = ({ value, children }: PropsWithChildren<{ value: Props }>) => (
  <PropsContext.Provider value={value}>{children}</PropsContext.Provider>
);

function hasAuthoredValue(value: string | number | undefined): boolean {
  if (typeof value === 'number') {
    return true;
  }

  return value != null && value.trim() !== '';
}

function isAuthoredMediaItem(item: MediaItem): boolean {
  switch (item.kind) {
    case 'video':
      return true;

    case 'product-image':
      return true;

    case 'makeswift-image':
      return true;

    default:
      return (
        hasAuthoredValue('imageIndex' in item ? item.imageIndex : undefined) ||
        hasAuthoredValue('videoUrl' in item ? item.videoUrl : undefined) ||
        hasAuthoredValue('image' in item ? item.image : undefined) ||
        hasAuthoredValue('altText' in item ? item.altText : undefined)
      );
  }
}

function resolveMediaItems(items: MediaItem[], productImages: ProductImage[]): ResolvedMediaItem[] {
  return items.reduce<ResolvedMediaItem[]>((resolvedItems, item) => {
    switch (item.kind) {
      case 'video': {
        if (item.videoUrl != null && item.videoUrl !== '') {
          resolvedItems.push({
            kind: 'video',
            videoUrl: item.videoUrl,
          });
        }

        return resolvedItems;
      }

      case 'product-image': {
        if (item.imageIndex == null) {
          return resolvedItems;
        }

        const productImage = productImages[item.imageIndex];

        if (productImage != null) {
          resolvedItems.push({
            kind: 'product-image',
            src: productImage.src,
            altText: productImage.alt ?? '',
          });
        }

        return resolvedItems;
      }

      default: {
        const image = 'image' in item ? item.image : undefined;
        const altText = 'altText' in item ? item.altText : undefined;

        if (image != null && image !== '') {
          resolvedItems.push({
            kind: 'makeswift-image',
            src: image,
            altText: altText ?? '',
          });
        }

        return resolvedItems;
      }
    }
  }, []);
}

function ProductMultimediaContent({
  items = [],
  productImages: streamableProductImages,
}: EditableProps & Props) {
  const authoredItems = items.filter(isAuthoredMediaItem);

  return (
    <Stream fallback={<section />} value={streamableProductImages}>
      {(productImages) => {
        const hasAuthoredItems = authoredItems.length > 0;
        const mediaItems = hasAuthoredItems
          ? resolveMediaItems(authoredItems, productImages)
          : productImages.map<ResolvedMediaItem>((image) => ({
              kind: 'product-image',
              src: image.src,
              altText: image.alt ?? '',
            }));

        if (mediaItems.length === 0) return null;

        return (
          <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {mediaItems.map((item, index) => (
              <div
                className="overflow-hidden rounded-xl bg-[hsl(var(--contrast-100))]"
                key={
                  item.kind === 'video'
                    ? `${item.kind}-${item.videoUrl}`
                    : `${item.kind}-${item.src}`
                }
              >
                {item.kind === 'video' ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    className="aspect-[4/5] h-full w-full object-cover"
                    controls
                    preload="metadata"
                    src={item.videoUrl}
                  />
                ) : (
                  <Image
                    alt={item.altText}
                    className="aspect-[4/5] h-full w-full object-cover"
                    height={800}
                    loading={index === 0 ? 'eager' : undefined}
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                    src={item.src}
                    width={1200}
                  />
                )}
              </div>
            ))}
          </section>
        );
      }}
    </Stream>
  );
}

export function MakeswiftProductMultimedia(props: EditableProps) {
  const passedProps = useContext(PropsContext);

  if (passedProps == null) {
    // eslint-disable-next-line no-console
    console.error('No context provided for MakeswiftProductMultimedia');

    return <p>There was an error rendering the product multimedia.</p>;
  }

  return <ProductMultimediaContent {...passedProps} {...props} />;
}
