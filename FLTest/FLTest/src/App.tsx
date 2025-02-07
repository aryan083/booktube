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

export default function App() {
  return (
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
        </header>
        <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-0">
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
