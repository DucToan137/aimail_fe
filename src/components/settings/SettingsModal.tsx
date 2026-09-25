import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { 
  Sun, 
  Moon, 
  Laptop, 
  Languages, 
  Palette, 
  User, 
  Check, 
  LogOut,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TabType = 'appearance' | 'language' | 'account';

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onOpenChange }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('appearance');

  const handleLanguageChange = (newLang: 'vi' | 'en') => {
    setLanguage(newLang);
    toast.success(newLang === 'vi' ? 'Đã đổi ngôn ngữ sang Tiếng Việt' : 'Switched language to English');
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    toast.success(
      language === 'vi' 
        ? `Đã chuyển giao diện sang ${newTheme === 'light' ? 'Sáng' : newTheme === 'dark' ? 'Tối' : 'Hệ thống'}`
        : `Switched theme to ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`
    );
  };

  const getUserInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row h-[560px]">
          {/* Settings Sidebar / Tabs */}
          <div className="w-full sm:w-52 bg-zinc-50/80 dark:bg-zinc-950/70 border-b sm:border-b-0 sm:border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <DialogTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {t('settings.title')}
                </DialogTitle>
                <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                  {t('settings.description')}
                </DialogDescription>
              </div>

              <nav className="flex sm:flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('appearance')}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left w-full cursor-pointer',
                    activeTab === 'appearance'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
                  )}
                >
                  <Palette className="w-4 h-4 shrink-0" />
                  <span>{t('settings.tabs.appearance')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('language')}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left w-full cursor-pointer',
                    activeTab === 'language'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
                  )}
                >
                  <Languages className="w-4 h-4 shrink-0" />
                  <span>{t('settings.tabs.language')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('account')}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left w-full cursor-pointer',
                    activeTab === 'account'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
                  )}
                >
                  <User className="w-4 h-4 shrink-0" />
                  <span>{t('settings.tabs.account')}</span>
                </button>
              </nav>
            </div>

            {/* Quick user badge at bottom */}
            {user && (
              <div className="hidden sm:flex items-center gap-2.5 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <Avatar className="h-7 w-7 ring-1 ring-zinc-200 dark:ring-zinc-800">
                  <AvatarFallback className="text-[11px] font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* 1. APPEARANCE TAB */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {t('settings.appearanceTitle')}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {t('settings.appearanceDesc')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Light Mode */}
                  <button
                    type="button"
                    onClick={() => handleThemeChange('light')}
                    className={cn(
                      'relative flex flex-col items-center justify-between p-4 rounded-xl border text-center transition-all cursor-pointer group',
                      theme === 'light'
                        ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-600/30 shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center mb-3">
                      <Sun className="w-5 h-5 text-amber-500 transition-transform group-hover:rotate-45 duration-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {t('settings.light')}
                      </h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                        {language === 'vi' ? 'Sáng sủa, tương phản cao' : 'Clear and bright'}
                      </p>
                    </div>
                    {theme === 'light' && (
                      <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>

                  {/* Dark Mode */}
                  <button
                    type="button"
                    onClick={() => handleThemeChange('dark')}
                    className={cn(
                      'relative flex flex-col items-center justify-between p-4 rounded-xl border text-center transition-all cursor-pointer group',
                      theme === 'dark'
                        ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-600/30 shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center mb-3 text-amber-400">
                      <Moon className="w-5 h-5 transition-transform group-hover:rotate-12 duration-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {t('settings.dark')}
                      </h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                        {language === 'vi' ? 'Dịu mắt ban đêm' : 'Relaxing for eyes'}
                      </p>
                    </div>
                    {theme === 'dark' && (
                      <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>

                  {/* System Mode */}
                  <button
                    type="button"
                    onClick={() => handleThemeChange('system')}
                    className={cn(
                      'relative flex flex-col items-center justify-between p-4 rounded-xl border text-center transition-all cursor-pointer group',
                      theme === 'system'
                        ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-600/30 shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center mb-3 text-zinc-600 dark:text-zinc-300">
                      <Laptop className="w-5 h-5 transition-transform group-hover:scale-110 duration-200" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {t('settings.system')}
                      </h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                        {language === 'vi' ? 'Theo hệ điều hành' : 'Sync with OS'}
                      </p>
                    </div>
                    {theme === 'system' && (
                      <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 2. LANGUAGE TAB */}
            {activeTab === 'language' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {t('settings.languageTitle')}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {t('settings.languageDesc')}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Vietnamese */}
                  <button
                    type="button"
                    onClick={() => handleLanguageChange('vi')}
                    className={cn(
                      'w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer',
                      language === 'vi'
                        ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-600/30 shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl" role="img" aria-label="Vietnam">
                        🇻🇳
                      </span>
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {t('settings.vietnamese')}
                        </h4>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {t('settings.vietnameseDesc')}
                        </p>
                      </div>
                    </div>
                    {language === 'vi' && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>

                  {/* English */}
                  <button
                    type="button"
                    onClick={() => handleLanguageChange('en')}
                    className={cn(
                      'w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer',
                      language === 'en'
                        ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-600/30 shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl" role="img" aria-label="United States">
                        🇺🇸
                      </span>
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {t('settings.english')}
                        </h4>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {t('settings.englishDesc')}
                        </p>
                      </div>
                    </div>
                    {language === 'en' && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 3. ACCOUNT TAB */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {t('settings.accountTitle')}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {t('settings.accountDesc')}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/50 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 ring-2 ring-zinc-200 dark:ring-zinc-800 shadow-xs">
                      <AvatarFallback className="text-sm font-bold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
                        {getUserInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {user?.name || 'User'}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{user?.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('settings.googleAccount')}</span>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                      Active
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      onOpenChange(false);
                      logout();
                    }}
                    className="w-full gap-2 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('common.logout')}</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
