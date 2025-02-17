import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Settings } from "lucide-react";

interface TabBarProps {
  onSettingsClick: () => void;
}

export function TabBar({ onSettingsClick }: TabBarProps) {
  const location = useLocation();
  const isScheduleActive = location.pathname.startsWith('/schedule') || location.pathname.startsWith('/route');

  return (
    <nav className="flex-1 flex items-center justify-between px-4">
      <div className="flex-1 flex justify-center items-center gap-3">
      <NavLink 
        to="/history" 
        className={({ isActive }) => 
          `text-sm px-2 py-2.5 min-h-[44px] flex items-center ${isActive ? "border-b-2 border-[#0B4EA2] text-[#0B4EA2]" : "text-gray-600"}`
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/upcoming" 
        className={({ isActive }) => 
          `text-sm px-2 py-2.5 min-h-[44px] flex items-center ${isActive ? "border-b-2 border-[#0B4EA2] text-[#0B4EA2]" : "text-gray-600"}`
        }
      >
        Upcoming
      </NavLink>
      <NavLink 
        to="/schedule" 
        className={`text-sm px-2 py-2.5 min-h-[44px] flex items-center ${isScheduleActive ? "border-b-2 border-[#0B4EA2] text-[#0B4EA2]" : "text-gray-600"}`}
      >
        Schedule
      </NavLink>
      <NavLink 
        to="/map" 
        className={({ isActive }) => 
          `text-sm px-2 py-2.5 min-h-[44px] flex items-center ${isActive ? "border-b-2 border-[#0B4EA2] text-[#0B4EA2]" : "text-gray-600"}`
        }
      >
        Map
      </NavLink>
      </div>
      <button
        onClick={onSettingsClick}
        className="p-2 text-gray-600 hover:text-gray-800 flex items-center justify-center"
      >
        <Settings size={24} />
      </button>
    </nav>
  );
}
