import { supabase } from '@/lib/supabase';

interface CourseContent {
  Chapters: {
    [chapterName: string]: {
      [topicKey: string]: string;
    };
  };
}

/**
 * Interface for course data
 * @interface CourseData
 */
interface CourseData {
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

/**
 * Creates topics in the topics table
 * @param courseContent The course content containing topics
 * @returns Promise with created topic IDs or error
 */
const createTopics = async (courseContent: CourseContent) => {
  try {
    // Extract all topics from the course content
    const topics: string[] = [];
    Object.values(courseContent.Chapters).forEach(chapter => {
      Object.values(chapter).forEach(topicName => {
        topics.push(topicName);
      });
    });

    console.log('Topics to create:', topics);
    
    // Create an array of topic objects
    const topicsToInsert = topics.map(topicName => ({
      topic_name: topicName,
      tags: {},
      content: '',
      articles_json: {}
    }));

    // Insert all topics at once and get their IDs
    const { data: insertedTopics, error } = await supabase
      .from('topics')
      .insert(topicsToInsert)
      .select('topic_id, topic_name');

    if (error) {
      console.error('Error creating topics:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return { data: null, error };
    }

    // Extract just the topic IDs
    const topicIds = insertedTopics.map(topic => topic.topic_id);
    console.log('Successfully created topics with IDs:', topicIds);
    return { data: topicIds, error: null };

  } catch (error) {
    console.error('Unexpected error in createTopics:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return { data: null, error };
  }
};

/**
 * Creates chapters in the chapters table and returns their IDs
 * @param chapterNames Array of chapter names to create
 * @returns Promise with created chapter IDs or error
 */
const createChapters = async (chapterNames: string[]) => {
  try {
    console.log('Creating chapters:', chapterNames);
    
    // Create an array of chapter objects
    const chaptersToInsert = chapterNames.map(chapterName => ({
      chapter_name: chapterName,
      tags: {},
      topics_json: {}
    }));

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

    // First create the chapters and get their IDs
    const { data: chapterIds, error: chaptersError } = await createChapters(
      coursePayload.chapters_json.chapters
    );

    if (chaptersError || !chapterIds) {
      console.error('Error creating chapters:', chaptersError);
      return { data: null, error: chaptersError };
    }

    console.log('Successfully created chapters with IDs:', chapterIds);

    // Create topics if course_content is available
    let topicIds = [];
    if (course_content) {
      console.log('Starting topic creation...');
      const { data: createdTopicIds, error: topicsError } = await createTopics(course_content);
      if (topicsError) {
        console.error('Error creating topics:', topicsError);
        return { data: null, error: topicsError };
      }
      topicIds = createdTopicIds || [];
      console.log('Successfully created topics with IDs:', topicIds);
    }

    // Now create the course with chapter IDs instead of names
    const { data: newCourse, error: courseError } = await supabase
      .from('courses')
      .insert([{
        course_name: coursePayload.course_name,
        metadata: coursePayload.metadata || '',
        chapters_json: { chapters: chapterIds }, // Store chapter IDs instead of names
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

    // Update courses_json array in users table
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
    console.log('Final course data with chapter IDs:', newCourse);
    return { data: newCourse, error: null };

  } catch (error) {
    console.error('Unexpected error in createCourse:', error);
    return { data: null, error };
  }
};
