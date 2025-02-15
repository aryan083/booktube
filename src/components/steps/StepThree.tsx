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
  const [courseTitle, setCourseTitle] = useState("Machine Learning Fundamentals");
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
      <div className="space-y-8 w-full max-w-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {isEditing ? (
              <input
                ref={inputRef}
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                className="text-2xl font-bold text-white bg-transparent border-b-2 border-primary outline-none text-center"
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white">{courseTitle}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            {messageLines.map((line, index) => (
              <p
                key={index}
                className="text-gray-300 mb-2 last:mb-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {topics.map((topic, index) => (
              <div
                key={topic.name}
                className="px-4 py-2 rounded-full text-sm animate-fade-in"
                style={{
                  backgroundColor: `${topic.color}20`,
                  color: topic.color,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {topic.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;