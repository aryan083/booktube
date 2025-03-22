import { supabase } from '@/lib/supabase';

/**
 * Interface for course data
 * @interface CourseData
 */
interface CourseData {
  course_name: string;
  metadata: string;
  chapters_json: Record<string, any>;
  skill_level: number;
  teaching_pattern: string[];
  user_prompt: string;
  progress: number;
  user_id: string; // Used only for updating courses_json
}

/**
 * Creates a new course in Supabase and updates user's courses_json
 * @param {CourseData} courseData - The course data to be stored
 * @returns {Promise<{ data: any; error: any }>} The result of the operation
 */
export const createCourse = async (courseData: CourseData) => {
  try {
    console.log('Creating course with data:', courseData);
    const { user_id, ...coursePayload } = courseData;

    // First, create the course with only the fields that exist in the courses table
    const { data: newCourse, error: courseError } = await supabase
      .from('courses')
      .insert([{
        course_name: coursePayload.course_name,
        metadata: coursePayload.metadata || '',
        chapters_json: coursePayload.chapters_json || {},
        skill_level: coursePayload.skill_level,
        teaching_pattern: coursePayload.teaching_pattern,
        user_prompt: coursePayload.user_prompt,
        progress: coursePayload.progress || 0
      }])
      .select()
      .single();

    if (courseError) {
      console.error('Error creating course:', courseError);
      return { data: null, error: courseError };
    }

    console.log('Course created successfully:', newCourse);

    // Update the user's courses_json array with the new course ID
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('courses_json')
      .eq('user_id', user_id)
      .single();

    if (fetchError) {
      console.error('Error fetching user data:', fetchError);
      return { data: newCourse, error: fetchError };
    }

    console.log('Current user data:', userData);

    // Update courses_json array
    const coursesJson: string[] = userData?.courses_json || [];
    coursesJson.push(newCourse.course_id);

    // Update the user's courses_json
    const { error: updateError } = await supabase
      .from('users')
      .update({ courses_json: coursesJson })
      .eq('user_id', user_id);

    if (updateError) {
      console.error('Error updating courses_json:', updateError);
      return { data: newCourse, error: updateError };
    }

    console.log('Successfully updated user courses_json:', coursesJson);
    return { data: newCourse, error: null };

  } catch (error) {
    console.error('Unexpected error in createCourse:', error);
    return { data: null, error };
  }
};
