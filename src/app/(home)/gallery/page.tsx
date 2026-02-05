import type { Metadata } from "next";
import { PhotoGallery } from "@/components/photo-gallery";
import PageTitle from "@/components/page-title";
import config from "@/config";

const { title } = config;

export const metadata: Metadata = {
  title: `Gallery | ${title}`,
};

function Gallery() {
  return (
    <article>
      <PageTitle title="Gallery" />
      <PhotoGallery />
    </article>
  );
}

export default Gallery;
