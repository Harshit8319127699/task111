import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LiveChatPage from "@/pages/live-chat";
import PricingPage from "@/pages/pricing";
import DashboardPage from "@/pages/dashboard";
import PaymentSuccessPage from "@/pages/payment/success";
import PaymentCancelPage from "@/pages/payment/cancel";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LiveChatPage} />
      <Route path="/live-chat" component={LiveChatPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/payment/success" component={PaymentSuccessPage} />
      <Route path="/payment/cancel" component={PaymentCancelPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
//file
export default App;
