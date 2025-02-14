import React, { useEffect, useState, useRef } from 'react';
import { Pencil } from 'lucide-react';

interface SecondModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  flowStartTime?: number;
}

const welcomeMessages = [
  "Welcome to an exciting adventure! 📚✨\nYour learning journey begins here, and we're thrilled to be part of it. Let's dive into the knowledge that awaits you!",
  "Welcome aboard! 🎉Ready to explore, learn, and grow?\nLet's make this journey through knowledge unforgettable.\nYour adventure starts now!",
  "Hello and welcome! 🌟\nYou've just unlocked a treasure trove of knowledge. Let's take the first step toward an exciting and interactive learning experience!",
  "Welcome to a world of discovery! 🌍📖\nReady to turn pages and explore ideas? Your journey of learning and growth starts right here!",
  "It's time to start your learning adventure! 🚀\nWith every page you turn, new insights will unfold. Let's get started and make this journey amazing!",
  "Welcome, explorer of knowledge! 🧭\nYour course materials are ready, and so are we. Let's navigate through this learning journey and make it an exciting experience!",
  "Hello, and welcome to your personal learning space! 🌱\nEvery new chapter is an opportunity. Get ready for an interactive and exciting journey of growth!",
  "Welcome to your learning adventure! 🌟\nThe journey ahead is full of discoveries, challenges, and rewards. Let's make every moment count together!",
  "Welcome! 🚀\nYou're about to embark on a thrilling learning experience, and we're here every step of the way.\nLet's make it exciting and memorable!",
  "Congratulations on starting your journey! 📚✨\nYou're about to unlock new knowledge in the most engaging way. Let's get started and explore everything that's waiting for you!"
];

const topics = [
  { name: "Linear regression", color: "#FF6B6B" },
  { name: "Logistic regression", color: "#4ECDC4" },
  { name: "KNN", color: "#45B7D1" },
  { name: "Decision tree", color: "#96CEB4" },
  { name: "K-means", color: "#FFEEAD" },
  { name: "CNN", color: "#D4A5A5" },
  { name: "LSTM", color: "#9B9B9B" }
];

const SecondModal: React.FC<SecondModalProps> = ({ isOpen, onClose, onBack, onNext, flowStartTime }) => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [lastFlowTime, setLastFlowTime] = useState<number>(0);
  const [courseTitle, setCourseTitle] = useState<string>("Course Title");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && flowStartTime && flowStartTime !== lastFlowTime) {
      const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      setWelcomeMessage(randomMessage);
      setLastFlowTime(flowStartTime);
    }
  }, [isOpen, flowStartTime, lastFlowTime]);
  const messageLines = welcomeMessage.split('\n');

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl h-[610px] bg-black border border-gray-700 rounded-xl shadow-lg overflow-y-auto z-[10000]">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div className="w-7"></div> {/* Spacer to balance the close button */}
            <h3 className="font-bold text-white text-center flex-grow">
              Welcome!
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
              <div className="text-lg text-gray-200 font-medium text-center mb-6 space-y-2">
                {messageLines.map((line, index) => (
                  <p key={index} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              <hr />
              {/* Editable Course Title */}
              <div className="flex items-center justify-center gap-2 mb-6 w-full">
                {isEditing ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={courseTitle}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleKeyDown}
                    className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-center w-64"
                  />
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    <h1 className= "font-semibold text-white text-center">{courseTitle}</h1>
                    <button onClick={handleEditClick} className="text-gray-400 hover:text-white ">
                      <Pencil size={26} />
                    </button>
                  </div>
                )}
              </div><br />
                
              {/* Topics Label */}
              <h2 className="text-xl font-bold text-white text-center mb-4">Topics Detected</h2>
              {/* Topic Pills */}
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: topic.color }}
                    className="px-4 py-2 rounded-lg text-black font-medium shadow-md transform hover:scale-105 transition-transform duration-200"
                  >
                    {topic.name}
                  </div>
                ))}
              </div>

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
              onClick={onNext}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-700 text-white hover:bg-green-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondModal;