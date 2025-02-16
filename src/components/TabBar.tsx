import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export function TabBar() {
  const location = useLocation();
  const isScheduleActive = location.pathname.startsWith('/schedule') || location.pathname.startsWith('/route');

  return (
    <nav className="flex gap-6">
      <NavLink 
        to="/history" 
        className={({ isActive }) => 
          `pb-2 ${isActive ? "border-b-2 border-[#0B4EA2] text-[#0B4EA2]" : "text-gray-600"}`
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/upcoming" 
        className={({ isActive }) => 
          `pb-2 ${isActive ? "border-b-2 border-[#0B4EA2] text-[#0B4EA2]" : "text-gray-600"}`
        }
      >
        Upcoming
      </NavLink>
      <NavLink 
        to="/schedule" 
        className={`pb-2 ${isScheduleActive ? "border-b-2 border-[#0B4EA2] text-[#0B4EA2]" : "text-gray-600"}`}
      >
        Schedule
      </NavLink>
      <NavLink 
        to="/map" 
        className={({ isActive }) => 
          `pb-2 ${isActive ? "border-b-2 border-[#0B4EA2] text-[#0B4EA2]" : "text-gray-600"}`
        }
      >
        Map
      </NavLink>
    </nav>
  );
}