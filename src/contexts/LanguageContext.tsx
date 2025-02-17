import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: Translations = {
  settings: {
    en: 'Settings',
    es: 'Configuración'
  },
  darkMode: {
    en: 'Dark Mode',
    es: 'Modo Oscuro'
  },
  language: {
    en: 'Language',
    es: 'Idioma'
  },
  notifications: {
    en: 'Notifications',
    es: 'Notificaciones'
  },
  preferredMode: {
    en: 'Preferred Mode',
    es: 'Modo Preferido'
  },
  english: {
    en: 'English',
    es: 'Inglés'
  },
  spanish: {
    en: 'Spanish',
    es: 'Español'
  },
  miles: {
    en: 'Miles',
    es: 'Millas'
  },
  kilometers: {
    en: 'Kilometers',
    es: 'Kilómetros'
  },
  // Route-related translations
  inbound: {
    en: 'Inbound to',
    es: 'Hacia'
  },
  outbound: {
    en: 'Outbound to',
    es: 'Hacia'
  },
  station: {
    en: 'Station',
    es: 'Estación'
  },
  distance: {
    en: 'Distance',
    es: 'Distancia'
  },
  away: {
    en: 'away',
    es: 'de distancia'
  },
  stops: {
    en: 'stops',
    es: 'paradas'
  },
  route: {
    en: 'Route',
    es: 'Ruta'
  },
  direction: {
    en: 'Direction',
    es: 'Dirección'
  },
  day: {
    en: 'Day',
    es: 'Día'
  },
  weekdays: {
    en: 'WEEKDAYS',
    es: 'DE LUNES A VIERNES'
  },
  saturday: {
    en: 'SATURDAY',
    es: 'SÁBADO'
  },
  sunday: {
    en: 'SUNDAY',
    es: 'DOMINGO'
  },
  showSchedule: {
    en: 'Show Schedule',
    es: 'Mostrar Horario'
  },
  selectRoute: {
    en: 'Select a route',
    es: 'Seleccionar una ruta'
  },
  busRoutes: {
    en: 'Bus Routes',
    es: 'Rutas de Autobús'
  },
  blueLineRoute: {
    en: 'Blue Line Route',
    es: 'Ruta de Línea Azul'
  },
  goldLineRoute: {
    en: 'Gold Line Route',
    es: 'Ruta de Línea Dorada'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
