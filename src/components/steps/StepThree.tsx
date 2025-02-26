import React, { useState, useEffect, useRef } from "react";
import { Edit2 } from "lucide-react";

interface StepThreeProps {
  className?: string;
  welcomeMessage: string;
}

const topics = [
  { name: "Linear regression", color: "#FF6B6B" },
  { name: "Logistic regression", color: "#4ECDC4" },
  { name: "KNN", color: "#45B7D1" },
  { name: "Decision tree", color: "#96CEB4" },
  { name: "K-means", color: "#FFEEAD" },
  { name: "CNN", color: "#D4A5A5" },
  { name: "LSTM", color: "#9B9B9B" },
];

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
    <div
      className={`${className} px-6 py-8 rounded-xl backdrop-blur-sm bg-gray-900/30 border border-gray-800/50`}
    >
      <div className="space-y-8 w-full max-w-3xl mx-auto">
        <div className="text-center space-y-6">
          <div className="relative inline-flex items-center justify-center gap-3 group">
            {isEditing ? (
              <input
                ref={inputRef}
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                className="text-2xl font-bold text-white bg-transparent border-b-2 border-primary/50 focus:border-primary outline-none text-center w-full max-w-md px-4 py-1 transition-all duration-300"
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  {courseTitle}
                </h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-gray-800/60 text-gray-400 hover:text-primary transition-all duration-300"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            {messageLines.map((line, index) => (
              <p
                key={index}
                className="text-gray-300 mb-3 last:mb-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {topics.map((topic, index) => (
              <div
                key={topic.name}
                className="px-4 py-2 rounded-xl text-sm font-medium shadow-lg hover:scale-105 transition-all duration-300 cursor-default"
                style={{
                  backgroundColor: `${topic.color}15`,
                  color: topic.color,
                  border: `1px solid ${topic.color}30`,
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                }}
              >
                {topic.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default StepThree;
