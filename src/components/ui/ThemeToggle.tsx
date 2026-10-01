import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'dropdown';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer focus:outline-none ${className}`}
      title={isDark 
        ? (language === 'vi' ? 'Chuyển sang giao diện Sáng' : 'Switch to Light mode')
        : (language === 'vi' ? 'Chuyển sang giao diện Tối' : 'Switch to Dark mode')
      }
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-12" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 transition-transform duration-200 hover:rotate-45" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle;
