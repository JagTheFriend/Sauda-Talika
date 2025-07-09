
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
    <div className="h-full w-full z-0">
      <img
        src={appIcon}
        alt="Sauda Talika Logo Background"
        className="h-full w-full object-contain opacity-10 aspect-square static"
      />
      <div className="relative flex items-center justify-center h-full w-full z-10">
        {children}
      </div>
    </div>
  );
};