import React from 'react';

interface SecondModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const SecondModal: React.FC<SecondModalProps> = ({ isOpen, onClose, onBack }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl h-[550px] bg-black border border-gray-700 rounded-xl shadow-lg overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h3 className="font-bold text-white">
            Second Step
          </h3>
          <button
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
            <p className="text-gray-200">This is the second step content.</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-700">
          <button
            type="button"
            onClick={onBack}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-transparent text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-700 text-white hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondModal;
