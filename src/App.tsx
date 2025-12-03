import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/Layout";
import Overview from "./pages/admin/Overview";
import Members from "./pages/admin/Members";
import Team from "./pages/admin/Team";
import MembershipTiers from "./pages/admin/MembershipTiers";
import ContentMatches from "./pages/admin/ContentMatches";
import ContentRecaps from "./pages/admin/ContentRecaps";
import Insights from "./pages/admin/Insights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="members" element={<Members />} />
            <Route path="team" element={<Team />} />
            <Route path="membership" element={<MembershipTiers />} />
            <Route path="content/matches" element={<ContentMatches />} />
            <Route path="content/recaps" element={<ContentRecaps />} />
            <Route path="insights" element={<Insights />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
