"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar"; // Added import statement
import { useEffect } from "react"; 
import {supabase} from "@/lib/supabase";
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

  useEffect(() => {
    const syncUserToDatabase = async () => {
      try {
        // Get current auth session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          console.log('No authenticated user found');
          return;
        }

        const userId = session.user.id;
        console.log('Checking user ID in database:', userId);

        // Check if user exists in users table
        const { data: existingUser, error: checkError } = await supabase
          .from('users')
          .select('user_id')
          .eq('user_id', userId)
          .single();

        if (checkError) {
          if (checkError.code === 'PGRST116') {
            console.log('User not found in users table, creating new entry...');
            
            // Create user in users table
            const { data: newUser, error: createError } = await supabase
              .from('users')
              .insert([{ user_id: userId }])
              .select()
              .single();

            if (createError) {
              console.error('Failed to create user in users table:', createError.message);
            } else {
              console.log('✅ Successfully created user in users table:', newUser);
            }
          } else {
            console.error('Error checking users table:', checkError.message);
          }
        } else {
          console.log('✅ User already exists in users table:', existingUser);
        }
      } catch (error) {
        console.error('Error syncing user:', error);
      }
    };

    syncUserToDatabase();
  }, []);

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
