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
    <div
      className={`${className} px-6 py-8 rounded-xl backdrop-blur-sm bg-gray-900/30 border border-gray-800/50`}
    >
      <div className="space-y-8 w-full max-w-3xl mx-auto">
        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Enter Text Prompt
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Provide a detailed prompt to guide the learning process
          </p>
        </div>

        <div className="relative group">
          <Textarea
            value={textPrompt}
            onChange={(e) => onTextPromptChange(e.target.value)}
            placeholder="Enter your text prompt here..."
            className="min-h-[200px] bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-500
              focus:ring-2 focus:ring-primary/50 focus:border-primary/50
              hover:bg-gray-800/40 hover:border-gray-600/50
              transition-all duration-300 ease-in-out
              rounded-xl shadow-lg
              resize-none
              p-4"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 ease-in-out" />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
