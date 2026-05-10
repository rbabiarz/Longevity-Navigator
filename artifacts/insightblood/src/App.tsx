import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Features from "@/pages/features";
import Science from "@/pages/science";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Checkout from "@/pages/checkout";
import CheckoutSuccess from "@/pages/checkout-success";
import DashboardOverview from "@/pages/dashboard/index";
import DashboardUpload from "@/pages/dashboard/upload";
import DashboardMarkers from "@/pages/dashboard/markers";
import DashboardCoach from "@/pages/dashboard/coach";
import DashboardSettings from "@/pages/dashboard/settings";
import DashboardBilling from "@/pages/dashboard/billing";
import AICoachWidget from "@/components/AICoachWidget";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Marketing */}
      <Route path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/science" component={Science} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />

      {/* Auth */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />

      {/* Checkout */}
      <Route path="/checkout" component={Checkout} />
      <Route path="/checkout/success" component={CheckoutSuccess} />

      {/* Member dashboard */}
      <Route path="/dashboard" component={DashboardOverview} />
      <Route path="/dashboard/upload" component={DashboardUpload} />
      <Route path="/dashboard/markers" component={DashboardMarkers} />
      <Route path="/dashboard/coach" component={DashboardCoach} />
      <Route path="/dashboard/settings" component={DashboardSettings} />
      <Route path="/dashboard/billing" component={DashboardBilling} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <AICoachWidget />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
