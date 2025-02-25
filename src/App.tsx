import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarInset, useSidebar } from './components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { GlowingEffectDemo } from './components/glow-effect';
import { CommandPalette } from "@/components/CommandPalette";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import WorkflowModal from "./components/WorkflowModal";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Auth from "./pages/Auth";
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Home component that shows sidebar and glowing effect
function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const { state: sidebarState } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar onCreateClick={() => setModalOpen(true)} />
      <main className="flex-1 overflow-y-auto">
        <SidebarInset>
          <div className={`w-full pt-2 h-full overflow-x-hidden overflow-y-scroll scrollbar-hide ${sidebarState === 'collapsed' ? 'pl-10' : ''}`}> 
            <div className="grid pl-6 pr-4">
              <GlowingEffectDemo />
              <GlowingEffectDemo />
            </div>
          </div>
        </SidebarInset>
      </main>
      {modalOpen && <WorkflowModal open={modalOpen} onOpenChange={setModalOpen} />}
    </div>
  );
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function MainContent() {
  const { user } = useAuth();

  // If user is not logged in, only allow access to auth page
  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  // If user is logged in, handle other routes
  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/" replace />} /> {/* Redirect if trying to access auth while logged in */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AuthProvider>
            <SidebarProvider>
              <div className="relative flex min-h-screen flex-col">
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
  );
}

export default App;
