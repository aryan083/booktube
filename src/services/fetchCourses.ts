import { supabase } from '@/lib/supabase';

/**
 * Interface for course data
 * @interface CourseData
 */
export interface CourseData {
  course_id: string;
  course_name: string;
  progress?: number;
  teaching_pattern?: string[];
}

/**
 * Fetches courses for the logged-in user from Supabase
 * @returns {Promise<{ data: CourseData[] | null; error: any }>} The result of the operation
 */
export const fetchUserCourses = async () => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Error getting current user:', userError);
      return { data: null, error: userError };
    }

    // Get user's course IDs from users table
    const { data: userData, error: userDataError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (userDataError || !userData) {
      console.error('Error fetching user data:', userDataError);
      return { data: null, error: userDataError };
    }

    // Check if courses_json exists
    if (!userData.courses_json) {
      console.log('No courses found for user');
      return { data: [], error: null };
    }

    // Get course IDs from courses_json
    const courseIds = userData.courses_json || [];
    if (courseIds.length === 0) {
      return { data: [], error: null };
    }

    // Fetch courses that match the IDs
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .in('course_id', courseIds);

    if (coursesError) {
      console.error('Error fetching courses:', coursesError);
      return { data: null, error: coursesError };
    }

    // Add default progress and teaching pattern
    const coursesWithDefaults = courses.map(course => ({
      ...course,
      progress: 0,
      teaching_pattern: course.teaching_pattern ||  ['Online Learning']
    }));

    return { data: coursesWithDefaults as CourseData[], error: null };
  } catch (error) {
    console.error('Error in fetchUserCourses:', error);
    return { data: null, error };
  }
};