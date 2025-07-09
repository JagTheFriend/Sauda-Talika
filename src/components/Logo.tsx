
import { useTheme } from '@/contexts/ThemeContext'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const { theme } = useTheme()
  
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  }

  return (
    <img
      src={theme === 'dark' 
        ? '/lovable-uploads/03d8d7a4-0585-4047-813c-38f73bd44f2b.png'
        : '/lovable-uploads/58d9c075-f491-4dc6-9b3d-397fafa88976.png'
      }
      alt="Sauda Talika Logo"
      className={`${sizeClasses[size]} w-auto ${className}`}
    />
  )
}
