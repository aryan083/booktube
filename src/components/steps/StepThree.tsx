import React, { useState, useEffect, useRef } from "react";
import { Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StepThreeProps {
  className?: string;
  welcomeMessage: string;
}

const topics = [
  { name: "Linear regression", color: "#FF6B6B", size: 1 },
  { name: "Logistic regression", color: "#4ECDC4", size: 1 },
  { name: "KNN", color: "#45B7D1", size: 1 },
  { name: "Decision tree", color: "#96CEB4", size: 1 },
  { name: "K-means", color: "#FFEEAD", size: 1 },
  { name: "CNN", color: "#D4A5A5", size: 1 },
  { name: "LSTM", color: "#9B9B9B", size: 1 },
];

const floatingAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const StepThree: React.FC<StepThreeProps> = ({ className, welcomeMessage }) => {
  const [courseTitle, setCourseTitle] = useState(
    "Machine Learning Fundamentals"
  );
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

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
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                className="text-2xl md:text-4xl font-bold text-white bg-transparent border-b-2 border-primary/50 focus:border-primary outline-none text-center w-full max-w-md px-4 py-2 transition-all duration-300"
              />
            ) : (
              <div className="flex items-center gap-3">
                <motion.h2
                  className="text-3xl md:text-3xl p-2 font-bold text-white bg-clip-text bg-gradient-to-r from-white to-white/80"
                  layoutId="courseTitle"
                >
                  {courseTitle}
                </motion.h2>
              </div>
            )}
          </motion.div>

          <motion.div
            className="relative bg-zinc-800/30 backdrop-blur-xl rounded-2xl p-6 border border-zinc-700/50 hover:bg-zinc-800/40 transition-all duration-300 overflow-hidden"
            // whileHover={{ scale:  }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-zinc-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <AnimatePresence>
              {messageLines.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="text-gray-300 mb-3 last:mb-0 text-sm md:text-base leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center py-4">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.name}
                className="relative px-4 py-2 rounded-xl text-sm md:text-base font-medium shadow-lg"
                style={{
                  backgroundColor: `${topic.color}15`,
                  border: `1px solid ${topic.color}30`,
                }}
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.2 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${topic.color}25`,
                  transition: { duration: 0.2 },
                }}
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StepThree;
