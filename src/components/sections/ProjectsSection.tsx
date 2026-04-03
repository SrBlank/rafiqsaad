import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";
import ImageGallery from "@/components/ImageGallery";
import { Badge } from "@/components/ui/badge";

const ProjectsSection = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="space-y-8">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <h3 className="text-xl font-semibold mb-1">{proj.title}</h3>
            <p className="text-sm text-muted-foreground font-heading mb-3">{proj.period}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{proj.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {proj.technologies.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <FaGithub className="h-3.5 w-3.5" /> View source
                </a>
              )}
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  Visit website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <ImageGallery images={proj.images} videos={proj.videos} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
