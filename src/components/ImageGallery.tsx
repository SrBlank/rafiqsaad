import { motion } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  videos?: string[];
}

const getYouTubeId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
  return match ? match[1] : null;
};

const ImageGallery = ({ images, videos = [] }: ImageGalleryProps) => {
  if (images.length === 0 && videos.length === 0) return null;

  return (
    <div className="mt-4 space-y-3">
      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {videos.map((url, i) => {
            const videoId = getYouTubeId(url);
            if (!videoId) return null;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="aspect-video rounded-lg overflow-hidden border border-border"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Video ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>
      )}
      {images.length > 0 && (
        <div className="columns-2 md:columns-3 gap-3">
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
      )}
    </div>
  );
};

export default ImageGallery;
