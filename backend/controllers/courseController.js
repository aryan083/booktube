const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateCourse = (req, res) => {
    return new Promise(async (resolve, reject) => {
        console.log(req.files); // Log the uploaded files
        console.log(req.body); // Log the request body

        if (!req.files || !req.files['bookPdf']) {
            console.log("Missing required book PDF file.");
            return res.status(400).json({ error: "Missing required book PDF file." });
        }
        console.log("Book PDF found:", req.files['bookPdf'][0].originalname);

        if (req.files['learningList']) {
            console.log("Learning list found:", req.files['learningList'][0].originalname);
        } else {
            console.log("No learning list provided.");
        }

        try {
            const { prompt } = req.body;
            const bookPdfFile = req.files['bookPdf'][0]; // Access the uploaded book PDF
            const learningListFile = req.files['learningList'] ? req.files['learningList'][0] : null; // Access the uploaded learning list if it exists

            // Prepare the prompt based on the uploaded data
            const contentPrompt = `Generate a course outline based on the following book: ${bookPdfFile.originalname}${
                learningListFile ? ` and learning list: ${learningListFile.originalname}` : ''
            }. Prompt: ${prompt}`;

            console.log("Initializing Google Generative AI...");
            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
            console.log("Creating model...");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Generate content using Google Generative AI
            const result = await model.generateContent(contentPrompt);
            console.log(result.response.text()); // Log the generated content
            // Send back the response from Google API
            res.json({ google: result.response.text(),result: result });
            resolve(); // Resolve the promise
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            reject(error); // Reject the promise
        }
    });
};

module.exports = { generateCourse }; // Ensure this line is present