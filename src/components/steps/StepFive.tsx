import React from "react";
import { Slider } from "../ui/slider";

interface StepFiveProps {
  className?: string;
  skillLevel: number;
  onSkillLevelChange: (value: number) => void;
}

const skillLevels = [
  "Beginner",
  "Elementary",
  "Intermediate",
  "Advanced",
  "Expert",
];

const StepFive: React.FC<StepFiveProps> = ({
  className,
  skillLevel,
  onSkillLevelChange,
}) => {
  return (
    <div className={`${className} px-6 py-8 rounded-xl backdrop-blur-sm bg-gray-900/30 border border-gray-800/50`}>
      <div className="space-y-10 w-full max-w-2xl mx-auto">
        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Select Your Skill Level
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Help us tailor the content to your experience
          </p>
        </div>

        <div className="space-y-10">
          <div className="text-center transform transition-all duration-300">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 transition-all duration-300">
              {skillLevels[skillLevel - 1]}
            </span>
          </div>

          <div className="px-4 space-y-8">
            <div className="relative group">
              <Slider
                value={[skillLevel]}
                onValueChange={(value) => onSkillLevelChange(value[0])}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="absolute inset-0 -mx-2 -my-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex justify-between">
              {skillLevels.map((level, index) => (
                <div
                  key={level}
                  className={`text-sm font-medium transition-all duration-300 transform cursor-default
                    ${index + 1 === skillLevel
                      ? "text-primary scale-110 font-semibold"
                      : "text-gray-500 hover:text-gray-300"}
                  `}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;