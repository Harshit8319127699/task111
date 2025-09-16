"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../client-bridge/queryClient";
import { TooltipProvider } from "../client-bridge/tooltip";
import { Toaster } from "../client-bridge/toaster";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}


