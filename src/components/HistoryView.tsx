import React from "react";
import { Bus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HistoryViewProps {
  savedRoutes: string[];
  setSavedRoutes: React.Dispatch<React.SetStateAction<string[]>>;
}

export function HistoryView({ savedRoutes, setSavedRoutes }: HistoryViewProps) {
  const navigate = useNavigate();

  const handleRouteClick = (route: string) => {
    // Parse the route string to extract information
    // Format: "[route]: [fromStation] to [toStation]"
    const [routeName, stations] = route.split(": ");
    const [fromStation, toStation] = stations.split(" to ");
    
    // Navigate to the schedule view with the parsed information
    navigate("/schedule", { state: { selectedRoute: routeName, fromStation, toStation } });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className="space-y-4">
        {savedRoutes.length === 0 ? (
          <p className="text-gray-500">No saved routes yet. Select routes from Upcoming or Schedule tabs to save them here.</p>
        ) : (
          savedRoutes.map((route, index) => {
            const [routeName, stations] = route.split(": ");
            const [fromStation, toStation] = stations.split(" to ");
            return (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-50"
                onClick={() => handleRouteClick(route)}
              >
                <Bus className="text-gray-600" />
                <div className="flex-1">
                  <h3 className="font-bold">{routeName}</h3>
                  <div className="flex justify-between text-gray-600">
                    <span>{fromStation}</span>
                    <span>{toStation}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}