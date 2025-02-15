// import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarInset, useSidebar } from './components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { GlowingEffectDemo } from './components/glow-effect';
import UploadModal from './components/upload-modal';
import SecondModal from './components/second-modal';
import ThirdModal from './components/third-modal';
import DesignEngineeringPage from './pages/DesignEngineering';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CommandPalette } from "@/components/CommandPalette";
import Index from "./pages/Index";
// import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "./pages/NotFound";
// import { Separator } from './components/ui/separator';
// import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from './components/ui/breadcrumb';
// import { ThemeToggle } from './components/theme-toggle';
// import { HoverBorderGradient } from './components/ui/hover-border-gradient';

function MainContent() {
  const { 
    state: sidebarState, 
    isModalOpen, 
    setIsModalOpen, 
    isSecondModalOpen, 
    setIsSecondModalOpen, 
    isThirdModalOpen, 
    setIsThirdModalOpen, 
    flowStartTime, 
    setFlowStartTime 
  } = useSidebar();

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className={`w-full pt-2 h-full overflow-x-hidden overflow-y-scroll scrollbar-hide ${sidebarState === 'collapsed' ? 'pl-10' : ''}`}>
          <div className="grid pl-6 pr-4">
            <GlowingEffectDemo />
            <GlowingEffectDemo />
            <Index />
          </div>
        </div>
      </SidebarInset>
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFlowStartTime(0);
        }}
        onNext={() => {
          setIsModalOpen(false);
          setIsSecondModalOpen(true);
        }}
      />
      <SecondModal
        isOpen={isSecondModalOpen}
        onClose={() => {
          setIsSecondModalOpen(false);
          setFlowStartTime(0);
        }}
        onBack={() => {
          setIsSecondModalOpen(false);
          setIsModalOpen(true);
        }}
        onNext={() => {
          setIsSecondModalOpen(false);
          setIsThirdModalOpen(true);
        }}
        flowStartTime={flowStartTime}
      />
      <ThirdModal
        isOpen={isThirdModalOpen}
        onClose={() => {
          setIsThirdModalOpen(false);
          setFlowStartTime(0);
        }}
        onBack={() => {
          setIsThirdModalOpen(false);
          setIsSecondModalOpen(true);
        }}
        onComplete={() => {
          setIsThirdModalOpen(false);
          setFlowStartTime(0);
        }}
      />
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
            <Route path="/design-engineering" element={<DesignEngineeringPage />} />
            <Route path="/" element={<MainContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
