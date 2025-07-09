
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function Header() {
  const navigate = useNavigate()

  return (
    <header className="h-16 border-b border-orange-200 bg-white/80 backdrop-blur-sm flex items-center px-4 gap-4">
      <SidebarTrigger className="text-orange-600 hover:bg-orange-100" />
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="hidden md:flex border-orange-200 text-orange-600 hover:bg-orange-50"
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
