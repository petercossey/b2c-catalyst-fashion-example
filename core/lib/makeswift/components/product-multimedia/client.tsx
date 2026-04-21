import { Image } from '~/components/image';

interface Props {
  items?: Array<{
    type?: 'image' | 'video';
    image?: string;
    videoUrl?: string;
    altText?: string;
  }>;
}

export function MakeswiftProductMultimedia({ items = [] }: Props) {
  const mediaItems = items.filter(
    (
      item,
    ): item is
      | { type: 'image'; image: string; altText?: string }
      | { type: 'video'; videoUrl: string; altText?: string } => {
      if (item.type === 'video') {
        return item.videoUrl != null && item.videoUrl !== '';
      }

      return item.image != null && item.image !== '';
    },
  );

  if (mediaItems.length === 0) {
    return (
      <section>
        <div>Select an image or video in Makeswift to populate Product Multimedia.</div>
      </section>
    );
  }

  return (
    <section>
      {mediaItems.map((item, index) => (
        <div key={`${item.type}-${item.type === 'video' ? item.videoUrl : item.image}-${index}`}>
          {item.type === 'video' ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video controls preload="metadata" src={item.videoUrl} />
          ) : (
            <Image
              alt={item.altText ?? ''}
              height={800}
              src={item.image}
              unoptimized
              width={1200}
            />
          )}
        </div>
      ))}
    </section>
  );
}
