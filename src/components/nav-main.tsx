"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar"; // Added import statement

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={state === "collapsed" ? "hidden" : ""}>
        My Learnings
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className={`
              group/collapsible 
              ${state === "collapsed" ? "flex justify-center" : ""}
              transition-all duration-700 ease-in-out
            `}
          >
            <SidebarMenuItem
              className={
                state === "collapsed" ? "w-full flex justify-center" : ""
              }
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={
                    state === "collapsed"
                      ? "w-full max-w-[2.5rem] justify-center transition-all duration-700 ease-in-out"
                      : ""
                  }
                >
                  {item.icon && (
                    <item.icon
                      className={state === "collapsed" ? "mx-auto" : ""}
                    />
                  )}
                  {state === "expanded" && <span>{item.title}</span>}
                  {state === "expanded" && (
                    <ChevronRight className="ml-auto transition-transform duration-700 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {state === "expanded" && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
