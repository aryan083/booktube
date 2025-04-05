import { supabase } from '@/lib/supabase';

/**
 * Interface for course data
 * @interface CourseData
 */
export interface CourseData {
  course_img: string | undefined;
  course_id: string;
  course_name: string;
  progress: number;
  teaching_pattern?: string[];
}

// Add new function to calculate course progress
const calculateCourseProgress = async (courseId: string): Promise<number> => {
  try {
    // First get all topics for the course
    const { data: courseData } = await supabase
      .from('courses')
      .select('chapters_json')
      .eq('course_id', courseId)
      .single();

    if (!courseData?.chapters_json) return 0;

    const chapterIds = courseData.chapters_json.chapters || [];
    
    // Get all topics from chapters
    const { data: chaptersData } = await supabase
      .from('chapters')
      .select('topics_json')
      .in('chapter_id', chapterIds);

    if (!chaptersData) return 0;

    // Collect all topic IDs
    const topicIds = chaptersData.reduce((acc: string[], chapter) => {
      if (!chapter.topics_json) return acc;
      const topics = typeof chapter.topics_json === 'string' 
        ? JSON.parse(chapter.topics_json) 
        : chapter.topics_json;
      return [...acc, ...(topics.topics || topics.topic_ids || [])];
    }, []);

    if (topicIds.length === 0) return 0;

    // Get completion status of all topics
    const { data: topicsData } = await supabase
      .from('topics')
      .select('isCompleted')
      .in('topic_id', topicIds);

    if (!topicsData) return 0;

    const completedTopics = topicsData.filter(topic => topic.isCompleted).length;
    const totalTopics = topicsData.length;

    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  } catch (error) {
    console.error('Error calculating course progress:', error);
    return 0;
  }
};

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

    // Calculate progress for each course
    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const progress = await calculateCourseProgress(course.course_id);
        return {
          ...course,
          progress,
          teaching_pattern: course.teaching_pattern || ['Online Learning']
        };
      })
    );

    console.log('Courses with calculated progress:', coursesWithProgress);
    return { data: coursesWithProgress as CourseData[], error: null };
  } catch (error) {
    console.error('Error in fetchUserCourses:', error);
    return { data: null, error };
  }
};