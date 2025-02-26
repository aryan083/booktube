import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Image,
  ListOrdered,
  Newspaper,
  Pencil,
  MessageSquare,
} from "lucide-react";

interface StepFourProps {
  className?: string;
  selectedMethods: string[];
  onMethodsChange: (methods: string[]) => void;
}

const studyMethods = [
  {
    id: "bullet-points",
    title: "Bullet Points",
    description: "Concise, organized learning points",
    icon: ListOrdered,
  },
  {
    id: "story",
    title: "Story",
    description: "Learn through narrative and context",
    icon: MessageSquare,
  },
  {
    id: "illustration",
    title: "Illustration",
    description: "Visual learning with diagrams",
    icon: Image,
  },
  {
    id: "examples",
    title: "Examples",
    description: "Practice with real-world cases",
    icon: BookOpen,
  },
  {
    id: "news",
    title: "News",
    description: "Current events and applications",
    icon: Newspaper,
  },
  {
    id: "pictorial",
    title: "Pictorial",
    description: "Image-based learning approach",
    icon: Pencil,
  },
];

const StepFour: React.FC<StepFourProps> = ({
  className,
  selectedMethods,
  onMethodsChange,
}) => {
  const handleMethodClick = (methodId: string) => {
    if (selectedMethods.includes(methodId)) {
      onMethodsChange(selectedMethods.filter((id) => id !== methodId));
    } else {
      onMethodsChange([...selectedMethods, methodId]);
    }
  };

  return (
    <div
      className={`${className} px-6 py-8 rounded-xl backdrop-blur-sm bg-gray-900/30 border border-gray-800/50`}
    >
      <div className="space-y-8 w-full max-w-3xl mx-auto">
        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Select Study Methods
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Choose one or more methods that suit your learning style
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {studyMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethods.includes(method.id);

            return (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMethodClick(method.id)}
                className={`
                  relative overflow-hidden rounded-xl p-5
                  cursor-pointer
                  transition-all duration-300 ease-in-out
                  border backdrop-blur-md
                  ${
                    isSelected
                      ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/20"
                      : "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/80"
                  }
                `}
              >
                <div className="relative z-10 space-y-3">
                  <div
                    className={`p-2 rounded-lg inline-block ${
                      isSelected ? "bg-primary/20" : "bg-gray-800/80"
                    } transition-colors duration-300`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        isSelected ? "text-primary" : "text-gray-400"
                      } 
                      transition-colors duration-300`}
                    />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {method.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {method.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent animate-pulse" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepFour;
