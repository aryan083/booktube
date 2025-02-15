import React from "react";
import { Textarea } from "../ui/textarea";

interface StepTwoProps {
  className?: string;
  textPrompt: string;
  onTextPromptChange: (value: string) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  className,
  textPrompt,
  onTextPromptChange,
}) => {
  return (
    <div className={className}>
      <div className="space-y-6 w-full max-w-3xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            Enter Text Prompt
          </h3>
          <p className="text-gray-400">
            Provide a detailed prompt to guide the learning process
          </p>
        </div>

        <Textarea
          value={textPrompt}
          onChange={(e) => onTextPromptChange(e.target.value)}
          placeholder="Enter your text prompt here..."
          className="min-h-[200px] bg-gray-800/50 border-gray-700 text-white"
        />
      </div>
    </div>
  );
};

export default StepTwo;