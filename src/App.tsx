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
import { AppSidebar } from "./components/app-sidebar";
import { GlowingEffectDemo } from "./components/glow-effect";
import { CommandPalette } from "@/components/CommandPalette";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import WorkflowModal from "./components/WorkflowModal";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Auth from "./pages/Auth";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import SignUpForm from "./pages/SignUp";
import { SignInForm } from "./pages/SignIn";
import Profile01 from "./components/kokonutui/profile-01";
import { Blendy, createBlendy } from "blendy";
import ClickSpark from "./components/ClickSpark";

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
      <div className="flex items-center justify-center min-h-screen">
        Loading...
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

function App() {
  const queryClient = new QueryClient();

  const blendy = useRef<Blendy | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    blendy.current = createBlendy({ animation: "dynamic" });
  }, []);

  return (
    <ClickSpark
  sparkColor='#fff'
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
