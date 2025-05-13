import { supabase } from '@/lib/supabase';

interface ChapterContent {
  [key: string]: string;
}

interface CourseContent {
  Chapters: {
    [key: string]: ChapterContent;
  };
}

/**
 * Interface for course data
 * @interface CourseData
 */
interface CourseData {
  course_id:string;
  course_name: string;
  metadata: string;
  chapters_json: {
    chapters: string[];  // This will now store chapter IDs instead of names
  };
  skill_level: number;
  teaching_pattern: string[];
  user_prompt: string;
  progress: number;
  user_id: string;
  course_content?: CourseContent;
}

interface TopicInfo {
  chapterTopicIds: { [key: string]: string[] };
  topicNames: { [key: string]: string[] };
}

interface CourseCallbackPayload {
  course_id: string;
  teaching_pattern: string[];
  user_prompt: string;
  skill_level: number;
  topic_info: TopicInfo;
}

// interface CallbackResponse {
//   status: 'success' | 'error';
//   message: string;
//   data?: Record<string, unknown>;
//   error?: string;
// }

/**
 * Creates topics in the topics table and returns their IDs organized by chapter
 * @param courseContent The course content containing topics
 * @returns Promise with created topic IDs mapped to chapters
 */
const createTopics = async (courseContent: CourseContent) => {
  try {
    // Create a map of chapter names to their topics
    const chapterTopicsMap = new Map<string, string[]>();

    Object.entries(courseContent.Chapters).forEach(([chapterKey, topics]) => {
      const chapterName = chapterKey.split(':')[1]?.trim();
      if (chapterName) {
        chapterTopicsMap.set(chapterName, Object.values(topics));
      }
    });

    console.log('Chapter to topics mapping:', Object.fromEntries(chapterTopicsMap));

    // Create all topics and track which ones belong to which chapter
    const chapterTopicIds = new Map<string, string[]>(); // Will store chapter name -> topic IDs

    for (const [chapterName, topics] of chapterTopicsMap) {
      const topicsForChapter = topics.map((topicName: string) => ({
        topic_name: topicName,
        tags: {},
        content: '',
        articles_json: {}
      }));

      // Insert topics for this chapter
      const { data: insertedTopics, error } = await supabase
        .from('topics')
        .insert(topicsForChapter)
        .select('topic_id, topic_name');

      if (error) {
        console.error('Error creating topics for chapter:', chapterName, error);
        continue;
      }

      if (!insertedTopics) {
        console.error('No topics were inserted for chapter:', chapterName);
        continue;
      }

      // Store the topic IDs for this chapter
      const topicIds = insertedTopics.map(topic => topic.topic_id);
      chapterTopicIds.set(chapterName, topicIds);

      console.log(`Created topics for chapter "${chapterName}":`, topicIds);
    }

    return { data: chapterTopicIds, error: null };
  } catch (error) {
    console.error('Error in createTopics:', error);
    return { data: null, error };
  }
};

export const fetchUserCourses = async () => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Error getting current user:', userError);
      return { data: null, error: userError };
    }

    console.log('Current user ID:', user.id);

    // Get user's course IDs from users table
    const { data: userData, error: userDataError } = await supabase
      .from('users')
      .select('*')  // Select all columns to see full data
      .eq('user_id', user.id)
      .single();

    if (userDataError || !userData) {
      console.error('Error fetching user data:', userDataError);
      return { data: null, error: userDataError };
    }
    // console.log('dtype:', typeof userData.courses_json);
    // console.log('Full user data:', userData);
    // console.log('Raw courses_json:', userData.courses_json);

    // Check if courses_json is null or undefined
    if (!userData.courses_json) {
      console.log('courses_json is null or undefined');
      return { data: [], error: null };
    }

    // Try parsing if it's a string
    let coursesJson = userData.courses_json;
    if (typeof coursesJson === 'string') {
      try {
        // coursesJson = [...coursesJson];
        console.log('Parsed courses_json:', coursesJson);
      } catch (e) {
        console.error('Error parsing courses_json:', e);
      }
    }

    const courseIds = coursesJson || [];
    // console.log('Extracted course IDs:', courseIds);

    if (courseIds.length === 0) {
      console.log('User has no courses');
      return { data: [], error: null };
    }

    // Fetch course names for these IDs
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('course_id, course_name, created_at')
      .in('course_id', courseIds);

    if (coursesError) {
      console.error('Error fetching courses:', coursesError);
      return { data: null, error: coursesError };
    }

    // console.log('Raw courses data from Supabase:', courses);
    // console.log('Course IDs:', courses?.map(c => c.course_id));
    // console.log('Course names:', courses?.map(c => c.course_name));

    return { data: courses, error: null };

  } catch (error) {
    console.error('Unexpected error in fetchUserCourses:', error);
    return { data: null, error };
  }
};
/**
 * Creates chapters in the chapters table and returns their IDs
 * @param chapterNames Array of chapter names to create
 * @param chapterTopics Map of chapter names to their topic IDs
 * @returns Promise with created chapter IDs or error
 */
