import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  sections: { id: string; title: string }[];
  currentSection: string;
}

export const TableOfContents = ({ sections, currentSection }: TableOfContentsProps) => {
  return (
    <div className="glass fixed right-8 top-8 p-4 rounded-lg w-64 hidden xl:block">
      <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
      <nav className="space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "flex items-center text-sm hover:text-primary transition-colors",
              currentSection === section.id
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            <ChevronRight
              className={cn(
                "w-4 h-4 mr-2 transition-transform",
                currentSection === section.id && "rotate-90"
              )}
            />
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  );
};