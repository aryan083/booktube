import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Bookmark, GraduationCap, Plus, Search } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { Separator } from '@/components/ui/separator';

interface Topic {
  id: string;
  title: string;
  progress: number;
  color: string;
  subtopics: {
    id: string;
    title: string;
    progress: number;
    pages: string;
  }[];
}

function DesignEngineering() {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: '1',
      title: 'Introduction to Programming',
      progress: 75,
      color: 'from-primary to-primary-dark',
      subtopics: [
        { id: '1-1', title: 'Basic Concepts', progress: 100, pages: '1-12' },
        { id: '1-2', title: 'Variables and Data Types', progress: 80, pages: '13-28' },
        { id: '1-3', title: 'Control Structures', progress: 60, pages: '29-45' }
      ]
    },
    {
      id: '2',
      title: 'Data Structures',
      progress: 45,
      color: 'from-secondary to-secondary-dark',
      subtopics: [
        { id: '2-1', title: 'Arrays and Lists', progress: 90, pages: '46-62' },
        { id: '2-2', title: 'Trees and Graphs', progress: 30, pages: '63-89' },
        { id: '2-3', title: 'Hash Tables', progress: 20, pages: '90-105' }
      ]
    },
    {
      id: '3',
      title: 'Algorithms',
      progress: 25,
      color: 'from-tertiary to-tertiary-dark',
      subtopics: [
        { id: '3-1', title: 'Sorting Algorithms', progress: 40, pages: '106-128' },
        { id: '3-2', title: 'Searching Algorithms', progress: 20, pages: '129-150' },
        { id: '3-3', title: 'Dynamic Programming', progress: 15, pages: '151-180' }
      ]
    }
  ]);

  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-2" />
              <BookOpen className="w-6 h-6 text-white" />
              <h1 className="text-xl font-medium">Learning Path</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search topics"
                  className="pl-10 pr-4 py-2 rounded-full bg-[#1E1F20] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/25 hover:bg-[#242526] transition-colors duration-200 w-full"
                />
              </div>
              <HoverBorderGradient
                className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/25"
                duration={0.5}
              >
                <Plus className="w-5 h-5 mr-2" />
                <span>Add Topic</span>
              </HoverBorderGradient>
            </div>
          </div>

          <div className="overflow-y-auto flex-grow">
            {topics.map(topic => (
              <div
                key={topic.id}
                className="bg-[#1E1F20] rounded-lg overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer transition-colors duration-200 hover:bg-[#242526]"
                  onClick={() => toggleTopic(topic.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-purple-500/10">
                        {expandedTopics.has(topic.id) ? (
                          <ChevronDown className="w-5 h-5 text-purple-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-purple-500" />
                        )}
                      </div>
                      <span className="text-lg text-white">{topic.title}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-sm text-gray-400">
                              {topic.progress}%
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{topic.progress}% of content completed</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="w-32 h-2 bg-[#2A2B2C] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${topic.color}`}
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {expandedTopics.has(topic.id) && (
                  <div className="border-t border-[#2A2B2C]">
                    {topic.subtopics.map(subtopic => (
                      <div
                        key={subtopic.id}
                        className="px-12 py-3 flex items-center justify-between hover:bg-[#2A2B2C] transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Bookmark className="w-4 h-4 text-purple-500" />
                          <span className="text-white">{subtopic.title}</span>
                          <span className="text-sm text-gray-400">
                            Pages {subtopic.pages}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-sm text-gray-400">
                                  {subtopic.progress}%
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{subtopic.progress}% of content completed</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <div className="w-24 h-1.5 bg-[#2A2B2C] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600"
                              style={{ width: `${subtopic.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DesignEngineering;
