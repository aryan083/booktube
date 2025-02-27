"use client";

import type * as React from "react";
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
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "./ui/sidebar";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UploadModal from "@/components/upload-modal";
import SecondModal from "@/components/second-modal";
import ThirdModal from "@/components/third-modal";
import { useAuth } from "../contexts/AuthContext";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "booktube",
      logo: Gamepad,
      // plan: "Enterprise",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Courses",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Introduction to AI",
          url: "#",
        },
        {
          title: "Data Link Layer",
          url: "#",
        },
        {
          title: "CMOS Inverter Basics",
          url: "#",
        },
      ],
    },
    {
      title: "Bookmarked Articles",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Data Link Layer",
          url: "#",
        },
        // {
        //   title: "Explorer",
        //   url: "#",
        // },
        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/design-engineering",
      icon: Frame,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onCreateClick: () => void;
}

export function AppSidebar({ onCreateClick, ...props }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [flowStartTime, setFlowStartTime] = useState<number>(0);

  const startFlow = () => {
    setFlowStartTime(Date.now());
    setIsModalOpen(true);
  };

  return (
    <>
      <Sidebar
        {...props}
        className={`
          fixed top-4 left-4 bottom-4 right z-50
          ${state === "collapsed" ? "w-[5rem]" : "w-[280px]"}
          transition-all duration-700 ease-in-out
        `}
        collapsible="icon"
      >
        <div
          className="
            h-[96%]
            bg-background/70 backdrop-blur-sm 
            shadow-xl rounded-3xl 
            border border-white/10
            p-0
          "
        >
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            children={undefined}
          />

          <div className="relative z-10 h-full flex flex-col rounded-2xl overflow-hidden">
            <SidebarHeader
              className={`
                p-4 border-b border-border/50 
                ${
                  state === "collapsed"
                    ? "flex flex-col items-center"
                    : "flex flex-col space-y-2"
                }
                transition-all duration-500 ease-in-out
                ${
                  state === "collapsed"
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-100 transform translate-x-0"
                }
              `}
            >
              <div className="flex items-center justify-between w-full">
                <TeamSwitcher teams={data.teams} />

                {state === "expanded" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleSidebar}
                          className="h-8 w-8"
                        >
                          <PanelLeftClose className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Collapse Sidebar</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              {state === "expanded" && (
                <HoverBorderGradient
                  className=" bg-none justify-center text-sm inline-flex items-center px-4 py-2 "
                  onClick={onCreateClick}
                  duration={0.5}
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  <span>Create a Course</span>
                </HoverBorderGradient>
              )}

              {state === "collapsed" && (
                <div className="flex flex-col items-center w-full mt-3 space-y-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleSidebar}
                          className="h-8 w-8"
                        >
                          <PanelLeftOpen className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Expand Sidebar</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HoverBorderGradient
                          className=" bg-none justify-center text-sm inline-flex items-center px-4 py-2 "
                          onClick={onCreateClick}
                          duration={0.5}
                        >
                          <PlusCircle className="h-5 w-5 bg-none hover:bg-none " />
                          {/* <span>Create a Course</span> */}
                        </HoverBorderGradient>

                        {/* 
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={onCreateClick}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button> */}
                      </TooltipTrigger>
                      <TooltipContent>Create New Project</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </SidebarHeader>

            <SidebarContent
              className={`
                flex-1 px-2 py-4 overflow-y-auto
                transition-all duration-500 ease-in-out
                ${state === "collapsed" ? "opacity-100" : "opacity-100"}
              `}
            >
              <div className="flex flex-col transition-all duration-300">
                <div className="flex min-w-max items-center gap-2 overflow-hidden transition-all duration-500">
                  <NavMain
                    items={data.navMain}
                    className={`transition-all duration-500 ${
                      state === "collapsed"
                        ? "opacity-0 transform -translate-x-4"
                        : "opacity-100 transform translate-x-0"
                    }`}
                  />
                </div>
                <div className="mt-6 flex min-w-max items-center gap-2 overflow-hidden transition-all duration-500">
                  <NavProjects
                    projects={data.projects}
                    className={`transition-all duration-500 ${
                      state === "collapsed"
                        ? "opacity-0 transform -translate-x-4"
                        : "opacity-100 transform translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </SidebarContent>

            <SidebarFooter
              className={`
                p-4 border-t border-border/50
                transition-all duration-500 ease-in-out
                ${
                  state === "collapsed"
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-100 transform translate-x-0"
                }
              `}
            >
              <NavUser user={user} />
            </SidebarFooter>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
