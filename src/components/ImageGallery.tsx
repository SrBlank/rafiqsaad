import { motion } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (images.length === 0) return null;

  return (
    <div className="columns-2 md:columns-3 gap-3 mt-4">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="mb-3 break-inside-avoid"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full rounded-lg border border-border object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGallery;
