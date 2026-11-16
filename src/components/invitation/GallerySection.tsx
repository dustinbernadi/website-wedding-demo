import { LeafCluster } from "./FlowerOrnament";
import SectionHeading from "./SectionHeading";
import PhotoGallery from "./PhotoGallery";
import { Reveal } from "./motion";

type Props = {
  photos: { id: string; url: string; alt: string | null }[];
};

export default function GallerySection({ photos }: Props) {
  if (photos.length === 0) return null;

  return (
    <section
      id="galeri"
      className="relative scroll-mt-6 border-t border-[var(--accent)]/15 px-6 py-16 sm:px-10 sm:py-24"
    >
      <LeafCluster className="pointer-events-none absolute -left-4 top-4 hidden w-20 opacity-25 sm:block" />
      <LeafCluster className="pointer-events-none absolute -right-4 top-4 hidden w-20 opacity-25 rotate-180 sm:block" />
      <Reveal>
        <SectionHeading eyebrow="Momen Berharga" title="Galeri Foto" />
      </Reveal>
      <PhotoGallery photos={photos} />
    </section>
  );
}
