import React, { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from "./components/ui/sidebar";

import { CommandPalette } from "@/components/CommandPalette";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Blendy, createBlendy } from "blendy";
import ClickSpark from "./components/ClickSpark";

import WorkflowModal from "./components/WorkflowModal";
import { GlowingEffectDemo } from "./components/glow-effect";
import { AppSidebar } from "./components/app-sidebar";
import SignUpForm from "./pages/SignUp";
import Profile01 from "./components/kokonutui/profile-01";
import { SignInForm } from "./pages/SignIn";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import ArticlePage from "./pages/ArticlePage";
import NotFound from "./pages/NotFound";

// Home component that shows sidebar and glowing effect
function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const { state: sidebarState } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar onCreateClick={() => setModalOpen(true)} />
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <SidebarInset>
          <div
            className={`w-full pt-2 pb-1 h-full overflow-x-hidden overflow-y-scroll scrollbar-hide transition-all   ${
              sidebarState === "collapsed" ? "pl-10 " : "pl-0"
            }`}
          >
            <div className="grid pl-6 pr-4">
              <GlowingEffectDemo />
              <GlowingEffectDemo />
              <GlowingEffectDemo />
            </div>
          </div>
        </SidebarInset>
      </main>
      {modalOpen && (
        <WorkflowModal open={modalOpen} onOpenChange={setModalOpen} />
      )}
    </div>
  );
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="py-8 text-center animate-pulse">
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.05s_infinite] mx-1">
          b
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.1s_infinite] mx-1">
          o
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.15s_infinite] mx-1">
          o
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.2s_infinite] mx-1">
          k
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.25s_infinite] mx-1">
          t
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.3s_infinite] mx-1">
          u
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.35s_infinite] mx-1">
          b
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.4s_infinite] mx-1">
          i
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.45s_infinite] mx-1">
          n
        </span>
        <span className="inline-block animate-[bounce_0.3s_ease-in-out_0.5s_infinite] mx-1">
          g
        </span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

function MainContent() {
  const { user, loading } = useAuth();

  return (
    <Routes>
      {/* Public routes - accessible to everyone */}
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route
        path="/profile1"
        element={
          <AuthGuard>
            <Profile01 />
          </AuthGuard>
        }
      />
      {/* <Route path="/courses" element={<Courses />} /> */}
      <Route
        path="/course/:courseId"
        element={
          <AuthGuard>
            <CourseDetails />
          </AuthGuard>
        }
      />
      {/* <Route path="/auth" element={<Auth />} /> */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
      <Route
        path="/courses"
        element={
          <AuthGuard>
            <Courses />
          </AuthGuard>
        }
      />
      <Route
        path="/article/:article_id"
        element={
          <AuthGuard>
            <ArticlePage />
          </AuthGuard>
        }
      />

      {/* Redirect to signin if user is not authenticated and tries to access other pages */}
      <Route
        path="*"
        element={
          loading ? (
            <div className="flex items-center justify-center min-h-screen">
              Loading...
            </div>
          ) : user ? (
            <NotFound />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />
    </Routes>
  );
}
// >>>>>>> Stashed changes

function App() {
  const queryClient = new QueryClient();
  const blendy = useRef<Blendy | null>(null);

  useEffect(() => {
    blendy.current = createBlendy({ animation: "dynamic" });
  }, []);

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router>
            <AuthProvider>
              <SidebarProvider>
                <div className="relative flex min-h-screen ">
                  <div className="flex-1">
                    <MainContent />
                  </div>
                </div>
                <CommandPalette />
                <Toaster />
                <Sonner />
              </SidebarProvider>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </ClickSpark>
  );
}

export default App;
