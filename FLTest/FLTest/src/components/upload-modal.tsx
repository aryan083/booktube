import React, { useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [files, setFiles] = useState<{ [key: string]: { file: File; progress: number } }>({});

  const handleFileChange = async (type: 'pdf1' | 'pdf2', file: File | null) => {
    if (!file) return;

    setFiles(prev => ({
      ...prev,
      [type]: {
        file,
        progress: 0
      }
    }));

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload', true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setFiles(prev => ({
            ...prev,
            [type]: {
              ...prev[type]!,
              progress
            }
          }));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log('Upload completed');
        }
      };

      xhr.onerror = () => {
        console.error('Upload failed');
      };

      xhr.send(formData);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl h-[550px] bg-black border border-gray-700 rounded-xl shadow-lg overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h3 className="font-bold text-white">
              Upload PDF Files
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <span className="sr-only">Close</span>
              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">
            <div className="space-y-4">
              {/* Upload sections */}
              {['pdf1', 'pdf2'].map((type, index) => (
                <div key={type}>
                  <label className="block text-sm font-medium mb-2 text-gray-200">
                    {index === 0 ? 'Upload Course PDF' : 'Upload Book PDF'}
                  </label>
                  <div className="relative">
                    {!files[type] ? (
                      <label className="group block cursor-pointer text-center border-2 border-dashed border-gray-700 rounded-lg p-6 hover:border-gray-500">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(type as 'pdf1' | 'pdf2', e.target.files?.[0] || null)}
                          className="block w-full text-sm text-gray-400 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                        />
                        <svg className="mx-auto h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                        <span className="mt-2 block text-sm text-gray-400">Browse PDF</span>
                      </label>
                    ) : (
                      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-x-4">
                          <div className="flex-shrink-0 size-8 rounded-lg border border-gray-700 bg-gray-800 flex items-center justify-center">
                            <svg className="size-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                              <polyline points="14 2 14 8 20 8"/>
                            </svg>
                          </div>

                          <div className="grow">
                            <span className="block text-sm font-semibold text-white">{files[type].file.name}</span>
                            <span className="block text-sm text-gray-400">{(files[type].file.size / 1024).toFixed(2)} KB</span>
                          </div>

                          <div className="flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => setFiles(prev => {
                                const newFiles = { ...prev };
                                delete newFiles[type];
                                return newFiles;
                              })}
                              className="inline-flex items-center justify-center size-15 rounded-lg border border-transparent text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                              <span className="sr-only">Delete</span>
                              {/* <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              </svg> */}Remove
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-x-2">
                          <div className="flex w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="flex flex-col justify-center overflow-hidden bg-gray-400"
                              role="progressbar"
                              style={{ width: `${files[type].progress}%` }}
                              aria-valuenow={files[type].progress}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                          <div className="w-6 text-end">
                            <span className="text-sm text-gray-400">{files[type].progress}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-transparent text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onUpload();
                onClose();
              }}
              disabled={Object.keys(files).length === 0}
              className="bg-green-700 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
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
