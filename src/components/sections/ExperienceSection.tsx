import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import ImageGallery from "@/components/ImageGallery";
import { Badge } from "@/components/ui/badge";

const ExperienceSection = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-muted-foreground">{exp.company}</p>
              </div>
              <span className="text-sm text-muted-foreground font-heading whitespace-nowrap">{exp.period}</span>
            </div>
            <p className="text-muted-foreground mt-2">{exp.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {exp.technologies.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
            <ImageGallery images={exp.images} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
