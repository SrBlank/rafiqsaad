import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { profile } from "@/data/profile";

const Footer = () => (
  <footer className="border-t border-border mt-16 py-8">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <div className="flex items-center gap-4">
        <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors" aria-label="Email">
          <Mail className="h-4 w-4" />
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="GitHub">
          <FaGithub className="h-4 w-4" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
          <FaLinkedinIn className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
