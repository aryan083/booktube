import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/courseDetailsService';

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

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        if (!courseId) {
          setError('Course ID is required');
          setLoading(false);
          return;
        }

        console.log('Fetching details for course ID:', courseId);
        const details = await fetchCourseDetails(courseId);
        console.log('Received course details:', details);

        if (!details) {
          setError('Failed to load course details');
          setLoading(false);
          return;
        }

        setCourseDetails(details);
        setLoading(false);
      } catch (err) {
        console.error('Error loading course details:', err);
        setError('An error occurred while loading course details');
        setLoading(false);
      }
    };

    loadCourseDetails();
  }, [courseId]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!courseDetails) {
    return <div className="p-4">No course details found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 ">{courseDetails.course_name}</h1>
      
      <div className="space-y-6">
        {courseDetails.chapters.map((chapter) => (
          <div key={chapter.chapter_id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#000000] ">{chapter.chapter_name}</h2>
            
            {chapter.topics.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-lg font-medium mb-2 text-[#000000] ">Topics:</h3>
                <ul className="list-disc pl-6">
                  {chapter.topics.map((topic) => (
                    <li key={topic.topic_id} className="text-gray-700">
                      {topic.topic_name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">No topics available for this chapter</p>
            )}
          </div>
        ))}
        
        {courseDetails.chapters.length === 0 && (
          <p className="text-gray-500">No chapters available for this course</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
