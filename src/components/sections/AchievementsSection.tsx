import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Users, GraduationCap } from "lucide-react";
import { publications, organizations, coursework } from "@/data/achievements";
import { Badge } from "@/components/ui/badge";

const AchievementsSection = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto py-12 px-4">
      {/* Publications */}
      <h2 className="text-3xl font-bold mb-8">Publications</h2>
      <div className="space-y-6 mb-16">
        {publications.map((pub, i) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{pub.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{pub.authors}</p>
                <p className="text-sm text-muted-foreground">{pub.venue}</p>
                {pub.doi && (
                  <p className="text-xs text-muted-foreground mt-1 font-heading">DOI: {pub.doi}</p>
                )}
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm text-primary hover:underline"
                  >
                    View publication <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Student Organizations */}
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Users className="h-7 w-7" />
        Student Organizations
      </h2>
      <div className="space-y-4 mb-16">
        {organizations.map((org, i) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl bg-card border border-border"
          >
            <h3 className="font-semibold">{org.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{org.institution}</p>
            <div className="space-y-1">
              {org.roles.map((role, j) => (
                <div key={j} className="flex justify-between items-center text-sm">
                  <span className={role.title !== "Member" ? "text-primary font-medium" : "text-muted-foreground"}>
                    {role.title}
                  </span>
                  <span className="text-muted-foreground text-xs font-heading">{role.period}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coursework */}
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <GraduationCap className="h-7 w-7" />
        Coursework
      </h2>
      <div className="space-y-6">
        {coursework.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-xl bg-card border border-border"
          >
            <h3 className="font-semibold mb-3">{cat.name}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.courses.map((course) => (
                <Badge key={course} variant="secondary" className="text-xs">
                  {course}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsSection;
