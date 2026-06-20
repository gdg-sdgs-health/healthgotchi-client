import { MobileContainer } from "@/components/layout/MobileContainer";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Missions from "@/pages/Missions";
import Board from "@/pages/Board";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import AuthCallback from "@/pages/AuthCallback";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component, ...rest }: { component: React.ComponentType, path: string }) {
  const [location, setLocation] = useLocation();
  const isAuthenticated = !!localStorage.getItem("auth_token");

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/auth/callback" component={AuthCallback} />
      <Route path="/">
        {() => <ProtectedRoute component={Home} path="/" />}
      </Route>
      <Route path="/missions">
        {() => <ProtectedRoute component={Missions} path="/missions" />}
      </Route>
      <Route path="/board">
        {() => <ProtectedRoute component={Board} path="/board" />}
      </Route>
      <Route path="/profile">
        {() => <ProtectedRoute component={Profile} path="/profile" />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <MobileContainer>
            <Router />
          </MobileContainer>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;