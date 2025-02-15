import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Upload, Trash2 } from "lucide-react";
import { Progress } from "../ui/progress";

interface StepOneProps {
  className?: string;
  selectedFiles: File[];
  onFilesChange: (files: File[]) => void;
}

const StepOne: React.FC<StepOneProps> = ({
  className,
  selectedFiles,
  onFilesChange,
}) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const newFiles = [...selectedFiles];
      newFiles[index] = file;
      onFilesChange(newFiles);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: progress,
        }));
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 300);
    },
    [selectedFiles, onFilesChange]
  );

  const handleRemoveFile = useCallback(
    (index: number) => {
      const newFiles = [...selectedFiles];
      if (newFiles[index]) {
        const fileName = newFiles[index].name;
        newFiles[index] = undefined;
        onFilesChange(newFiles.filter(Boolean));
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[fileName];
          return newProgress;
        });
      }
    },
    [selectedFiles, onFilesChange]
  );

  return (
    <div className={className}>
      <div className="space-y-6 w-full max-w-lg mx-auto">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            Upload PDF Files
          </h3>
          <p className="text-gray-400">
            Upload two PDF files to continue (at least one is required)
          </p>
        </div>

        <div className="space-y-4">
          {[0, 1].map((index) => (
            <div key={index} className="space-y-2">
              <p className="text-sm text-gray-400">
                PDF {index + 1} {index === 0 ? "(Required)" : "(Optional)"}
              </p>
              {!selectedFiles[index] ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, index)}
                    accept=".pdf"
                    className="hidden"
                    id={`file-upload-${index}`}
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">
                      Click to upload PDF file {index + 1}
                    </span>
                  </label>
                </div>
              ) : (
                <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-white truncate">
                        {selectedFiles[index].name}
                      </span>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <Progress
                      value={uploadProgress[selectedFiles[index].name] || 0}
                      className="h-1"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepOne;