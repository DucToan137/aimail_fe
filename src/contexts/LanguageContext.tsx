import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, type Language } from '../locales/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, fallback?: string) => string;
}

const LANGUAGE_STORAGE_KEY = 'app_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'vi' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'vi';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch (err) {
      console.error('Failed to save language preference:', err);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (path: string, fallback?: string): string => {
      const keys = path.split('.');
      let current: unknown = translations[language];

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = (current as Record<string, unknown>)[key];
        } else {
          // Fallback to English if missing in Vietnamese
          let enFallback: unknown = translations.en;
          for (const enKey of keys) {
            if (enFallback && typeof enFallback === 'object' && enKey in enFallback) {
              enFallback = (enFallback as Record<string, unknown>)[enKey];
            } else {
              enFallback = undefined;
              break;
            }
          }
          if (typeof enFallback === 'string') {
            return enFallback;
          }
          return fallback || path;
        }
      }

      if (typeof current === 'string') {
        return current;
      }

      return fallback || path;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
