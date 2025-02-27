import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onNext,
}) => {
  const [files, setFiles] = useState<{
    [key: string]: { file: File; progress: number };
  }>({});

  const handleFileChange = (type: "pdf1" | "pdf2", file: File | null) => {
    if (!file) return;

    setFiles((prev) => ({
      ...prev,
      [type]: { file, progress: 0 },
    }));

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setFiles((prev) => ({
          ...prev,
          [type]: {
            ...prev[type]!,
            progress,
          },
        }));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("Upload completed");
      }
    };

    xhr.onerror = () => {
      console.error("Upload failed");
    };

    xhr.send(formData);
  };

  const handleCancel = () => {
    // Clear the uploaded files from the state
    setFiles({});
    // Close the modal or navigate back
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl h-[610px] bg-black border border-gray-700 rounded-xl shadow-lg overflow-y-auto z-[10000]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            {/* <div className="flex-grow text-center">
              <h3 className="font-bold text-white">
                Upload PDF Files
              </h3>
            </div> */}
            <button
              type="button"
              onClick={onClose}
              className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {["pdf1", "pdf2"].map((type, index) => (
              <div key={type} className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">
                  {index === 0 ? "Upload Course PDF" : "Upload Book PDF"}
                </label>
                <div
                  className="relative flex items-center p-7 bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600"
                  role="button"
                >
                  {!files[type] ? (
                    <>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                          handleFileChange(
                            type as "pdf1" | "pdf2",
                            e.target.files?.[0] || null
                          )
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center w-full">
                        <span className="inline-flex justify-center items-center size-20 bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-700 dark:text-neutral-200">
                          <svg
                            className="shrink-0 size-5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" x2="12" y1="3" y2="15"></line>
                          </svg>
                        </span>
                        <div className="mt-4 text-center text-sm leading-6 text-gray-600">
                          <span className="pe-1 font-medium text-gray-800 dark:text-neutral-200">
                            Drop your file here or
                          </span>
                          <span className="bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600">
                            browse
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between w-full">
                      <div>
                        <span className="block text-sm font-semibold text-white">
                          {files[type].file.name}
                        </span>
                        <span className="block text-sm text-gray-400">
                          {files[type].file.size < 1024
                            ? `${files[type].file.size} B`
                            : files[type].file.size < 1048576
                            ? `${(files[type].file.size / 1024).toFixed(2)} KB`
                            : files[type].file.size < 1073741824
                            ? `${(files[type].file.size / 1048576).toFixed(
                                2
                              )} MB`
                            : `${(files[type].file.size / 1073741824).toFixed(
                                2
                              )} GB`}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setFiles((prev) => {
                            const newFiles = { ...prev };
                            delete newFiles[type];
                            return newFiles;
                          });
                        }}
                        className="text-gray-400 hover:text-red-500 dark:text-neutral-200 dark:hover:text-white dark:hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  )}
                </div>

                {files[type] && (
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="flex flex-col justify-center overflow-hidden"
                        role="progressbar"
                        style={{
                          width: `${files[type].progress}%`,
                          background:
                            "linear-gradient(to left, #4caf50, #81c784)",
                        }}
                        aria-valuenow={files[type].progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-400">
                      {files[type].progress}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-700">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-transparent text-gray-400 hover:bg-red-700 hover:text-black dark:text-neutral-200 dark:hover:bg-red-600 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={Object.keys(files).length === 0}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-gray-700 text-white hover:bg-green-600 hover:text-black dark:bg-gray-800 dark:text-white dark:hover:bg-green-500 disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
