import React, { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from "./components/ui/sidebar";

import { CommandPalette } from "@/components/CommandPalette";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Blendy, createBlendy } from "blendy";
import ClickSpark from "./components/ClickSpark";
import MainContent from "./routes/MainContent";

function App() {
  const queryClient = new QueryClient();
  const blendy = useRef<Blendy | null>(null);

  useEffect(() => {
    blendy.current = createBlendy({ animation: "dynamic" });
  }, []);

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router>
            <AuthProvider>
              <SidebarProvider>
                <div className="relative flex min-h-screen ">
                  <div className="flex-1">
                    <MainContent />
                  </div>
                </div>
                <CommandPalette />
                <Toaster />
                <Sonner />
              </SidebarProvider>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </ClickSpark>
  );
}

export default App;
