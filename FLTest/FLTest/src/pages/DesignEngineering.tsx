import React, { useState } from 'react';
import { AppSidebar } from '../components/app-sidebar';
import { SidebarProvider } from '../components/ui/sidebar';
import UploadModal from '../components/upload-modal';
import SecondModal from '../components/second-modal';
import ThirdModal from '../components/third-modal';

const DesignEngineeringPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);

  const handleUploadNext = () => {
    setIsUploadModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleSecondNext = () => {
    setIsSecondModalOpen(false);
    setIsThirdModalOpen(true);
  };

  const handleSecondBack = () => {
    setIsSecondModalOpen(false);
    setIsUploadModalOpen(true);
  };

  const handleThirdBack = () => {
    setIsThirdModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleClose = () => {
    setIsUploadModalOpen(false);
    setIsSecondModalOpen(false);
    setIsThirdModalOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar onUploadClick={() => setIsUploadModalOpen(true)} />
        <UploadModal 
          isOpen={isUploadModalOpen}
          onClose={handleClose}
          onNext={handleUploadNext}
        />
        <SecondModal
          isOpen={isSecondModalOpen}
          onClose={handleClose}
          onBack={handleSecondBack}
          onNext={handleSecondNext}
        />
        <ThirdModal
          isOpen={isThirdModalOpen}
          onClose={handleClose}
          onBack={handleThirdBack}
        />
      </div>
    </SidebarProvider>
  );
};

export default DesignEngineeringPage;
