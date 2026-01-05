import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LearningProvider } from "@/contexts/LearningContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import LessonPlayer from "./pages/LessonPlayer";
import Achievements from "./pages/Achievements";
import Lessons from "./pages/Lessons";
import Settings from "./pages/Settings";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LearningProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/learn/:lessonId" element={<LessonPlayer />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </LearningProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
