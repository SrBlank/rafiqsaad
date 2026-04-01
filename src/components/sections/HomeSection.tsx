import { motion } from "framer-motion";
import { Code2, Link as LinkIcon, Mail } from "lucide-react";
import { profile } from "@/data/profile";

const HomeSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center py-20 px-4"
    >
      <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-heading">
        {profile.title}
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        {profile.name}
      </h1>
      <p className="text-xl text-muted-foreground mb-4">{profile.tagline}</p>
      <p className="text-muted-foreground leading-relaxed mb-8">{profile.bio}</p>
      <div className="flex items-center justify-center gap-4">
        <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
          <Mail className="h-5 w-5" />
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
          <Code2 className="h-5 w-5" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
          <LinkIcon className="h-5 w-5" />
        </a>
      </div>
    </motion.div>
  );
};

export default HomeSection;
