
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 gap-4 sticky top-0 z-10">
      <SidebarTrigger className="text-primary hover:bg-accent" />
      <p className="font-medium text-xl">Sauda Talika</p>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="hidden md:flex border-border text-primary hover:bg-accent"
        >
          Dashboard
        </Button>
        <Button
          onClick={() => navigate("/recipes")}
          className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-primary-foreground"
        >
          Get Recipes
        </Button>
      </div>
    </header>
  );
}
