import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "@/data/achievements";

const AchievementsSection = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Achievements</h2>
      <div className="space-y-6">
        {achievements.map((ach, i) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-accent" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{ach.title}</h3>
              <p className="text-sm text-muted-foreground font-heading">{ach.organization} · {ach.date}</p>
              <p className="text-muted-foreground mt-1">{ach.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsSection;
