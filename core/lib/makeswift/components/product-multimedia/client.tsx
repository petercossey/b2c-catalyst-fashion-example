import { Image } from '~/components/image';

interface Props {
  items?: Array<{
    image?: string;
    altText?: string;
  }>;
}

export function MakeswiftProductMultimedia({ items = [] }: Props) {
  const images = items.filter(
    (item): item is { image: string; altText?: string } => item.image != null && item.image !== '',
  );

  if (images.length === 0) {
    return (
      <section>
        <div>Select an image in Makeswift to populate Product Multimedia.</div>
      </section>
    );
  }

  return (
    <section>
      {images.map((item, index) => (
        <div key={`${item.image}-${index}`}>
          <Image alt={item.altText ?? ''} height={800} src={item.image} unoptimized width={1200} />
        </div>
      ))}
    </section>
  );
}
