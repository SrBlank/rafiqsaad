import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeSection from "@/components/sections/HomeSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PresentationsSection from "@/components/sections/PresentationsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";

const sections: Record<string, React.FC> = {
  Experience: ExperienceSection,
  Projects: ProjectsSection,
  Presentations: PresentationsSection,
  Academic: AchievementsSection,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const ActiveSection = sections[activeTab];

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {activeTab === "Home" ? (
          <HomeSection onTabChange={setActiveTab} />
        ) : (
          <ActiveSection />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
