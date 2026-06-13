import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/data/profile";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ["Home", "Experience", "Projects", "Presentations", "Academic"];

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        <span className="font-heading text-lg font-bold tracking-tight">
          {profile.name}
        </span>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="gap-2">
            <a href={profile.resumeUrl} download>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex overflow-x-auto border-t border-border px-4 gap-1 py-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
