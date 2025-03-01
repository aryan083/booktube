import { supabase } from '@/lib/supabase';

interface TechnicalTerm {
  name: string;
  color?: string;
  type?: string;
  confidence?: number;
}

interface GeminiResponse {
  technical_terms: TechnicalTerm[];
  skills: TechnicalTerm[];
  technologies: TechnicalTerm[];
  welcome_message: string;
  course_title: string;
}

/**
 * Sends PDF file to Gemini API for processing
 * @param file The PDF file to process
 * @returns Promise with the processed data including technical terms and welcome message
 */
export const sendPdfToGemini = async (formData: FormData): Promise<GeminiResponse> => {
  try {
    console.log('Sending PDF to Gemini API...');
    const response = await fetch('http://localhost:5000/api/send_pdf_to_gemini', {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('Successfully received API response:', data);
    return data;
  } catch (error) {
    console.error('Error sending PDF to Gemini:', error);
    throw error;
  }
};