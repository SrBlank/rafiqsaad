import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { presentations } from "@/data/presentations";
import ImageGallery from "@/components/ImageGallery";

const PresentationsSection = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Presentations</h2>
      <div className="space-y-8">
        {presentations.map((pres, i) => (
          <motion.div
            key={pres.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-xl font-semibold">{pres.title}</h3>
              {pres.link && (
                <a href={pres.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-heading">{pres.event} · {pres.date}</p>
            <p className="text-muted-foreground mt-2">{pres.description}</p>
            <ImageGallery images={pres.images} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PresentationsSection;
