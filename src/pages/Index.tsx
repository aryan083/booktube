import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/Navbar";
import { CourseSidebar } from "@/components/CourseSidebar";
import { CourseContent } from "@/components/CourseContent";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <SidebarProvider>
        <div className="flex min-h-screen pt-16">
          <CourseSidebar />
          <main className=" bg-black w-100">
            <CourseContent />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;