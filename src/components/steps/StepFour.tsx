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
    <div className={className}>
      <div className="space-y-6 w-full max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Select Study Methods
          </h3>
          <p className="text-gray-400">
            Choose one or more methods that suit your learning style
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                  relative overflow-hidden rounded-lg p-4 cursor-pointer
                  transition-colors duration-300
                  ${
                    isSelected
                      ? "bg-primary/20 border-primary"
                      : "bg-gray-800/50 border-gray-700"
                  }
                  border-2
                `}
              >
                <div className="relative z-10">
                  <Icon
                    className={`h-6 w-6 mb-2 ${
                      isSelected ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  <h3 className="text-base font-semibold text-white mb-1">
                    {method.title}
                  </h3>
                  <p className="text-xs text-gray-400">{method.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepFour;