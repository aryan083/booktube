import React, { useCallback, useState } from "react";
// import { Button } from "../ui/button";
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
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );

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
    <div className={`${className} px-6 py-8 rounded-xl backdrop-blur-sm bg-gray-900/30 border border-gray-800/50`}>
      <div className="space-y-8 w-full max-w-lg mx-auto">
        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Upload PDF Files
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Upload two PDF files to continue (at least one is required)
          </p>
        </div>

        <div className="space-y-6">
          {[0, 1].map((index) => (
            <div key={index} className="space-y-3 transition-all duration-300">
              <p className="text-sm font-medium text-gray-400 flex items-center gap-2">
                PDF {index + 1}
                <span className={`text-xs px-2 py-0.5 rounded-full ${index === 0 ? 'bg-primary/20 text-primary' : 'bg-gray-700/50 text-gray-400'}`}>
                  {index === 0 ? "Required" : "Optional"}
                </span>
              </p>
              {!selectedFiles[index] ? (
                <div className="group border-2 border-dashed border-gray-700/50 hover:border-primary/50 rounded-xl p-8 text-center transition-all duration-300 hover:bg-gray-800/20">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, index)}
                    accept=".pdf"
                    className="hidden"
                    id={`file-upload-${index}`}
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="cursor-pointer flex flex-col items-center gap-3 group-hover:scale-105 transition-transform duration-300"
                  >
                    <div className="p-3 rounded-full bg-gray-800/80 group-hover:bg-primary/20 transition-colors duration-300">
                      <Upload className="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-primary transition-colors duration-300">
                      Click to upload PDF file {index + 1}
                    </span>
                  </label>
                </div>
              ) : (
                <div className="bg-gray-800/30 hover:bg-gray-800/50 rounded-xl p-5 transition-all duration-300 border border-gray-700/50">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-white truncate flex-1 mr-3">
                        {selectedFiles[index].name}
                      </span>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <Progress
                      value={uploadProgress[selectedFiles[index].name] || 0}
                      className="h-1 bg-gray-700/50"
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
