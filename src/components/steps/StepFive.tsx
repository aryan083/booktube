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
    <div className={className}>
      <div className="space-y-8 w-full max-w-2xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            Select Your Skill Level
          </h3>
          <p className="text-gray-400">
            Help us tailor the content to your experience
          </p>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <span className="text-2xl font-semibold text-white">
              {skillLevels[skillLevel - 1]}
            </span>
          </div>

          <div className="px-4">
            <Slider
              value={[skillLevel]}
              onValueChange={(value) => onSkillLevelChange(value[0])}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />

            <div className="flex justify-between mt-2">
              {skillLevels.map((level, index) => (
                <div
                  key={level}
                  className={`text-sm transition-colors duration-200 ${
                    index + 1 === skillLevel
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
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