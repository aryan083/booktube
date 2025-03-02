import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserCourses } from "../services/fetchCourses";
import { CourseData } from "../types/auth";

const Courses = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data, error } = await fetchUserCourses();
        if (error) throw error;
        if (data) setCourses(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black p-11 text-[#D4D4D4]">
        Loading courses...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-black p-11 text-[#D4D4D4]">
        Error loading courses: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen bg-black px-6 sm:px-8 py-8 w-full">
      <h1 className="text-3xl font-bold text-[#D4D4D4] mb-6 px-2">
        My Learning
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 px-2">
        {courses.map((course, index) => (
          <Link
            key={index}
            to={`/course/${course.course_name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="block group"
          >
            <div className="bg-[#1E1E1E] rounded-xl p-4 transition-all duration-300 hover:bg-[#282828] hover:shadow-lg hover:shadow-blue-500/5 border border-transparent hover:border-blue-500/10 h-[180px] w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center p-2 backdrop-blur-sm border border-white/5">
                      <img
                        src={
                          course.logo ||
                          "https://img.icons8.com/ios-filled/50/4B6CC1/book.png"
                        }
                        alt={`${course.title} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500/10 rounded-full border border-blue-500/20" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-white tracking-tight truncate">
                      {course.course_name}
                    </h2>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#B4B4B4]">Course Progress</span>
                        <span className="text-white font-medium">
                          {course.progress}% complete
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#282828] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {course.teaching_pattern.map((pattern, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 truncate max-w-[100vw]"
                        >
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
