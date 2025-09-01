import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, NavLink } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { cn } from "@/lib/utils";

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="group inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 shadow-sm" />
            <span className="text-lg font-extrabold tracking-tight">
              QuickCopy Code
              <span className="ml-1 inline-block bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Generator
              </span>
            </span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )
              }
            >
              Home
            </NavLink>
            <a
              href="https://www.builder.io/c/docs/projects"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </a>
          </nav>
        </div>
      </header>
      <main className="container py-12">
        <Outlet />
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} QuickCopy — Built for Builder.io Dev Tools
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              className="hover:text-foreground"
              href="https://www.builder.io/c/docs/projects-github"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Flow
            </a>
            <a
              className="hover:text-foreground"
              href="https://www.builder.io/c/docs/projects-local-repo"
              target="_blank"
              rel="noreferrer"
            >
              Local Repo
            </a>
            <a
              className="hover:text-foreground"
              href="https://www.builder.io/c/docs/projects-vscode"
              target="_blank"
              rel="noreferrer"
            >
              VS Code
            </a>
          </div>
        </div>
      </footer>
      <Toaster />
      <Sonner />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
