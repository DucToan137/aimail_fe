import React from 'react';
import { Languages, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

interface LanguageToggleProps {
  className?: string;
  variant?: 'button' | 'dropdown';
  showLabel?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  variant = 'dropdown',
  showLabel = true,
}) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: 'vi' | 'en') => {
    if (newLang === language) return;
    setLanguage(newLang);
    toast.success(
      newLang === 'vi'
        ? 'Đã chuyển sang Tiếng Việt 🇻🇳'
        : 'Switched to English 🇺🇸',
      { duration: 2000 }
    );
  };

  const toggleLanguage = () => {
    const nextLang = language === 'vi' ? 'en' : 'vi';
    handleLanguageChange(nextLang);
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center justify-center gap-1.5 h-8 px-2 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent dark:border-zinc-800/80 transition-all cursor-pointer ${className}`}
        title={language === 'vi' ? 'Chuyển sang English' : 'Switch to Tiếng Việt'}
        aria-label="Toggle language"
      >
        <Languages className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        {showLabel && (
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase">
            {language}
          </span>
        )}
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center justify-center gap-1.5 h-8 px-2 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent dark:border-zinc-800/80 transition-all cursor-pointer focus:outline-none ${className}`}
          title={language === 'vi' ? 'Đổi ngôn ngữ' : 'Change language'}
          aria-label="Select language"
        >
          <Languages className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          {showLabel && (
            <span className="font-mono text-[11px] font-semibold tracking-wider uppercase">
              {language}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[150px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 p-1 rounded-xl shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => handleLanguageChange('vi')}
          className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg cursor-pointer transition-colors ${
            language === 'vi'
              ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-950 dark:text-zinc-100'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm">🇻🇳</span>
            <span>Tiếng Việt</span>
          </span>
          {language === 'vi' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg cursor-pointer transition-colors ${
            language === 'en'
              ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-950 dark:text-zinc-100'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm">🇺🇸</span>
            <span>English</span>
          </span>
          {language === 'en' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
