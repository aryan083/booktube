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
