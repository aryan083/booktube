import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
  {
    title: "Computer Networks",
    provider: "Stanford University",
    progress: 22,
    logo: "https://img.icons8.com/ios-filled/50/4B6CC1/network.png", // Network icon
  },
  {
    title: "AWS Cloud Technical Essentials",
    provider: "Amazon",
    progress: 25,
    logo: "https://img.icons8.com/ios-filled/50/4B6CC1/cloud.png", // Cloud icon
  },  {
    title: "Computer Networks",
    provider: "Stanford University",
    progress: 22,
    logo: "https://img.icons8.com/ios-filled/50/4B6CC1/network.png", // Network icon
  },
  {
    title: "AWS Cloud Technical Essentials",
    provider: "Amazon",
    progress: 25,
    logo: "https://img.icons8.com/ios-filled/50/4B6CC1/cloud.png", // Cloud icon
  },  {
    title: "Computer Networks",
    provider: "Stanford University",
    progress: 22,
    logo: "https://img.icons8.com/ios-filled/50/4B6CC1/network.png", // Network icon
  },
  {
    title: "AWS Cloud Technical Essentials",
    provider: "Amazon",
    progress: 25,
    logo: "https://img.icons8.com/ios-filled/50/4B6CC1/cloud.png", // Cloud icon
  }
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-black pr-0 p-6">
      <h1 className="text-3xl font-bold text-[#D4D4D4] mb-4">My Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Link 
            key={index}
            to={`/course/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="block"
          >
            <div className="bg-[#1E1E1E] rounded-lg p-6 transition-colors hover:bg-[#282828]">
              <div className="flex items-center gap-4">
                <img src={course.logo} alt={`${course.title} logo`} className="w-12 h-12 rounded" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[#D4D4D4]">{course.title}</h2>
                  <p className="text-sm text-[#B4B4B4]">{course.provider}</p>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-[#B4B4B4]">Course Progress</span>
                    <span className="text-[#D4D4D4]">{course.progress}% complete</span>
                  </div>
                  <div className="h-1.5 bg-[#282828] rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-[#4B6CC1] transition-all duration-300 ease-in-out"
                      style={{ width: `${course.progress}%` }}
                    />
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