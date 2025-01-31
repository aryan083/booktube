import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const MultiPDFUpload = () => {
    const [bookPdf, setBookPdf] = useState(null);
    const [learningList, setLearningList] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('bookPdf', bookPdf);
        formData.append('learningList', learningList);
        formData.append('prompt', prompt);

        setLoading(true); // Set loading to true
        setError(null); // Reset error

        try {
            const response = await fetch('http://localhost:3000/courses/generate-course', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const renderResponse = (data) => {
        return (
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Generated Course</h2>
                <ReactMarkdown className="whitespace-pre-wrap text-gray-700">{data.google}</ReactMarkdown>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center space-y-6 p-6 bg-gray-50 rounded-lg shadow-lg max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center text-blue-600">Upload Your PDFs</h1>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-blue-400 p-4 rounded-lg flex flex-col items-center transition hover:bg-blue-100">
                        <FaFilePdf className="text-4xl text-blue-400 mb-2" />
                        <h2 className="text-lg font-semibold mb-2 text-gray-800">Upload Book PDF</h2>
                        <input type="file" accept=".pdf" onChange={(e) => setBookPdf(e.target.files[0])} id="book-upload" className="hidden" />
                        <label htmlFor="book-upload" className="cursor-pointer text-gray-600 text-center">
                            {bookPdf ? `Selected: ${bookPdf.name}` : 'Drag and Drop PDF or Click to Select'}
                        </label>
                    </div>
                    <div className="border-2 border-dashed border-blue-400 p-4 rounded-lg flex flex-col items-center transition hover:bg-blue-100">
                        <FaFilePdf className="text-4xl text-blue-400 mb-2" />
                        <h2 className="text-lg font-semibold mb-2 text-gray-800">Upload Learning List PDF</h2>
                        <input type="file" accept=".pdf" onChange={(e) => setLearningList(e.target.files[0])} id="learning-list-upload" className="hidden" />
                        <label htmlFor="learning-list-upload" className="cursor-pointer text-gray-600 text-center">
                            {learningList ? `Selected: ${learningList.name}` : 'Drag and Drop PDF or Click to Select'}
                        </label>
                    </div>
                    <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your prompt" className="border border-gray-300 p-3 w-full rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" required />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition" disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Course'}
                    </button>
                </div>
            </form>
            {responseData && renderResponse(responseData)}
            {error && <div className="output-container border p-4 w-full max-w-md mt-4 rounded-lg shadow-sm bg-white" style={{ color: 'red' }}>
                <h2 className="text-lg font-semibold text-gray-800">Error</h2>
                <p className="text-gray-700">{error}</p>
            </div>}
        </div>
    );
};

export default MultiPDFUpload;