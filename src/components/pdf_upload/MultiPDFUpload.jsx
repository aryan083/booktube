import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';

const MultiPDFUpload = () => {
  const [bookFile, setBookFile] = useState(null);
  const [courseFile, setCourseFile] = useState(null);
  const [textInput, setTextInput] = useState('');

  const handleBookFileChange = (event) => {
    const file = event.target.files[0];
    setBookFile(file);
  };

  const handleCourseFileChange = (event) => {
    const file = event.target.files[0];
    setCourseFile(file);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleBookDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setBookFile(file);
    }
  };

  const handleCourseDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setCourseFile(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // API call logic will be implemented later
    console.log('Book file:', bookFile);
    console.log('Course file:', courseFile);
    console.log('Text input:', textInput);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gray-50 rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center text-blue-600">Upload Your PDFs</h1>
      <div className="w-full space-y-4">
        <div className="border-2 border-dashed border-blue-400 p-4 rounded-lg flex flex-col items-center transition hover:bg-blue-100" onDragOver={(e) => e.preventDefault()} onDrop={handleBookDrop}>
          <FaFilePdf className="text-4xl text-blue-400 mb-2" />
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Upload Book PDF</h2>
          <input type="file" accept=".pdf" onChange={handleBookFileChange} id="book-upload" className="hidden" />
          <label htmlFor="book-upload" className="cursor-pointer text-gray-600 text-center">
            {bookFile ? `Selected: ${bookFile.name}` : 'Drag and Drop PDF or Click to Select'}
          </label>
        </div>
        <div className="border-2 border-dashed border-blue-400 p-4 rounded-lg flex flex-col items-center transition hover:bg-blue-100" onDragOver={(e) => e.preventDefault()} onDrop={handleCourseDrop}>
          <FaFilePdf className="text-4xl text-blue-400 mb-2" />
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Upload Course PDF</h2>
          <input type="file" accept=".pdf" onChange={handleCourseFileChange} id="course-upload" className="hidden" />
          <label htmlFor="course-upload" className="cursor-pointer text-gray-600 text-center">
            {courseFile ? `Selected: ${courseFile.name}` : 'Drag and Drop PDF or Click to Select'}
          </label>
        </div>
      </div>
      <input type="text" value={textInput} onChange={handleTextInputChange} placeholder="Enter additional info" className="border border-gray-300 p-3 w-full rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" />
      <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
        Submit
      </button>
      <div className="output-container border p-4 w-full max-w-md mt-4 rounded-lg shadow-sm bg-white">
        <h2 className="text-lg font-semibold text-gray-800">Output</h2>
        <p className="text-gray-700"><strong>Book File:</strong> {bookFile ? bookFile.name : 'No file selected'}</p>
        <p className="text-gray-700"><strong>Course File:</strong> {courseFile ? courseFile.name : 'No file selected'}</p>
        <p className="text-gray-700"><strong>Text Input:</strong> {textInput || 'No input provided'}</p>
      </div>
    </div>
  );
};

export default MultiPDFUpload;