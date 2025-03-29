import React, { useEffect, useState } from "react";
import Aurora from "../components/Aurora";
import VariableProximity from "../components/VariableProximity";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserCourses } from "../services/fetchCourses";
import { CourseData } from "../services/fetchCourses";
import { supabase } from "@/lib/supabase";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ArrowLeft } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authenticated user
    const getCurrentUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // Load courses immediately after getting user
        try {
          const { data, error } = await fetchUserCourses();
          if (error) throw error;
          if (data) setCourses(data);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-black p-11 text-[#D4D4D4]">
        Please log in to view your courses.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-11 text-[#D4D4D4]">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-11 text-[#D4D4D4]">
        Error loading courses: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-br from-[#000000] to-[#0A0A0A] text-foreground">
      <div className="px-3 md:px-4 pt-8 max-w-[1400px] mx-auto w-full">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            My Learning
          </h1>
        </div>
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-2 w-full">
          {courses.length === 0 ? (
            <VariableProximity
              className="text-lg text-muted-foreground"
              baseDistance={0.15}
              fluctuation={0.05}
            >
              No courses found - start your learning journey!
            </VariableProximity>
          ) : (
            courses.map((course) => (
              <Link
                key={course.course_id}
                to={`/course/${course.course_id}`}
                className="group transition-all hover:shadow-lg  duration-300"
              >
                <div className="relative bg-gradient-to-b from-card to-card/90 text-card-foreground rounded-xl p-7 shadow-lg border border-border/40 backdrop-blur-sm hover:border-border/60 transition-all duration-300">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    children={undefined}
                  />
                  <div className="flex flex-col h-full gap-4">
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0 bg-muted/60 p-2 rounded-lg border">
                        <img
                          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' /%3E%3C/svg%3E"
                          alt={`${course.course_name} logo`}
                          className="w-4 h-4"
                        />
                      </div>
                      <h2 className="text-2xl font-semibold truncate">
                        {course.course_name}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Course Progress
                          </span>
                          <span className="font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted/60 rounded-full overflow-hidden shadow-inner">
                          <div
                            className="h-full bg-gradient-to-r from-primary/90 to-primary/70 transition-all duration-300 ease-out shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      {/* 
                      <div className="flex flex-wrap gap-2">
                        {course.teaching_pattern?.map((pattern, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium px-2.5 py-1 border bg-white/10 rounded-full bg-secondary "
                          >
                            {pattern}
                          </span>
                        ))}
                      </div> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
