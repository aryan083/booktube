import React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center w-full">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <div className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                  isActive && "bg-primary text-white",
                  isCompleted && "bg-primary/20 text-primary",
                  !isActive && !isCompleted && "bg-gray-200 text-gray-500"
                )}
              >
                {stepNumber}
              </div>
              <div className="text-sm ml-2 hidden sm:block">
                {`Step ${stepNumber}`}
              </div>
            </div>
            {stepNumber < totalSteps && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-all duration-200",
                  stepNumber < currentStep
                    ? "bg-primary"
                    : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;