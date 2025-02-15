"use client"

import type * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  PlusCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Settings2,
  SquareTerminal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  useSidebar 
} from "./ui/sidebar"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Button } from "@/components/ui/button"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import UploadModal from "@/components/upload-modal"
import SecondModal from "@/components/second-modal"
import ThirdModal from "@/components/third-modal"

import { useState } from "react"
import { cn } from "@/lib/utils"

// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/design-engineering",
      icon: Frame,
    },
    
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onCreateClick: () => void;
}

export function AppSidebar({ onCreateClick, ...props }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false)
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false)
  const [flowStartTime, setFlowStartTime] = useState<number>(0)

  const startFlow = () => {
    setFlowStartTime(Date.now());
    setIsModalOpen(true);
  };

  return (
    <>
      <Sidebar 
        {...props} 
        className={cn(
          "fixed top-4 left-4 bottom-4 right z-50",
          "transition-all duration-300 ease-in-out",
          state === 'collapsed' ? 'w-[5rem]' : 'w-[280px]',
          "md:block",
          "hidden"
        )}
      >
        <div className={cn(
          "h-[96%]",
          "bg-background/95",
          "backdrop-blur-md",
          "shadow-xl rounded-3xl",
          "border border-border/10",
          "p-0",
          "transition-all duration-300"
        )}>
          <GlowingEffect
            spread={60}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          />
          
          <div className="relative z-10 h-full flex flex-col rounded-2xl overflow-hidden">
            <SidebarHeader 
              className={cn(
                "p-4 border-b border-border/50",
                state === 'collapsed' ? 'flex flex-col items-center' : 'flex flex-col space-y-2'
              )}
            >
              <div className="flex items-center justify-between w-full">
                <TeamSwitcher teams={data.teams} />
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={toggleSidebar}
                    >
                      {state === 'collapsed' ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronLeft className="h-4 w-4" />
                      )}
                      <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Toggle Sidebar
                  </TooltipContent>
                </Tooltip>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="flex-1 overflow-hidden">
              <div className="flex h-[calc(100vh-8rem)] flex-col gap-2">
                <div className="flex-1 overflow-auto">
                  {state === 'expanded' ? (
                    <div className="grid gap-1 p-4">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full justify-start"
                        onClick={onCreateClick}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-1 p-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={onCreateClick}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          Create
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                  <NavMain items={data.navMain} />
                </div>
                <div className="mt-auto">
                  <NavProjects projects={data.projects} />
                </div>
              </div>
            </SidebarContent>
            
            <SidebarFooter className="p-4 border-t border-border/50">
              <NavUser user={data.user} />
            </SidebarFooter>
          </div>
        </div>
      </Sidebar>

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
  )
}
