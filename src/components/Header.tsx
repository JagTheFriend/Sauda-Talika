
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import { Logo } from "./Logo"

export function Header() {
  const navigate = useNavigate()

  return (
    <header className="h-16 border-b border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center px-4 gap-4">
      <SidebarTrigger className="text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-gray-800" />
      
      <Logo size="sm" />
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="hidden md:flex border-orange-200 dark:border-gray-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-800"
        >
          Dashboard
        </Button>
        <Button
          onClick={() => navigate("/recipes")}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          Get Recipes
        </Button>
      </div>
    </header>
  )
}
