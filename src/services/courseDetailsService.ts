import { supabase } from '@/lib/supabase';

interface Topic {
  topic_id: string;
  topic_name: string;
}

interface Chapter {
  chapter_id: string;
  chapter_name: string;
  topics: Topic[];
}

interface CourseDetails {
  course_id: string;
  course_name: string;
  chapters: Chapter[];
}

export const fetchCourseDetails = async (courseId: string): Promise<CourseDetails | null> => {
  try {
    // First fetch the course to get chapters_json
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('course_id', courseId)
      .single();

    console.log('courseId:', courseId);
    console.log('Raw Course Data:', courseData);
    console.log('chapters_json type:', typeof courseData?.chapters_json);
    console.log('chapters_json value:', JSON.stringify(courseData?.chapters_json, null, 2));

    if (courseError) {
      console.error('Error fetching course:', courseError);
      return null;
    }

    if (!courseData) {
      console.error('No course data found');
      return null;
    }

    // Extract chapter IDs from chapters_json
    let chapterIds: string[] = [];
    
    if (!courseData.chapters_json) {
      console.error('chapters_json is null or undefined');
    } else {
      try {
        const parsedData = typeof courseData.chapters_json === 'string'
          ? JSON.parse(courseData.chapters_json)
          : courseData.chapters_json;

        console.log('Parsed chapters_json:', JSON.stringify(parsedData, null, 2));

        if (parsedData && typeof parsedData === 'object' && 'chapters' in parsedData) {
          chapterIds = parsedData.chapters;
          console.log('Found chapters array:', chapterIds);
        } else {
          console.error('chapters_json does not have expected structure with chapters array');
        }
      } catch (e) {
        console.error('Failed to parse chapters_json:', e);
      }
    }

    if (!chapterIds.length) {
      console.error('No chapter IDs found');
      return {
        course_id: courseData.course_id,
        course_name: courseData.course_name,
        chapters: []
      };
    }

    // Get chapters using the IDs from chapters_json
    const { data: chaptersData, error: chaptersError } = await supabase
      .from('chapters')
      .select('*')
      .in('chapter_id', chapterIds);

    console.log('Raw Chapters Data:', chaptersData);

    if (chaptersError) {
      console.error('Error fetching chapters:', chaptersError);
      return null;
    }

    if (!chaptersData || !chaptersData.length) {
      console.error('No chapters found in database');
      return {
        course_id: courseData.course_id,
        course_name: courseData.course_name,
        chapters: []
      };
    }

    // Get all unique topic IDs from all chapters
    const allTopicIds = chaptersData.reduce((acc: string[], chapter) => {
      if (!chapter.topics_json) {
        console.log(`No topics_json for chapter ${chapter.chapter_id}`);
        return acc;
      }

      try {
        const parsedData = typeof chapter.topics_json === 'string'
          ? JSON.parse(chapter.topics_json)
          : chapter.topics_json;

        console.log(`Chapter ${chapter.chapter_id} topics_json:`, JSON.stringify(parsedData, null, 2));

        if (parsedData && typeof parsedData === 'object') {
          // Check for both "topics" and "topic_ids" fields
          const topicIds = parsedData.topics || parsedData.topic_ids || [];
          if (topicIds.length > 0) {
            console.log(`Found topic IDs for chapter ${chapter.chapter_id}:`, topicIds);
            return [...acc, ...topicIds];
          }
        }
        console.error(`Chapter ${chapter.chapter_id} topics_json does not have expected structure`);
        return acc;
      } catch (e) {
        console.error(`Failed to parse topics_json for chapter ${chapter.chapter_id}:`, e);
        return acc;
      }
    }, []);

    console.log('All Topic IDs:', allTopicIds);

    if (!allTopicIds.length) {
      console.log('No topics found, returning chapters without topics');
      return {
        course_id: courseData.course_id,
        course_name: courseData.course_name,
        chapters: chaptersData.map(chapter => ({
          chapter_id: chapter.chapter_id,
          chapter_name: chapter.chapter_name,
          topics: []
        }))
      };
    }

    // Fetch all topics at once
    const { data: topicsData, error: topicsError } = await supabase
      .from('topics')
      .select('topic_name, topic_id')
      .in('topic_id', allTopicIds);

    console.log('Topics Data:', topicsData);

    if (topicsError) {
      console.error('Error fetching topics:', topicsError);
      return null;
    }

    if (!topicsData) {
      console.error('No topics found in database');
      return {
        course_id: courseData.course_id,
        course_name: courseData.course_name,
        chapters: chaptersData.map(chapter => ({
          chapter_id: chapter.chapter_id,
          chapter_name: chapter.chapter_name,
          topics: []
        }))
      };
    }

    // Create a map of topic IDs to topic objects
    const topicsMap = new Map(
      topicsData.map(topic => [topic.topic_id, topic])
    );

    // Construct the final course details object
    const chapters = chaptersData.map(chapter => {
      let topicIds: string[] = [];

      if (chapter.topics_json) {
        try {
          const parsedData = typeof chapter.topics_json === 'string'
            ? JSON.parse(chapter.topics_json)
            : chapter.topics_json;

          if (parsedData && typeof parsedData === 'object') {
            // Check for both "topics" and "topic_ids" fields
            topicIds = parsedData.topics || parsedData.topic_ids || [];
          } else {
            console.error(`Chapter ${chapter.chapter_id} topics_json does not have expected structure`);
          }
        } catch (e) {
          console.error(`Failed to parse topics_json for chapter ${chapter.chapter_id}:`, e);
        }
      }

      const chapterTopics = topicIds
        .map(topicId => topicsMap.get(topicId))
        .filter(Boolean) as Topic[];

      return {
        chapter_id: chapter.chapter_id,
        chapter_name: chapter.chapter_name,
        topics: chapterTopics
      };
    });

    const result = {
      course_id: courseData.course_id,
      course_name: courseData.course_name,
      chapters
    };

    console.log('Final Result:', JSON.stringify(result, null, 2));
    return result;

  } catch (error) {
    console.error('Error in fetchCourseDetails:', error);
    return null;
  }
};
