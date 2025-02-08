import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb"
import { Separator } from "./ui/separator"

const PdfUpload = () => {
  const [coursePdf, setCoursePdf] = useState<File | null>(null);
  const [bookPdf, setBookPdf] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleCoursePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        alert('Please upload only PDF files');
        return;
      }
      setCoursePdf(file);
    }
  };

  const handleBookPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        alert('Please upload only PDF files');
        return;
      }
      setBookPdf(file);
    }
  };

  const handleProceed = () => {
    // Handle the upload process here
    console.log('Course PDF:', coursePdf);
    console.log('Book PDF:', bookPdf);
    // Add your upload logic here
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
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
        </header>
        <div className="flex-1 h-[calc(100vh-4rem)] flex items-center">
          <div className="w-full max-w-md mx-auto px-4">
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Upload PDFs
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Course PDF
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-background text-muted-foreground rounded-lg border-2 border-dashed border-border cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm">
                        {coursePdf ? coursePdf.name : 'Select Course PDF'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        onChange={handleCoursePdfChange}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Book PDF
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-background text-muted-foreground rounded-lg border-2 border-dashed border-border cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm">
                        {bookPdf ? bookPdf.name : 'Select Book PDF'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        onChange={handleBookPdfChange}
                      />
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleProceed}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition duration-200 font-medium"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PdfUpload;
