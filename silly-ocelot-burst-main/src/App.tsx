import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Market from "./pages/Market";
import Learning from "./pages/Learning";
import Portfolio from "./pages/Portfolio";
import Mentor from "./pages/Mentor";
import Auth from "./pages/Auth";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

import { TradingProvider } from "@/contexts/TradingContext";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" forcedTheme="dark" attribute="class">
    <QueryClientProvider client={queryClient}>
      <TradingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/market" element={<Market />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/mentor" element={<Mentor />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TradingProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;