
import { useTheme } from "@/contexts/ThemeContext";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
  };

  return (
    <img
      src={theme === "dark" ? "/app-icon/dark.png" : "/app-icon/light.png"}
      alt="Sauda Talika Logo"
      className={`${sizeClasses[size]} w-auto ${className}`}
    />
  );
};

export const LogoBackground = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const appIcon =
    theme === "dark" ? "/app-icon/dark.png" : "/app-icon/light.png";

  return (
    <div className="h-full w-full z-0 relative">
      <img
        src={appIcon}
        alt="Sauda Talika Logo Background"
        className="fixed opacity-15 -z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div className="relative flex items-center justify-center h-full w-full z-10">
        {children}
      </div>
    </div>
  );
};