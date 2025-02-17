import React, { useState } from "react";
import { Train, Bus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface TimeEntry {
  minutes: number;
  startTime: string;
  endTime: string;
  duration: string;
}

const TIMES: TimeEntry[] = [{
  minutes: 13,
  startTime: "12:11 PM",
  endTime: "1:10 PM",
  duration: "59 min"
}, {
  minutes: 33,
  startTime: "12:31 PM",
  endTime: "1:30 PM",
  duration: "59 min"
}, {
  minutes: 53,
  startTime: "12:51 PM",
  endTime: "1:50 PM",
  duration: "59 min"
}, {
  minutes: 73,
  startTime: "1:11 PM",
  endTime: "2:10 PM",
  duration: "59 min"
}, {
  minutes: 93,
  startTime: "1:31 PM",
  endTime: "2:30 PM",
  duration: "59 min"
}];

interface UpcomingViewProps {
  savedRoutes: string[];
  setSavedRoutes: React.Dispatch<React.SetStateAction<string[]>>;
}

export function UpcomingView({
  savedRoutes,
  setSavedRoutes
}: UpcomingViewProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRoutes, setSelectedRoutes] = useState<number[]>([]);
  const routeInfo = location.state || {};
  const isRailRoute = routeInfo.route?.toLowerCase().includes("rail") || routeInfo.route?.toLowerCase().includes("lynx");

  const handleSaveSelected = () => {
    const routeString = `${routeInfo.route}: ${routeInfo.fromStation} to ${routeInfo.toStation}`;
    if (!savedRoutes.includes(routeString)) {
      setSavedRoutes(prev => [...prev, routeString]);
    }
    setSelectedRoutes([]);
  };

  // If no route information, show route selection interface
  if (!routeInfo.route) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-gray-400 mb-6">
          <img src="/prototype1/logos/CatslogoBW-1024x282.webp" alt="CATS Logo" className="w-48 h-auto mx-auto" />
        </div>
        <h2 className="text-gray-600 text-xl mb-4">Select a route to get started</h2>
        <button
          onClick={() => navigate("/upcoming/route")}
          className="w-full p-4 border-2 border-[#0B4EA2] rounded-lg text-center text-[#0B4EA2] font-semibold hover:bg-blue-50"
        >
          Route
        </button>
      </div>
    );
  }

  // If no stations selected, show station selection interface
  if (!routeInfo.fromStation || !routeInfo.toStation) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="text-gray-400 mb-6">
              <img src="/prototype1/logos/CatslogoBW-1024x282.webp" alt="CATS Logo" className="w-48 h-auto mx-auto" />
            </div>
            <h2 className="text-gray-600 text-xl mb-4">Select stations</h2>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4 space-y-4 bg-white border-t border-gray-200">
          <button 
            onClick={() => navigate("/upcoming/route")}
            className="w-full p-4 bg-white border border-[#0B4EA2] text-[#0B4EA2] rounded-lg font-bold"
          >
            {routeInfo.route}
          </button>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate("/upcoming/station", {
                state: {
                  ...routeInfo,
                  selectingStation: "from"
                }
              })}
              className={`p-4 bg-white border rounded-lg font-bold ${
                routeInfo.fromStation
                  ? 'border-[#0B4EA2] text-[#0B4EA2]'
                  : 'border-gray-300 text-gray-500'
              }`}
            >
              {routeInfo.fromStation || "From"}
            </button>
            <button 
              onClick={() => navigate("/upcoming/station", {
                state: {
                  ...routeInfo,
                  selectingStation: "to"
                }
              })}
              className={`p-4 bg-white border rounded-lg font-bold ${
                routeInfo.toStation
                  ? 'border-[#0B4EA2] text-[#0B4EA2]'
                  : 'border-gray-300 text-gray-500'
              }`}
            >
              {routeInfo.toStation || "To"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show upcoming times view
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-4 space-y-4">
          {selectedRoutes.length > 0 && (
            <button
              onClick={handleSaveSelected}
              className="w-full bg-[#0B4EA2] text-white rounded-lg p-3 font-semibold"
            >
              Save Selected Routes ({selectedRoutes.length})
            </button>
          )}
          {TIMES.map((time, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-2 mr-2"
                checked={selectedRoutes.includes(index)}
                onChange={(e) => {
                  setSelectedRoutes(prev =>
                    e.target.checked
                      ? [...prev, index]
                      : prev.filter(i => i !== index)
                  );
                }}
              />
              {isRailRoute ? (
                <Train size={20} className="text-[#0B4EA2] mt-1" />
              ) : (
                <Bus size={20} className="text-gray-600 mt-1" />
              )}
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{routeInfo.fromStation}</h3>
                    <p className="text-sm text-gray-500">To {routeInfo.toStation}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold">{time.minutes}</span>
                    <p className="text-sm text-gray-500">minutes</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {time.startTime} - {time.endTime} ({time.duration})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 space-y-4 bg-white border-t border-gray-200">
        <button
          onClick={() => navigate("/upcoming/route")}
          className="w-full p-4 bg-white border border-[#0B4EA2] text-[#0B4EA2] rounded-lg font-bold"
        >
          {routeInfo.route}
        </button>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate("/upcoming/station", {
              state: {
                ...routeInfo,
                selectingStation: "from"
              }
            })}
            className="p-4 bg-white border border-[#0B4EA2] text-[#0B4EA2] rounded-lg font-bold"
          >
            {routeInfo.fromStation}
          </button>
          <button 
            onClick={() => navigate("/upcoming/station", {
              state: {
                ...routeInfo,
                selectingStation: "to"
              }
            })}
            className="p-4 bg-white border border-[#0B4EA2] text-[#0B4EA2] rounded-lg font-bold"
          >
            {routeInfo.toStation}
          </button>
        </div>
      </div>
    </div>
  );
}
