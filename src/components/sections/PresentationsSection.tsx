import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, MapPin, Calendar, Image as ImageIcon, X } from "lucide-react";
import { presentations, posters } from "@/data/presentations";
import ImageGallery from "@/components/ImageGallery";
import { Badge } from "@/components/ui/badge";

const PresentationsSection = () => {
  const [expandedPoster, setExpandedPoster] = useState<string | null>(null);

  useEffect(() => {
    if (!expandedPoster) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedPoster(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [expandedPoster]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Presentations</h2>
      <div className="space-y-6">
        {presentations.map((pres, i) => (
          <motion.div
            key={pres.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <h3 className="text-lg font-semibold mb-1">{pres.title}</h3>
            <p className="text-sm text-primary font-heading">{pres.event}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{pres.location}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{pres.date}</span>
            </div>
            {pres.award && (
              <Badge className="mt-3 gap-1" variant="default">
                <Award className="h-3.5 w-3.5" />
                {pres.award}
              </Badge>
            )}
            <ImageGallery images={pres.images} />
          </motion.div>
        ))}
      </div>

      {/* Posters Section */}
      <h2 className="text-3xl font-bold mt-16 mb-8">Research Posters</h2>
      <p className="text-muted-foreground mb-6 text-sm">Click on a poster to view it larger.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posters.map((poster, i) => (
          <motion.div
            key={poster.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => poster.image && setExpandedPoster(poster.image)}
            className={`rounded-xl border border-border bg-card overflow-hidden ${poster.image ? "cursor-pointer hover:border-primary/50 transition-colors" : ""}`}
          >
            {poster.image ? (
              <img src={poster.image} alt={poster.title} className="w-full aspect-[3/4] object-cover" loading="lazy" />
            ) : (
              <div className="w-full aspect-[3/4] bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImageIcon className="h-8 w-8" />
                <span className="text-xs">Photo coming soon</span>
              </div>
            )}
            <div className="p-3">
              <p className="text-sm font-semibold">{poster.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {expandedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setExpandedPoster(null)}
          >
            <button
              onClick={() => setExpandedPoster(null)}
              className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={expandedPoster}
              alt="Research poster"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PresentationsSection;
