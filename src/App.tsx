
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Layout from "./components/layout/Layout";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import ContentLibrary from "./pages/ContentLibrary";
import Messages from "./pages/Messages";
import Approvals from "./pages/Approvals";
import Analytics from "./pages/Analytics";
import Campaigns from "./pages/Campaigns";
import MarketIntelligence from "./pages/MarketIntelligence";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Guides from "./pages/Guides";
import CaseStudies from "./pages/CaseStudies";

// Create a component to handle AnimatePresence with useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/content-library" element={<ContentLibrary />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/market-intelligence" element={<MarketIntelligence />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
