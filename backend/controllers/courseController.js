const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdf = require('pdf-parse');

const generateCourse = (req, res) => {
    return new Promise(async (resolve, reject) => {
        console.log(req.body);
        try {
            // Validate files
            if (!req.files || !req.files['bookPdf']) {
                return res.status(400).json({ error: "Missing required book PDF file." });
            }

            // Process PDF files
            const processPdf = async (file) => {
                try {
                    const data = await pdf(file.buffer);
                    return data.text;
                } catch (error) {
                    console.error('Error processing PDF:', error);
                    throw new Error('Failed to process PDF file');
                }
            };

            // Extract text from PDFs
            const bookText = await processPdf(req.files['bookPdf'][0]);
            const learningListText = req.files['learningList'] 
                ? await processPdf(req.files['learningList'][0])
                : null;

            // Prepare prompt
            const { prompt } = req.body;
            let contentPrompt = `Book content: ${bookText.substring(0, 10000)}`; // Limit to 10k chars
            if (learningListText) {
                contentPrompt += `\nLearning list content: ${learningListText.substring(0, 5000)}`;
            }
            contentPrompt += `\n\nUser request: ${prompt}`;

            // Initialize Google AI
            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                generationConfig: {
                    maxOutputTokens: 2000
                }
            });

            // Generate content
            const result = await model.generateContent(contentPrompt);
            const response = await result.response;
            
            res.json({ result: response.text() });
            console.log(result.response);
            resolve();
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ 
                error: error.message || 'Internal Server Error',
                details: error.stack 
            });
            reject(error);
        }
    });
};

module.exports = { generateCourse };