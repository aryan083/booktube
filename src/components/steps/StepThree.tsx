import React, { useState, useEffect, useRef } from "react";
import { Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StepThreeProps {
  className?: string;
  welcomeMessage: string;
  courseTitle: string;
  technicalTerms: Array<{
    name: string;
    color: string;
  }>;
  isProcessing: boolean;
}

// Array of distinct colors for pills
const pillColors = [
  "#FF6B6B",  // Red
  "#4ECDC4",  // Teal
  "#45B7D1",  // Blue
  "#96CEB4",  // Green
  "#FFEEAD",  // Yellow
  "#D4A5A5",  // Pink
  "#9B59B6",  // Purple
  "#3498DB",  // Light Blue
  "#E67E22",  // Orange
  "#2ECC71"   // Emerald
];

/**
 * StepThree Component - Displays course title, welcome message, and technical skills
 * @param {StepThreeProps} props - Component props containing welcome message, course title and technical terms
 * @returns {JSX.Element} Rendered component with animated technical skill pills
 */
const StepThree: React.FC<StepThreeProps> = ({ className, welcomeMessage, courseTitle: initialTitle, technicalTerms, isProcessing }) => {
  const [editableTitle, setEditableTitle] = useState(initialTitle || "Enter Course Title");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayedTerms, setDisplayedTerms] = useState<Array<{
    name: string;
    color: string;
  }>>([]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Update title when prop changes
  useEffect(() => {
    if (initialTitle) {
      setEditableTitle(initialTitle);
    }
  }, [initialTitle]);

  useEffect(() => {
    // Process the technical terms and ensure we have exactly 10 items
    let terms = [...technicalTerms]
      .filter(term => term.name && term.name.trim())
      .slice(0, 10)
      .map(term => ({
        name: term.name.trim(),
        color: term.color
      }));

    // Fill remaining slots with loading placeholders
    while (terms.length < 10) {
      const index = terms.length;
      terms.push({
        name: `Technical Skill ${index + 1}`,
        color: pillColors[index % pillColors.length]
      });
    }

    setDisplayedTerms(terms);
  }, [technicalTerms]);

  const messageLines = welcomeMessage.split("\n");

  return (
    <div className={className}>
      <motion.div
        className="space-y-8 w-full max-w-4xl mx-auto relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center space-y-6 relative z-10">
          <motion.div
            className="relative inline-flex items-center justify-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {isEditing ? (
              <input
                ref={inputRef}
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                className="text-2xl md:text-4xl font-bold text-white bg-transparent border-b-2 border-primary/50 focus:border-primary outline-none text-center w-full max-w-md px-4 py-2 transition-all duration-300"
              />
            ) : (
              <div className="flex items-center gap-3">
                <motion.h2
                  className="text-3xl md:text-3xl p-2 font-bold text-white bg-clip-text bg-gradient-to-r from-white to-white/80"
                  layoutId="courseTitle"
                >
                  {editableTitle}
                </motion.h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  <Edit2 size={20} />
                </button>
              </div>
            )}
          </motion.div>

          <motion.div
            className="relative bg-zinc-800/30 backdrop-blur-xl rounded-2xl p-6 border border-zinc-700/50 hover:bg-zinc-800/40 transition-all duration-300 overflow-hidden"
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-zinc-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <AnimatePresence mode="wait">
              {messageLines.map((line, index) => (
                <motion.p
                  key={`message-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="text-gray-300 mb-3 last:mb-0 text-sm md:text-base leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              className="flex flex-wrap gap-3 justify-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isProcessing ? (
                <motion.div
                  className="text-center text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Processing your PDF...
                </motion.div>
              ) : (
                <AnimatePresence>
                  {displayedTerms.map((topic, index) => (
                    <motion.div
                      key={`term-${topic.name}-${index}`}
                      className={`relative px-4 py-2 rounded-xl text-sm md:text-base font-medium shadow-lg cursor-pointer ${
                        topic.name.startsWith('Technical Skill') ? 'animate-pulse opacity-50' : ''
                      }`}
                      style={{
                        backgroundColor: `${topic.color}15`,
                        border: `1px solid ${topic.color}30`,
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: `${topic.color}25`,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative z-10">
                        <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                          {topic.name}
                        </span>
                      </div>
                      <div
                        className="absolute inset-0 rounded-xl opacity-20"
                        style={{
                          background: `linear-gradient(45deg, ${topic.color}20, transparent)`,
                          filter: "blur(8px)",
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default StepThree;
