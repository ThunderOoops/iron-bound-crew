import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Discover from "./pages/ironblood/Discover";
import Events from "./pages/ironblood/Events";
import EventDetail from "./pages/ironblood/EventDetail";
import Host from "./pages/ironblood/Host";
import HostDashboard from "./pages/ironblood/HostDashboard";
import AthleteProfile from "./pages/ironblood/AthleteProfile";
import Messages from "./pages/ironblood/Messages";
import Dashboard from "./pages/ironblood/Dashboard";
import Leaderboard from "./pages/ironblood/Leaderboard";
import Onboarding from "./pages/ironblood/Onboarding";
import Auth from "./pages/ironblood/Auth";
import { TopNav } from "./components/layout/TopNav";
import { MobileTabBar } from "./components/layout/MobileTabBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/host" element={<Host />} />
          <Route path="/dashboard/host" element={<HostDashboard />} />
          <Route path="/athlete/:username" element={<AthleteProfile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileTabBar />
        <div className="md:hidden h-16" aria-hidden />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
