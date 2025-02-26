import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Stepper from "./Stepper";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import { appendArticle } from "@/services/AppendArticle";

interface WorkflowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkflowModal: React.FC<WorkflowModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [textPrompt, setTextPrompt] = useState("");
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState(1);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  // Reset all state when modal is closed
  useEffect(() => {
    if (!open) {
      setCurrentStep(1);
      setSelectedFiles([]);
      setTextPrompt("");
      setSelectedMethods([]);
      setSkillLevel(1);
    }
  }, [open]);

  // Set welcome message only when modal is opened
  useEffect(() => {
    if (open && !welcomeMessage) {
      setWelcomeMessage(
        "Welcome to your learning journey! Let's make this an exciting and productive experience. 🚀"
      );
    }
  }, [open, welcomeMessage]);
  const handleNext = async () => {
    if (currentStep === 1 && selectedFiles.length === 0) {
      // Show error or notification that at least one PDF is required
      return;
    }

    if (currentStep === 1) {
      // Make API call for each selected file in the background
      selectedFiles.forEach(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("document_type", "book");
        formData.append("document_name", file.name.replace(".pdf", ""));
        formData.append("extract_images", "true");
        formData.append("extract_text", "true");
        formData.append("save_json", "true");

        try {
          const response = await fetch(
            "http://localhost:5000/api/upload_and_process",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Upload failed");
          }

          const data = await response.json();
          console.log("Upload successful:", data);
        } catch (error) {
          console.error("Upload error:", error);
          // Continue to next step even if upload fails
        }
      });
    }

    if (currentStep === 2) {
      // Validate text prompt before saving
      if (!textPrompt || !textPrompt.trim()) {
        console.error("Text prompt cannot be empty");
        return;
      }
      // Save text prompt to Supabase articles table
      try {
        const { error } = await appendArticle({
          article_name: textPrompt.trim(),
        });
        if (error) {
          console.error("Error saving article:", error);
          return;
        }
      } catch (error) {
        console.error("Error saving article:", error);
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log({
      selectedFiles,
      textPrompt,
      selectedMethods,
      skillLevel,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/30 backdrop-blur-[10px]" />
      <DialogContent
        className="
          max-w-[600px] max-h-[704px] 
          bg-gray-900/95 border-gray-800 
          backdrop-blur-lg
          overflow-y-auto
          fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
          shadow-xl
          animate-in fade-in-0 zoom-in-95
        "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Create Learning Flow
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Follow the steps to create your personalized learning experience
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Stepper currentStep={currentStep} totalSteps={5} />
        </div>

        <div className="mt-8 min-h-[400px] overflow-y-auto">
          {currentStep === 1 && (
            <StepOne
              selectedFiles={selectedFiles}
              onFilesChange={setSelectedFiles}
              className="animate-in fade-in-50"
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              textPrompt={textPrompt}
              onTextPromptChange={setTextPrompt}
              className="animate-in fade-in-50"
            />
          )}
          {currentStep === 3 && (
            <StepThree
              className="animate-in fade-in-50"
              welcomeMessage={welcomeMessage}
            />
          )}
          {currentStep === 4 && (
            <StepFour
              selectedMethods={selectedMethods}
              onMethodsChange={setSelectedMethods}
              className="animate-in fade-in-50"
            />
          )}
          {currentStep === 5 && (
            <StepFive
              skillLevel={skillLevel}
              onSkillLevelChange={setSkillLevel}
              className="animate-in fade-in-50"
            />
          )}
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          {currentStep < 5 ? (
            <Button
              onClick={handleNext}
              disabled={currentStep === 1 && selectedFiles.length === 0}
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleComplete}>Complete</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowModal;
