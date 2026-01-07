
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from './translations';

type Language = 'en' | 'pl' | 'de' | 'ru';

export const languages: Language[] = ['en', 'pl', 'de', 'ru'];

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let result = translations[language] as any;
    for (const k of keys) {
      result = result[k];
      if (result === undefined) {
        return key;
      }
    }

    if (typeof result === 'string' && options) {
      Object.keys(options).forEach(k => {
        result = result.replace(`{${k}}`, String(options[k]));
      });
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
