import React, { useState } from "react";
import { ArrowLeft, Search, ArrowLeftRight } from "lucide-react";
const BLUE_LINE_STATIONS = [{
  id: 1,
  name: "UNC Charlotte Station"
}, {
  id: 2,
  name: "JW Clay Blvd Station"
}, {
  id: 3,
  name: "McCullough Station"
}, {
  id: 4,
  name: "University City Blvd Station"
}, {
  id: 5,
  name: "Tom Hunter Station"
}, {
  id: 6,
  name: "Old Concord Road Station"
}, {
  id: 7,
  name: "Sugar Creek Station"
}, {
  id: 8,
  name: "36th St Station"
}, {
  id: 9,
  name: "25th St Station"
}, {
  id: 10,
  name: "Parkwood Station"
}, {
  id: 11,
  name: "9th Street Station"
}, {
  id: 12,
  name: "7th Street Station"
}, {
  id: 13,
  name: "CTC Station/Arena"
}, {
  id: 14,
  name: "3rd Street Station"
}, {
  id: 15,
  name: "Brooklyn Village Station"
}, {
  id: 16,
  name: "LYNX Carson Station"
}, {
  id: 17,
  name: "Bland Street Station"
}, {
  id: 18,
  name: "LYNX East/West Blvd Station"
}, {
  id: 19,
  name: "New Bern Station"
}, {
  id: 20,
  name: "LYNX Scaleybark Station"
}, {
  id: 21,
  name: "LYNX Woodlawn Station"
}, {
  id: 22,
  name: "LYNX Tyvola Station"
}, {
  id: 23,
  name: "LYNX Archdale Station"
}, {
  id: 24,
  name: "LYNX Arrowood Station"
}, {
  id: 25,
  name: "LYNX Sharon Rd West Station"
}, {
  id: 26,
  name: "LYNX I-485 Station"
}];

export const GOLD_LINE_STATIONS = [{
  id: 1,
  name: "French St Station (CityLYNX)"
}, {
  id: 2,
  name: "Johnson & Wales"
}, {
  id: 3,
  name: "CTC Station/Arena"
}, {
  id: 4,
  name: "Elizabeth & Hawthorne"
}, {
  id: 5,
  name: "Sunnyside Station (CityLYNX)"
}];

const getStationsForRoute = (route: string) => {
  if (route.startsWith("501")) {
    return BLUE_LINE_STATIONS;
  } else if (route.startsWith("510")) {
    return GOLD_LINE_STATIONS;
  }
  return BLUE_LINE_STATIONS; // Default to Blue Line stations
};
interface StationSelectorProps {
  onBack: () => void;
  selectedRoute: string;
  onComplete: (from: string, to: string) => void;
  direction: "UNC Charlotte Main Station" | "I-485/S.Blvd. Station" | "inbound" | "outbound";
}
type SelectionMode = "from" | "to" | null;
export function StationSelector({
  onBack,
  selectedRoute,
  onComplete,
  direction
}: StationSelectorProps) {
  const [fromStation, setFromStation] = useState<string | null>(null);
  const [toStation, setToStation] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(null);
  const [error, setError] = useState<string | null>(null);

  // Get and sort stations based on route and direction
  const stations = getStationsForRoute(selectedRoute);
  const sortedStations = [...stations].sort((a, b) => {
    if (direction === "UNC Charlotte Main Station") {
      // Reverse order when UNC Charlotte is selected
      return b.id - a.id;
    }
    // Normal order when I-485/S.Blvd is selected
    return a.id - b.id;
  });
  const handleStationClick = (stationName: string) => {
    if (selectionMode === "from") {
      setFromStation(stationName);
      setSelectionMode(null);
    } else if (selectionMode === "to") {
      setToStation(stationName);
      setSelectionMode(null);
      // Complete the selection regardless of direction
      onComplete(fromStation!, stationName);
    }
  };
  return <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-[#0B4EA2] text-white p-4 flex items-center gap-4">
        <button onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl">
          {selectionMode ? `Select ${selectionMode} station` : "Select a station"}
        </h1>
      </div>
      <div className="border-b">
        <div className="flex">
          <button className="flex-1 py-4 text-[#0B4EA2] border-b-2 border-[#0B4EA2]">
            All Stations
          </button>
          <button className="flex-1 py-4 text-gray-600">History</button>
        </div>
      </div>
      {error && <div className="fixed top-16 left-0 right-0 bg-red-500 text-white p-4 text-center">
          {error}
        </div>}
      <div className="flex-1 bg-gray-50">
        {sortedStations.map(station => <button key={station.id} className={`w-full flex items-center gap-4 p-4 border-b bg-white ${selectionMode ? "hover:bg-gray-50" : ""}`} onClick={() => selectionMode && handleStationClick(station.name)} disabled={!selectionMode}>
            <div className="w-8 h-8 bg-[#0B4EA2] text-white rounded-lg flex items-center justify-center font-bold">
              {station.id}
            </div>
            <span className="text-gray-900">{station.name}</span>
          </button>)}
      </div>
      <div className="p-4 space-y-4">
        <button className="w-full p-4 bg-white border border-[#0B4EA2] text-[#0B4EA2] rounded-lg font-bold">
          {selectedRoute}
        </button>
        <div className="grid grid-cols-2 gap-4">
          <button className={`p-4 bg-white border rounded-lg font-bold ${selectionMode === "from" ? "border-[#0B4EA2] text-[#0B4EA2]" : "border-gray-300 text-gray-500"}`} onClick={() => setSelectionMode("from")}>
            {fromStation || "From"}
          </button>
          <button className={`p-4 bg-white border rounded-lg font-bold ${selectionMode === "to" ? "border-[#0B4EA2] text-[#0B4EA2]" : "border-gray-300 text-gray-500"}`} onClick={() => setSelectionMode("to")}>
            {toStation || "To"}
          </button>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <button className="w-14 h-14 rounded-full bg-[#0B4EA2] text-white flex items-center justify-center shadow-lg">
          <Search size={24} />
        </button>
      </div>
    </div>;
}