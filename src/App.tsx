import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarInset, useSidebar } from './components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { GlowingEffectDemo } from './components/glow-effect';
import { CommandPalette } from "@/components/CommandPalette";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
// import Index from "src/components/ui/index"; 
import WorkflowModal from "./components/WorkflowModal";
import NotFound from "./pages/NotFound";
import DesignEngineeringPage from './pages/DesignEngineering';
// import Index from './components';
import Index from './components';

function MainContent() {
  const { state: sidebarState } = useSidebar();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AppSidebar onCreateClick={() => setModalOpen(true)} />
      <SidebarInset>
        <div className={`w-full pt-2 h-full overflow-x-hidden overflow-y-scroll scrollbar-hide ${sidebarState === 'collapsed' ? 'pl-10' : ''}`}> 
          <div className="grid pl-6 pr-4">
            <GlowingEffectDemo />
            <GlowingEffectDemo />
       
          </div>
        </div>
      </SidebarInset>
      <WorkflowModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Router>
          <CommandPalette />
          <Toaster />
          <Sonner />
          
          <Routes>
            <Route path="/design-engineering" element={<Index />} />
            <Route path="/" element={<MainContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
