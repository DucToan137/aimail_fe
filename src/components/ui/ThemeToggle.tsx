import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'dropdown';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '',
  variant = 'button' 
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none ${className}`}
            title="Đổi giao diện"
          >
            {resolvedTheme === 'dark' ? (
              <Moon className="w-4 h-4 text-amber-400 transition-transform hover:rotate-12 duration-200" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 transition-transform hover:rotate-45 duration-200" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-32 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <DropdownMenuItem 
            onClick={() => setTheme('light')}
            className={`flex items-center gap-2 cursor-pointer ${theme === 'light' ? 'font-semibold text-blue-600 dark:text-blue-400' : ''}`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Sáng (Light)</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-2 cursor-pointer ${theme === 'dark' ? 'font-semibold text-blue-600 dark:text-blue-400' : ''}`}
          >
            <Moon className="w-4 h-4 text-amber-400" />
            <span>Tối (Dark)</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme('system')}
            className={`flex items-center gap-2 cursor-pointer ${theme === 'system' ? 'font-semibold text-blue-600 dark:text-blue-400' : ''}`}
          >
            <Laptop className="w-4 h-4 text-zinc-500" />
            <span>Hệ thống (Auto)</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Quick 1-click toggle button
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent dark:border-zinc-800/80 transition-all ${className}`}
      title={resolvedTheme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-600 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
