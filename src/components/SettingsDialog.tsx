import React from "react";
import { Moon, Languages, Bell, Shield, ChevronRight, X } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useUnitPreference } from "../contexts/UnitPreferenceContext";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage, t } = useLanguage();
  const { unit, setUnit } = useUnitPreference();
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50" style={{ zIndex: 1000 }}>
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl p-4" style={{ maxHeight: 'calc(100% - 4rem)' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold dark:text-white">{t('settings')}</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="dark:text-white">{t('darkMode')}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B4EA2]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Languages size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="dark:text-white">{t('language')}</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
              className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md px-2 py-1 border border-gray-300 dark:border-gray-600"
            >
              <option value="en">{t('english')}</option>
              <option value="es">{t('spanish')}</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="dark:text-white">{t('notifications')}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B4EA2]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="dark:text-white">{t('preferredMode')}</span>
            </div>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'miles' | 'km')}
              className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md px-2 py-1 border border-gray-300 dark:border-gray-600"
            >
              <option value="miles">{t('miles')}</option>
              <option value="km">{t('kilometers')}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
