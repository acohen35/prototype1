import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bus, ArrowLeft, Search, Train } from "lucide-react";

interface RouteType {
  id: string;
  name: string;
  type: "rail" | "bus";
  color?: string;
}

// Helper function to get numeric value from route id
const getNumericId = (id: string): number => {
  const numericPart = parseInt(id.replace(/[^\d]/g, ''));
  return isNaN(numericPart) ? 0 : numericPart;
};

// Define rail routes
const railRoutes: RouteType[] = [
  {
    id: "501",
    name: "Light Rail - Lynx Blue Line",
    type: "rail",
    color: "text-[#0B4EA2]"
  },
  {
    id: "510",
    name: "CityLYNX Gold Line",
    type: "rail",
    color: "text-yellow-500"
  }
];

// Define bus routes
const unsortedBusRoutes: RouteType[] = [
  { id: "1", name: "Mt. Holly Road", type: "bus" },
  { id: "2", name: "Ashley/Scaleybark Crosstown", type: "bus" },
  { id: "3", name: "The Plaza", type: "bus" },
  { id: "4", name: "Belmont", type: "bus" },
  { id: "5", name: "Airport", type: "bus", color: "text-green-600" },
  { id: "6", name: "Kings Drive", type: "bus" },
  { id: "7", name: "Beatties Ford", type: "bus" },
  { id: "8", name: "Tuckaseegee Road", type: "bus" },
  { id: "9", name: "Central Avenue", type: "bus" },
  { id: "10", name: "West Boulevard", type: "bus" },
  { id: "11", name: "North Tryon", type: "bus" },
  { id: "12", name: "South Blvd", type: "bus" },
  { id: "13", name: "Nevin Rd", type: "bus" },
  { id: "14", name: "Providence Road", type: "bus" },
  { id: "15", name: "Randolph Rd", type: "bus" },
  { id: "16", name: "South Tryon", type: "bus" },
  { id: "18", name: "Paw Creek - Rosa Parks", type: "bus" },
  { id: "19", name: "Park Road", type: "bus" },
  { id: "20", name: "Queens Rd", type: "bus" },
  { id: "21", name: "Statesville Ave", type: "bus" },
  { id: "23", name: "Shamrock Dr", type: "bus" },
  { id: "24", name: "Nations Ford Rd", type: "bus" },
  { id: "26", name: "Oaklawn Ave", type: "bus" },
  { id: "27", name: "Monroe Rd", type: "bus" },
  { id: "29", name: "UNC Charlotte - JW Clay", type: "bus" },
  { id: "30", name: "Woodlawn Crosstown", type: "bus" },
  { id: "35", name: "Wilkinson BLVD", type: "bus" },
  { id: "40", name: "Lawyers RD", type: "bus" },
  { id: "41x", name: "Steele Creek", type: "bus" },
  { id: "48x", name: "Northcross", type: "bus" },
  { id: "50", name: "URP CIC", type: "bus" },
  { id: "51", name: "Pineville Matthews Rd", type: "bus" },
  { id: "52x", name: "Idlewild Rd", type: "bus" },
  { id: "53x", name: "Northlake", type: "bus" },
  { id: "54", name: "University Research Park", type: "bus" },
  { id: "55", name: "Westinghouse", type: "bus" },
  { id: "58", name: "Pineville", type: "bus" },
  { id: "59", name: "North Meck Connector", type: "bus" },
  { id: "60", name: "Tyvola", type: "bus" },
  { id: "62x", name: "Rea Road", type: "bus" },
  { id: "63x", name: "Huntersville", type: "bus" },
  { id: "64x", name: "Independence Blvd", type: "bus" },
  { id: "74x", name: "Union County", type: "bus" },
  { id: "77x", name: "North Meck", type: "bus" },
  { id: "82x", name: "Rock Hill", type: "bus" },
  { id: "88x", name: "Mountain Island", type: "bus" },
  { id: "97", name: "Village Rider", type: "bus" },
  { id: "98", name: "Village Rider McCoy Rd", type: "bus" },
  { id: "99", name: "Village Rider Huntersville", type: "bus" },
  { id: "211", name: "Hidden Valley", type: "bus" },
  { id: "221", name: "E Harris Blvd - Idlewild", type: "bus" },
  { id: "222", name: "Pence Rd", type: "bus" },
  { id: "235", name: "West Charlotte Connector", type: "bus" },
  { id: "290", name: "Davidson Shuttle", type: "bus" }
];

// Sort bus routes by numeric id
const busRoutes = unsortedBusRoutes.sort((a, b) => getNumericId(a.id) - getNumericId(b.id));

// Combine rail and bus routes
const ROUTES: RouteType[] = [...railRoutes, ...busRoutes];

export function RouteSelector() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-[#0B4EA2] text-white p-4 flex items-center gap-4">
        <button onClick={() => navigate("/schedule")}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl">Select a route</h1>
      </div>
      <div className="border-b">
        <div className="flex">
          <button className="flex-1 py-4 text-[#0B4EA2] border-b-2 border-[#0B4EA2]">
            All Routes
          </button>
          <button className="flex-1 py-4 text-gray-600">History</button>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
        {ROUTES.map(route => (
          <button
            key={route.id}
            className="w-full flex items-center gap-4 p-4 border-b bg-white"
            onClick={() => {
              navigate("/schedule", {
                state: {
                  selectedRoute: `${route.id} - ${route.name}`
                }
              });
            }}
          >
            {route.type === "rail" ? (
              <Train size={20} className={route.color || "text-gray-600"} />
            ) : (
              <Bus size={20} className={route.color || "text-gray-600"} />
            )}
            <span className="text-gray-900">
              {route.id} - {route.name}
            </span>
          </button>
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <button className="w-14 h-14 rounded-full bg-[#0B4EA2] text-white flex items-center justify-center shadow-lg">
          <Search size={24} />
        </button>
      </div>
    </div>
  );
}