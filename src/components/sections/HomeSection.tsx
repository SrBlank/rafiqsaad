import { motion } from "framer-motion";
import { Mail, GraduationCap, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HomeSectionProps {
  onTabChange: (tab: string) => void;
}

const HomeSection = ({ onTabChange }: HomeSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-20 px-4"
    >
      <div className="text-center mb-12">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          src={profile.photoUrl}
          alt={profile.name}
          className="w-28 h-28 rounded-full object-cover object-top mx-auto mb-6 border-4 border-border shadow-md"
        />
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-heading">
          {profile.title}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {profile.name}
        </h1>
        <p className="text-xl text-muted-foreground font-heading mb-4">{profile.tagline}</p>
        <p className="text-muted-foreground leading-relaxed mb-8">{profile.bio}</p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
            <Mail className="h-5 w-5" />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
            <FaGithub className="h-5 w-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
            <FaLinkedinIn className="h-5 w-5" />
          </a>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => onTabChange("Experience")} className="gap-2">
            View my work <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => onTabChange("Projects")}>
            Projects
          </Button>
        </div>
      </div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12"
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Education
        </h2>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="p-4 rounded-lg bg-card border border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <p className="font-semibold text-sm">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
              </div>
              <Badge variant={edu.status.includes("Expected") ? "default" : "secondary"} className="w-fit text-xs">
                {edu.status}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomeSection;
