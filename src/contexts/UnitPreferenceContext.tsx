import React, { createContext, useContext, useState, useEffect } from 'react';

type UnitType = 'miles' | 'km';

interface UnitPreferenceContextType {
  unit: UnitType;
  setUnit: (unit: UnitType) => void;
  convertDistance: (distance: number) => string;
}

const UnitPreferenceContext = createContext<UnitPreferenceContextType | undefined>(undefined);

export function UnitPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnit] = useState<UnitType>(() => {
    const saved = localStorage.getItem('distanceUnit');
    return (saved as UnitType) || 'miles';
  });

  useEffect(() => {
    localStorage.setItem('distanceUnit', unit);
  }, [unit]);

  const convertDistance = (distance: number): string => {
    if (unit === 'km') {
      const km = distance * 1.60934;
      return `${km.toFixed(1)} km`;
    }
    return `${distance.toFixed(1)} mi`;
  };

  return (
    <UnitPreferenceContext.Provider value={{ unit, setUnit, convertDistance }}>
      {children}
    </UnitPreferenceContext.Provider>
  );
}

export function useUnitPreference() {
  const context = useContext(UnitPreferenceContext);
  if (context === undefined) {
    throw new Error('useUnitPreference must be used within a UnitPreferenceProvider');
  }
  return context;
}
