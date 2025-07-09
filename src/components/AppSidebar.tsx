import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChefHat, Home, Info, LayoutDashboard, Phone } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Recipes", url: "/recipes", icon: ChefHat },
  { title: "About", url: "/about", icon: Info },
  { title: "Contact", url: "/contact", icon: Phone },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    return isActive(path)
      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg"
      : "hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400";
  };

  return (
    <Sidebar className="border-r border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <SidebarContent>
        <div className="p-4 border-b border-orange-200 dark:border-gray-700 flex items-center gap-3">
          {state === "collapsed" && (
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ST</span>
            </div>
          )}
          {state !== "collapsed" && (
            <div>
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                Sauda Talika
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Easy Shopping List
              </p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 dark:text-orange-400">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`${getNavClass(
                        item.url
                      )} transition-all duration-200 rounded-lg`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
