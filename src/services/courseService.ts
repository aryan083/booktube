import { supabase } from '@/lib/supabase';

/**
 * Interface for course data
 * @interface CourseData
 */
interface CourseData {
  course_name: string;
  tags: Record<string, any>;
  metadata: string;
  chapters_json: Record<string, any>;
  skill_level: number;
  teaching_pattern: string[]; // Array of selected teaching methods
  user_prompt: string;
  progress: number;
}

/**
 * Creates a new course in Supabase
 * @param {CourseData} courseData - The course data to be stored
 * @returns {Promise<{ data: any; error: any }>} The result of the operation
 */
export const createCourse = async (courseData: CourseData) => {
  try {
    // Ensure empty fields are truly empty
    const coursePayload = {
      ...courseData,
      course_name: courseData.course_name || '',
      tags: courseData.tags || {},
      metadata: courseData.metadata || '',
      chapters_json: courseData.chapters_json || {},
      progress: courseData.progress || 0,
    };

    const { data, error } = await supabase
      .from('courses')
      .insert([coursePayload])
      .select();

    if (error) {
      console.error('Error creating course:', error);
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error in createCourse:', error);
    return { data: null, error };
  }
};
