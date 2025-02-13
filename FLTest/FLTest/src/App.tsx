import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppSidebar } from './components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from './components/ui/sidebar';
import { Separator } from './components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from './components/ui/breadcrumb';
import { ThemeToggle } from './components/theme-toggle';
import { HoverBorderGradient } from './components/ui/hover-border-gradient';
import { GlowingEffectDemo } from './components/glow-effect';
import UploadModal from './components/upload-modal';
import SecondModal from './components/second-modal';
import ThirdModal from './components/third-modal';
import DesignEngineeringPage from './pages/DesignEngineering';

function MainContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const { state: sidebarState } = useSidebar();

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="ml-1" />

            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeToggle />
        </header> */}
        <div className={`w-full pt-2 h-full overflow-x-hidden overflow-y-scroll scrollbar-hide ${sidebarState === 'collapsed' ? 'pl-16' : ''}`}>

          <div className="grid pl-6 pr-4">
            <GlowingEffectDemo />
            <GlowingEffectDemo />
          </div>
        </div>
      </SidebarInset>
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onUpload={() => {}}
        onNext={() => {
          setIsModalOpen(false);
          setIsSecondModalOpen(true);
        }}
      />
      <SecondModal
        isOpen={isSecondModalOpen}
        onClose={() => setIsSecondModalOpen(false)}
        onBack={() => {
          setIsSecondModalOpen(false);
          setIsModalOpen(true);
        }}
        onNext={() => {
          setIsSecondModalOpen(false);
          setIsThirdModalOpen(true);
        }}
      />
      <ThirdModal
        isOpen={isThirdModalOpen}
        onClose={() => setIsThirdModalOpen(false)}
        onBack={() => {
          setIsThirdModalOpen(false);
          setIsSecondModalOpen(true);
        }}
        onComplete={() => {
          // Add any final step logic here
        }}
      />
    </>
  );
}

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/design-engineering" element={<DesignEngineeringPage />} />
          <Route path="/" element={<MainContent />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
