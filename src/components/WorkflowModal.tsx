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
import { Toast } from "@/components/ui/toast";
import Stepper from "./Stepper";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import { appendArticle } from "@/services/AppendArticle";
import { createCourse } from "@/services/courseService";
import { sendPdfToGemini } from "@/services/pdfService";
import { useAuth } from "@/contexts/AuthContext";

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
  const [courseTitle, setCourseTitle] = useState("");
  const [technicalTerms, setTechnicalTerms] = useState<Array<{ name: string; color: string }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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

  // const { toast } = useToast();
  const { user } = useAuth();

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

  const processPdfFile = async (file: File) => {
    try {
      if (!file) {
        console.error('No file provided');
        return;
      }

      setIsProcessing(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await sendPdfToGemini(formData);
      
      if (response) {
        setWelcomeMessage(response.welcome_message || '');
        setCourseTitle(response.course_title || '');
        // Extract all terms from the keywords response
        const { technical_terms = [], skills = [], technologies = [] } = response.keywords || {};
        
        // Combine all terms into a single array
        const allTerms = [
          ...technical_terms,
          ...skills,
          ...technologies
        ]
        .map(term => term.trim())
        .filter(term => term.length > 0);

        // Remove duplicates and map to objects with colors
        const uniqueTerms = Array.from(new Set(allTerms))
          .map((term, index) => ({
            name: term,
            color: pillColors[index % pillColors.length]
          }));

        setTechnicalTerms(uniqueTerms);
      }
    } catch (error) {
      console.error('Error processing PDF:', error);
      setWelcomeMessage('Error processing your PDF. Please try again.');
      setTechnicalTerms([]);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (selectedFiles.length > 1 && selectedFiles[1]) {
      console.log('Selected files changed, processing course PDF...');
      // Process only the course PDF (index 1)
      processPdfFile(selectedFiles[1]);
    }
  }, [selectedFiles]);


  const handleNext = async () => {
    if (currentStep === 5) {
      try {
        // First, save the course data to Supabase with only the required fields
        const courseData = {
          course_name: courseTitle, // Leave empty for now
          tags: {}, // Leave empty for now
          metadata: '', // Leave empty
          chapters_json: {}, // Leave empty
          skill_level: skillLevel,
          teaching_pattern: selectedMethods, // Only store the selected methods
          user_prompt: textPrompt,
          progress: 0 // Initial progress
        };

        const { error } = await createCourse(courseData);
        
        if (error) {
          console.error("Failed to save course data:", error);
          return;
        }

        // Then proceed with file processing
        if (selectedFiles.length > 0) {
          const formData = new FormData();
          selectedFiles.forEach((file) => {
            formData.append("files", file);
          });
          formData.append("prompt", textPrompt);
          formData.append("skill_level", skillLevel.toString());
          formData.append("teaching_pattern", JSON.stringify(selectedMethods));
        }
        
        onOpenChange(false);
      } catch (error) {
        console.error("Error in handleNext:", error);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
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
          max-w-[94vh] h-[94vh] 
          bg-zinc-900/95 border-zinc-800/50 
          backdrop-blur-lg
          fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
          shadow-xl
          animate-in fade-in-0 zoom-in-95
          p-5
          flex flex-col
        " 
      >
        <DialogHeader className="mb-0">
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Create Learning Flow
          </DialogTitle>
          {/* <DialogDescription className="text-gray-400">
            Follow the steps to create your personalized learning experience
          </DialogDescription> */}
        </DialogHeader>

        <div className="mt-2">
          <Stepper currentStep={currentStep} totalSteps={5} />
        </div>

        <div className="flex-1 overflow-y-auto mt-4 ">
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
              technicalTerms={technicalTerms}
              courseTitle={courseTitle}
              isProcessing={isProcessing}
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

        <div className=" flex justify-between bg-zinc  border-zinc-800 pt-0">
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
            <Button onClick={handleNext}>Complete</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowModal;
