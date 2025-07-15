
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import OnboardingPage from "./pages/OnboardingPage";
import AdminLogin from "./pages/AdminLogin";
import LegalLogin from "./pages/LegalLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected route wrapper that handles onboarding
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, needsOnboarding } = useAuth();

  console.log("[PROTECTED ROUTE] User:", !!user);
  console.log("[PROTECTED ROUTE] Loading:", isLoading);
  console.log("[PROTECTED ROUTE] Needs onboarding:", needsOnboarding);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("[PROTECTED ROUTE] No user, redirecting to landing");
    return <Navigate to="/" replace />;
  }

  if (needsOnboarding) {
    console.log("[PROTECTED ROUTE] Needs onboarding, redirecting to onboarding");
    return <Navigate to="/onboarding" replace />;
  }

  console.log("[PROTECTED ROUTE] All checks passed, showing protected content");
  return <>{children}</>;
};

// Onboarding route wrapper
const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, needsOnboarding } = useAuth();

  console.log("[ONBOARDING ROUTE] User:", !!user);
  console.log("[ONBOARDING ROUTE] Loading:", isLoading);
  console.log("[ONBOARDING ROUTE] Needs onboarding:", needsOnboarding);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("[ONBOARDING ROUTE] No user, redirecting to landing");
    return <Navigate to="/" replace />;
  }

  if (!needsOnboarding) {
    console.log("[ONBOARDING ROUTE] Profile complete, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  console.log("[ONBOARDING ROUTE] Showing onboarding form");
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route 
      path="/onboarding" 
      element={
        <OnboardingRoute>
          <OnboardingPage />
        </OnboardingRoute>
      } 
    />
    <Route 
      path="/dashboard" 
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } 
    />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/legal/login" element={<LegalLogin />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
