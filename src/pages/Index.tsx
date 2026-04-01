import { useState } from "react";
import Header from "@/components/Header";
import HomeSection from "@/components/sections/HomeSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PresentationsSection from "@/components/sections/PresentationsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";

const sections: Record<string, React.FC> = {
  Home: HomeSection,
  Experience: ExperienceSection,
  Projects: ProjectsSection,
  Presentations: PresentationsSection,
  Achievements: AchievementsSection,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const ActiveSection = sections[activeTab];

  return (
    <div className="min-h-screen">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        <ActiveSection />
      </main>
    </div>
  );
};

export default Index;
