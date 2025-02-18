import { useState, useEffect } from 'react';

export const useCurrentSection = (sections: { id: string }[]) => {
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const currentSectionId = sections.find((section, index) => {
        const element = document.getElementById(section.id);
        const nextElement = index < sections.length - 1 
          ? document.getElementById(sections[index + 1].id) 
          : null;

        if (!element) return false;

        const elementTop = element.offsetTop;
        const elementBottom = nextElement 
          ? nextElement.offsetTop 
          : document.documentElement.scrollHeight;

        return scrollPosition >= elementTop - 100 && 
               scrollPosition < elementBottom - 100;
      })?.id;

      if (currentSectionId && currentSectionId !== currentSection) {
        setCurrentSection(currentSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, currentSection]);

  return currentSection;
};
