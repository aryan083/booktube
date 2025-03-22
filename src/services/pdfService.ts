interface TechnicalTerm {
  name: string;
  color?: string;
  type?: string;
  confidence?: number;
}

interface CourseContent {
  Chapters: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

interface GeminiResponse {
  technical_terms: TechnicalTerm[];
  skills: TechnicalTerm[];
  technologies: TechnicalTerm[];
  welcome_message: string;
  course_title: string;
  course_content?: CourseContent;
}

/**
 * Extracts chapter names from course content
 * @param courseContent The course content object
 * @returns Array of chapter names
 */
export const extractChapterNames = (courseContent: CourseContent): string[] => {
  const chapterNames: string[] = [];
  
  Object.keys(courseContent.Chapters).forEach(chapterKey => {
    // Extract the name part after the colon and trim
    const chapterName = chapterKey.split(':')[1]?.trim();
    if (chapterName) {
      chapterNames.push(chapterName);
      console.log('Found chapter:', chapterName);
    }
  });

  return chapterNames;
};

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

    // Extract and log chapter names if course_content is present
    if (data.course_content) {
      console.log('Course content structure:', JSON.stringify(data.course_content, null, 2));
      const chapterNames = extractChapterNames(data.course_content);
      console.log('Extracted chapter names:', chapterNames.join(', '));
    } else {
      console.log('No course content found in the response');
    }

    return data;
  } catch (error) {
    console.error('Error sending PDF to Gemini:', error);
    throw error;
  }
};