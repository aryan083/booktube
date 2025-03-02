import { supabase } from '@/lib/supabase';

/**
 * Interface for course data
 * @interface CourseData
 */
interface CourseData {
  course_name: string;
  tags: Record<string, unknown>;
  metadata: string;
  chapters_json: Record<string, unknown>;
  skill_level: number;
  teaching_pattern: string[];
  user_prompt: string;
  progress: number;
  user_id: string;
}

/**
 * Fetches all courses for a specific user from Supabase
 * @param {string} userId - The ID of the user whose courses to fetch
 * @returns {Promise<{ data: CourseData[] | null; error: any }>} The result of the operation
 */
export const fetchUserCourses = async () => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*');

    if (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }

    return { data: data as CourseData[], error: null };
  } catch (error) {
    console.error('Error in fetchUserCourses:', error);
    return { data: null, error };
  }
};