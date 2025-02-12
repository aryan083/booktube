import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb"
import { Separator } from "./components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { ThemeToggle } from "./components/theme-toggle"
import { CardContainer } from "./components/ui/3d-card"
import { Enhanced3DCard } from "./components/ui/enhanced-3d-card"
import { HoverBorderGradient } from "./components/ui/hover-border-gradient"
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
// import PdfUpload from './components/PdfUpload'
// import { Swapy } from 'swapy'
// import { createSwapy } from 'swapy'
import {GlowingEffectDemo} from './components/glow-effect'
import { useState } from 'react';
import UploadModal from './components/upload-modal';
import SecondModal from './components/second-modal';

function MainContent() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  return (
    <>
      
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
          </div>
          <ThemeToggle/>
          <HoverBorderGradient 
            className="ml-auto" 
            as="button"
            onClick={() => setIsModalOpen(true)}
          >
            CREATE 
          </HoverBorderGradient>
        </header>
        <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto px-6">
        {/* <div className="w-full min-h-screen flex items-center justify-center p-5 sm:p-8"> */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-0">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <CardContainer key={item} className="inter-var">
                <Enhanced3DCard
                  title={`Beautiful Nature ${item}`}
                  views="3.9k"
                  description="Experience the beauty of nature through our lens. Each image captures a unique moment in time, showcasing the world's natural wonders."
                  tags={["Nature", "Photography", "Landscape"]}
                  imageSrc="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                />
              </CardContainer>
            ))}
          </div> */}
          <GlowingEffectDemo />
          <GlowingEffectDemo />
          {/* <SwapyS /> */}

          {/* <BentoGrid>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid> */}
        </div>
        <UploadModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onUpload={() => {}} 
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
        />
      </SidebarInset>
    </SidebarProvider>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        {/* <Route path="/upload" element={<PdfUpload />} /> */}
      </Routes>
    </Router>
  );
}
