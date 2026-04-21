import { Image } from '~/components/image';

interface Props {
  image?: string;
  altText?: string;
}

export function MakeswiftProductMultimedia({ image, altText }: Props) {
  if (image == null || image === '') {
    return (
      <section className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-dashed border-contrast-200 bg-contrast-100 px-6 py-12 text-center text-sm text-contrast-500">
          Select an image in Makeswift to populate Product Multimedia.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-contrast-100">
        <Image alt={altText ?? ''} className="object-cover" fill src={image} unoptimized />
      </div>
    </section>
  );
}