const createChapters = async (chapterNames: string[], chapterTopics: Map<string, string[]>) => {
  try {
    console.log('Creating chapters:', chapterNames);

    // Create chapters with their topic IDs
    const chaptersToInsert = chapterNames.map(chapterName => ({
      chapter_name: chapterName,
      tags: {},
      topics_json: {
        topic_ids: chapterTopics.get(chapterName) || []
      }
    }));

    console.log('Inserting chapters with topics:', chaptersToInsert);

    // Insert all chapters at once and get their IDs
    const { data: chapters, error } = await supabase
      .from('chapters')
      .insert(chaptersToInsert)
      .select('chapter_id');

    if (error) {
      console.error('Error creating chapters:', error);
      return { data: null, error };
    }

    // Extract just the chapter IDs
    const chapterIds = chapters.map(chapter => chapter.chapter_id);
    console.log('Successfully created chapters with IDs:', chapterIds);
    return { data: chapterIds, error: null };
  } catch (error) {
    console.error('Error in createChapters:', error);
    return { data: null, error };
  }
};

/**
 * Creates a new course in Supabase and updates user's courses_json
 * @param {CourseData} courseData - The course data to be stored
 * @returns {Promise<{ data: any; error: any }>} The result of the operation
 */
export const createCourse = async (courseData: CourseData) => {
  try {
    console.log('Creating course with data:', courseData);
    const { user_id, course_content, ...coursePayload } = courseData;

    // First create topics and get their IDs organized by chapter
    let chapterTopicIds = new Map<string, string[]>();
    if (course_content) {
      console.log('Creating topics...');
      const { data: topicsMap, error: topicsError } = await createTopics(course_content);
      if (topicsError) {
        console.error('Error creating topics:', topicsError);
        return { data: null, error: topicsError };
      }
      if (topicsMap) {
        chapterTopicIds = topicsMap;
      }
    }

    // Then create chapters with their topic IDs
    const { data: chapterIds, error: chaptersError } = await createChapters(
      coursePayload.chapters_json.chapters,
      chapterTopicIds
    );

    if (chaptersError || !chapterIds) {
      console.error('Error creating chapters:', chaptersError);
      return { data: null, error: chaptersError };
    }

    // Now create the course with chapter IDs
    const { data: newCourse, error: courseError } = await supabase
      .from('courses')
      .insert([{
        course_name: coursePayload.course_name,
        metadata: coursePayload.metadata || '',
        chapters_json: { chapters: chapterIds }, // Store chapter IDs instead of names
        skill_level: coursePayload.skill_level,
        teaching_pattern: coursePayload.teaching_pattern,
        user_prompt: coursePayload.user_prompt,
        progress: coursePayload.progress || 0,
        course_id : coursePayload.course_id
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

    // Update courses_json array in users table
    const coursesJson: string[] = Array.isArray(userData?.courses_json) ? userData.courses_json : [];
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
    console.log('Final course data with chapter IDs:', newCourse);
    return { data: newCourse, error: null };

  } catch (error) {
    console.error('Unexpected error in createCourse:', error);
    return { data: null, error };
  }
};

/**
 * Prepares course data for backend processing
 * @param courseData The course data to prepare
 * @param chapterTopicIds Map of chapter names to their topic IDs
 * @returns The prepared course data
 */
export const prepareCourseData = (
  courseData: CourseCallbackPayload,
  chapterTopicIds: Map<string, string[]>
): CourseCallbackPayload => {
  console.log('Preparing course data for backend:', courseData);

  // Convert Map to object for JSON serialization
  const topicIdsObject: { [key: string]: string[] } = {};
  chapterTopicIds.forEach((ids, chapterName) => {
    topicIdsObject[chapterName] = ids;
  });

  return {
    ...courseData,
    topic_info: {
      ...courseData.topic_info,
      chapterTopicIds: topicIdsObject
    }
  };
};

// /**
//  * Sends course data to the backend callback URL
//  * @param courseData The course data to send
//  * @param callbackUrl The URL to send the callback to
//  * @returns Promise with the response from the callback URL
//  */
// export const sendCourseDataToBackend = async (
//   courseData: CourseCallbackPayload,
//   callbackUrl: string = 'http://localhost:5000/api/callback'
// ): Promise<{ data: CallbackResponse | null; error: string | null }> => {
//   try {
//     console.log('Preparing to send course data to backend:', courseData);

//     const response = await fetch(callbackUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         data: courseData
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Callback request failed:', errorData);
//       return { data: null, error: errorData.message || 'Callback request failed' };
//     }

//     const responseData = await response.json();
//     console.log('Callback response received:', responseData);
//     return { data: responseData, error: null };

//   } catch (error) {
//     console.error('Error sending course data to backend:', error);
//     return { data: null, error: error instanceof Error ? error.message : 'Unknown error occurred' };
//   }
// };
