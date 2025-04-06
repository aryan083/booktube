import { API_BASE_URL } from '../config/api';

interface GeminiResponse {
  welcome_message: string;
  course_title: string;
  course_content: {
    Chapters: {
      [chapterName: string]: {
        [topicKey: string]: string;
      };
    };
  };
  keywords: {
    technical_terms: string[];
    skills: string[];
    technologies: string[];
  };
}

/**
 * Sends PDF file to Gemini API for processing
 * @param formData FormData containing the PDF file
 * @returns Promise with the processed response
 */
export const sendPdfToGemini = async (formData: FormData): Promise<GeminiResponse> => {
  // Log the FormData contents for debugging
  console.log('FormData contents:');
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  try {
    console.log('Sending PDFs to Gemini API...');
    const response = await fetch(`${API_BASE_URL}/api/send_pdf_to_gemini`, {      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response from Gemini:', data);
    return data;
  } catch (error) {
    console.error('Error in sendPdfToGemini:', error);
    throw error;
  }
};